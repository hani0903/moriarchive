import { z } from 'zod';

/** URL에 들어가는 문자열을 검사하는 스킴
 * - ex) example.com/posts/my-first-post의 `my-first-post`
 */
export const slugSchema = z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '영문 소문자·숫자·하이픈으로 입력하세요.');

/**
 * 작성일자 문자열을 검사하는 스킴
 * - ex) 2026-03-43와 같이 존재하지 않는 날짜를 걸러낸다.
 */
export const dateSchema = z.string().refine((value) => {
    // 숫자 4개-2개-2개의 형태가 아니면 오류
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    // round-trip 검증
    const date = new Date(`${value}T00:00:00Z`); // 실제 존재하는 일인지 확인하기 위해 Date 객체 생성 (2월 31일, 3월 32일)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, '유효한 YYYY-MM-DD 날짜를 따옴표로 감싸 입력하세요.');

/**
 * 이미지의 경로 검증
 * - `/images`로 시작하고 허용된 확장자인 (`png`|`jpeg`|`jpg`|`webp`|`avif`|`svg`) 중 하나로 끝나야 한다.
 */
const localImagePath = z
    .string()
    .regex(
        /^\/images\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|avif|svg)$/,
        'public/images 아래의 이미지 경로를 입력하세요.',
    );
/**
 * 이미지 객체를 검증하는 스킴
 * - 이미지 객체의 `src`는 `localImagePath`를 만족해야 한다.
 * - 이미지 객체는 `alt`를 반드시 가져야 한다. (접근성 규칙 강제)
 */
export const imageSchema = z.object({ src: localImagePath, alt: z.string() });

/**
 * 카테고리 객체를 검증하는 스킴
 */
export const categorySchema = z.object({
    id: slugSchema,
    name: z.string().min(1),
    slug: slugSchema,
    parentId: slugSchema.optional(), // 최상위 카테고리는 없으므로 optional
    order: z.number().int().default(0),
    thumbnail: imageSchema.optional(),
});
export type Category = z.infer<typeof categorySchema>; // 스키마를 기준으로 타입스크립트 타입 추론

/**
 * 포스트의 frontmatter를 검증하는 스킴
 */
export const postSchema = z
    .object({
        title: z.string().trim().min(1),
        slug: slugSchema,
        date: dateSchema,
        summary: z.string().trim().min(1),
        categoryId: slugSchema,
        draft: z.boolean().default(true),
        tags: z.array(z.string().trim().min(1)).default([]),
        updated: dateSchema.optional(),
        thumbnail: imageSchema.optional(),
        originalUrl: z
            .url()
            .refine((s) => /^https?:\/\//.test(s), 'http(s) 주소를 입력하세요.')
            .optional(),
    })
    .strict();
export type PostFrontmatter = z.infer<typeof postSchema>;

/**
 * 프로젝트의 frontmatter를 검증하는 스킴
 */
export const projectSchema = z.object({
    id: slugSchema,
    title: z.string().min(1),
    summary: z.string().min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    collaboration: z.enum(['개인', '팀']),
    problem: z.string().min(1),
    contribution: z.string().min(1),
    outcome: z.string().min(1),
    technologies: z.array(z.string().min(1)),
    image: imageSchema.optional(),
    links: z
        .array(z.object({ label: z.string().min(1), href: z.url().refine((s) => /^https?:\/\//.test(s)) }))
        .default([]),
    featuredOrder: z.number().int().nonnegative().optional(),
});
export type Project = z.infer<typeof projectSchema>;
