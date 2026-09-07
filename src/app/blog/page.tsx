import { CategoryNav, PostList } from '@/components/blog';
import { categoryIndex, getPostSummaries } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('블로그', '개발하며 배운 내용과 문제를 해결한 기록', '/blog');

export default async function Blog() {
    const posts = await getPostSummaries();
    const topLevel = categoryIndex.all
        .filter((c) => !c.parentId)
        .map((c) => ({
            id: c.id,
            name: c.name,
            href: categoryIndex.href(c.id),
            count: posts.filter((p) => categoryIndex.includes(c.id, p.categoryId)).length,
        }));

    return (
        <>
            <h1 className="page-title">블로그</h1>
            <p className="meta">전체 글 {posts.length}편</p>
            <CategoryNav items={topLevel} ariaLabel="대분류" />
            <PostList posts={posts} />
        </>
    );
}
