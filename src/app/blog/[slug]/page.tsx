import type { Metadata } from 'next';
import { categoryIndex, formatDate, getPost, getPublishedPosts } from '@/lib/content';
import { Toc } from '@/components/blog';
import { Breadcrumb } from '@/components/common';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { renderMdx } from '@/lib/mdx/render';
import { postMetadata } from '@/lib/seo/metadata';

type PostPageProps = { params: Promise<{ slug: string }> };

/**
 * 정적 블로그이므로 목록에 없는 slug로 접근했을 때 즉시 404로 이동한다.
 */
export const dynamicParams = false;
/**
 * 빌드 시작 시 한 번 호출되는 함수로, 어떤 URL을 만들지 파악하기 위해 호출된다.
 * @returns
 */
export async function generateStaticParams() {
    const publishedPosts = await getPublishedPosts();
    return publishedPosts.map((p) => ({ slug: p.slug }));
}

/**
 * 페이지의 metadata를 동적으로 생성하는 함수
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { slug } = await params;

    const post = await getPost(slug);
    if (!post) notFound();

    return postMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPost((await params).slug);

    if (!post) notFound();

    const category = categoryIndex.byId.get(post.categoryId);
    if (!category) notFound();

    const { content, headings } = await renderMdx(post.content);
    const categoryPath = categoryIndex.path(post.categoryId);

    return (
        <article className="article">
            <Breadcrumb items={[{ name: '블로그', href: '/blog' }, ...categoryPath]} />
            <h1 className="page-title">{post.title}</h1>
            <p className="page-intro">{post.summary}</p>
            <p className="meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.updated && post.updated !== post.date && (
                    <>
                        {' '}
                        · 수정 <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </>
                )}
            </p>
            <ul className="tags" aria-label="태그">
                {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
            {post.originalUrl && (
                <p>
                    <a className="text-link" href={post.originalUrl}>
                        이전 블로그에서 처음 공개한 글 보기
                    </a>
                </p>
            )}
            {headings.length > 0 && (
                <div className="toc-rail">
                    <Toc headings={headings} />
                </div>
            )}
            <div className="prose prose-mori max-w-none">{content}</div>
            <nav className="post-bottom" aria-label="다른 글 탐색">
                <Link className="arrow-link" href={categoryIndex.href(category.id)}>
                    {category.name} 글 더 보기
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link className="arrow-link" href="/blog">
                    전체 글 보기
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </nav>
        </article>
    );
}
