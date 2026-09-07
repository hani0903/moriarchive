import path from 'node:path';
import { existsSync } from 'node:fs';
import { cache } from 'react';
import { postSchema, type PostFrontmatter } from '@/lib/content/schemas';
import { categoryIndex } from '@/lib/content/categories';
import { readMdxFiles } from '@/lib/content/files';

/**
 * `PostFrontmatter`와 글의 본문 `content`를 모두 포함하는 타입
 */
export type PostDetail = PostFrontmatter & { content: string };
/**
 * `PostDetail`에서 본문 `content`를 제외하고 목록용 링크·이미지 정보를 추가한 타입
 */
export type PostSummary = Omit<PostDetail, 'content'> & {
    href: string;
    categoryPath: { name: string; href: string }[];
    cover: { src: string; alt: string };
};

/**
 * 주어진 시점의 서울 기준 날짜를 반환한다.
 * @param now 생략하면 현재 시점. 테스트에서는 고정된 시점을 전달할 수 있다.
 * @returns YYYY-MM-DD 형식의 날짜
 */
export function todayInSeoul(now = new Date()) {
    // 캐나다 영어 표기를 이용해 YYYY-MM-DD로 바로 변경한다.
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(now);
}

/**
 * MDX 글을 초안까지 포함해 읽고 검증하여 공개일 최신순으로 반환한다.
 * @param directory 읽을 mdx 파일들이 존재하는 위치
 * @param today 미래 날짜 검증의 기준일 (YYYY-MM-DD)
 * @param publicDirectory 글에 지정된 썸네일의 존재 여부를 확인할 public 폴더
 */
export async function loadPosts(
    directory: string,
    today = todayInSeoul(),
    publicDirectory = path.join(process.cwd(), 'public'),
): Promise<PostDetail[]> {
    const files = await readMdxFiles(directory);
    const seen = new Set<string>();

    // 중복 검사 상태와 기준일을 공유하며 파일별 메타데이터를 검증한다.
    const posts = files.map(function validatePost({ filename, data, content }) {
        const parsed = postSchema.safeParse(data);

        // 포스트의 data가 유효하지 않은 경우 에러 메세지에 에러 발생 파일 정보를 추가하기 위해 parse가 아닌 safeParse를 사용했다.
        if (!parsed.success)
            // 어느 파일의 / 어떤 필드가 / 왜 잘못되었는지에 대한 정보를 포함한다.
            throw new Error(
                `${filename}: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`,
            );

        const post = parsed.data;
        // slug 중복 여부 판단
        if (seen.has(post.slug)) throw new Error(`${filename}: 중복 slug ${post.slug}`);
        seen.add(post.slug);

        // 파일명과 slug가 일치하지 않는 경우
        if (filename !== `${post.slug}.mdx`) throw new Error(`${filename}: 파일명과 slug가 다릅니다.`);

        // 존재하지 않는 카테고리인 경우
        if (!categoryIndex.byId.has(post.categoryId))
            throw new Error(`${filename}: 없는 categoryId ${post.categoryId}`);

        // 수정일이 공개일보다 빠른 경우
        if (post.updated && post.updated < post.date)
            throw new Error(`${filename}: 수정일이 공개일보다 빠릅니다.`);

        // 공개 글의 공개일 또는 수정일이 기준일보다 미래인 경우
        if (!post.draft && (post.date > today || (post.updated && post.updated > today)))
            throw new Error(`${filename}: 미래 날짜의 공개 글은 지원하지 않습니다.`);

        // 글에 지정한 썸네일 파일이 publicDirectory 아래에 없는 경우
        if (post.thumbnail && !existsSync(path.join(publicDirectory, post.thumbnail.src)))
            throw new Error(`${filename}: 썸네일 파일이 없습니다: ${post.thumbnail.src}`);
        return { ...post, content };
    });

    return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)); // 최신순으로 정렬
}

/**
 * React 서버 렌더의 캐시 범위에서 공개 글 조회 Promise를 공유한다.
 * 파일 읽기·검증·정렬의 중복 실행을 줄인다.
 */
export const getPublishedPosts = cache(async () => {
    // 테스트·데모에서 콘텐츠 위치를 바꿀 수 있다. 실행 환경을 제한하는 검사는 없다.
    const directory = process.env.CONTENT_DIRECTORY || path.join(process.cwd(), 'content/posts');
    return (await loadPosts(directory)).filter((post) => !post.draft); // 공개된 글만 필터링
});

/**
 * 글 본문을 제외하고 목록·카드용 데이터를 만든다.
 * 글 주소, 카테고리 경로, 우선순위에 따른 썸네일을 추가한다.
 */
export function toSummary(post: PostDetail): PostSummary {
    // 글 본문을 제외하고 목록·카드용 데이터를 만든다
    const { content: _content, ...metadata } = post;
    // 본문을 의도적으로 사용하지 않음을 나타내고 미사용 변수 린트 오류를 피한다.
    void _content;

    // 최상위부터 글이 속한 카테고리 자신까지의 목록
    const ancestors = categoryIndex.ancestors(post.categoryId);

    return {
        ...metadata,
        href: `/blog/${post.slug}`,
        categoryPath: ancestors.map((c) => ({ name: c.name, href: categoryIndex.href(c.id) })),
        // 글 → 자신의 카테고리 → 상위 카테고리 → 기본 이미지 순으로 선택한다.
        cover: post.thumbnail ??
            [...ancestors].reverse().find((c) => c.thumbnail)?.thumbnail ?? {
                src: '/images/default-thumbnail.png',
                alt: '',
            },
    };
}

/**
 * 공개 글에 대해 `toSummary`를 실행한 결과를 캐시 범위 안에서 공유한다.
 */
export const getPostSummaries = cache(async () => (await getPublishedPosts()).map(toSummary));

/**
 * slug에 해당하는 공개 글을 반환한다.
 * @param slug /blog/[slug] 주소의 마지막 경로 조각
 * @returns 공개 글이 없으면 undefined
 */
export async function getPost(slug: string) {
    return (await getPublishedPosts()).find((post) => post.slug === slug);
}

/**
 * 해당 카테고리와 하위 카테고리에 속한 공개 글의 요약을 반환한다.
 * @param id 카테고리의 id
 */
export async function getCategoryPosts(id: string) {
    return (await getPostSummaries()).filter((p) => categoryIndex.includes(id, p.categoryId));
}

/**
 * 표시용 일자를 반환하는 함수
 * @param value `2026-09-07`
 * @returns `2026년 9월 7일`
 */
export function formatDate(value: string) {
    return new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(`${value}T00:00:00+09:00`));
}
