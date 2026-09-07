import type { Metadata } from 'next';
import { categoryIndex, getCategoryPosts } from '@/lib/content';
import { CategoryNav, PostList } from '@/components/blog';
import { Breadcrumb, SectionHeader } from '@/components/common';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo/metadata';

type Props = { params: Promise<{ path: string[] }> };

/** 하위 카테고리별 미리보기에서 표시할 글의 최대 개수. */
const GROUP_LIMIT = 6;

export const dynamicParams = false;

export function generateStaticParams() {
    return [...categoryIndex.byPath.keys()].map((p) => ({ path: p.split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { path } = await params;
    const c = categoryIndex.byPath.get(path.join('/'));
    if (!c) notFound();
    return pageMetadata(`${c.name} 글`, `${c.name} 분류의 글 모음`, categoryIndex.href(c.id));
}

export default async function CategoryPage({ params }: Props) {
    const { path } = await params;
    const category = categoryIndex.byPath.get(path.join('/'));
    if (!category) notFound();

    const posts = await getCategoryPosts(category.id);
    const children = categoryIndex.all.filter((c) => c.parentId === category.id);
    const childNav = children.map((child) => ({
        id: child.id,
        name: child.name,
        href: categoryIndex.href(child.id),
        count: posts.filter((p) => categoryIndex.includes(child.id, p.categoryId)).length,
    }));

    // 글이 있는 하위 카테고리가 둘 이상일 때만 하위 카테고리별로 묶는다.
    // 하나뿐이면 제목 단계만 늘어나고 내용을 구분하는 효과가 없기 때문이다.
    const groups = children
        .map((child) => ({
            child,
            posts: posts.filter((p) => categoryIndex.includes(child.id, p.categoryId)),
        }))
        .filter((group) => group.posts.length > 0);
    const grouped = groups.length > 1;
    const directPosts = posts.filter((p) => p.categoryId === category.id);

    // 전체 카테고리 경로를 표시한다. 마지막 항목은 현재 페이지이므로 링크 대신
    // aria-current를 사용한다. 그렇지 않으면 /algorithm과 /algorithm/dp의
    // 경로가 동일하게 보인다.
    const ancestors = categoryIndex.ancestors(category.id);
    const trail = [
        { name: '블로그', href: '/blog' },
        ...ancestors.map((c, i) => ({
            name: c.name,
            href: i === ancestors.length - 1 ? undefined : categoryIndex.href(c.id),
        })),
    ];

    return (
        <>
            <Breadcrumb items={trail} />
            <h1 className="page-title">{category.name}</h1>
            <p className="meta">{posts.length}편</p>
            <CategoryNav items={childNav} ariaLabel="하위 분류" />
            {grouped ? (
                <>
                    {directPosts.length > 0 && <PostList posts={directPosts} />}
                    {groups.map(({ child, posts: childPosts }) => (
                        <section
                            key={child.id}
                            className="content-section"
                            aria-labelledby={`group-${child.id}`}
                        >
                            <SectionHeader
                                id={`group-${child.id}`}
                                title={child.name}
                                href={categoryIndex.href(child.id)}
                                linkLabel={`${child.name} 글 전체 보기`}
                            />
                            <PostList posts={childPosts.slice(0, GROUP_LIMIT)} />
                        </section>
                    ))}
                </>
            ) : (
                <PostList posts={posts} />
            )}
        </>
    );
}
