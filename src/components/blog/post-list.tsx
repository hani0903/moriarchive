import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type PostSummary } from '@/lib/content/posts';

export function PostList({ posts }: { posts: PostSummary[] }) {
    if (!posts.length) return <p className="empty">아직 공개된 글이 없습니다.</p>;

    return (
        <div className="post-list">
            {posts.map((post) => (
                <article key={post.slug} className="post-card">
                    <div className="post-card-media">
                        <Image
                            src={post.cover.src}
                            alt={post.cover.alt}
                            width={640}
                            height={360}
                            sizes="(max-width: 639px) 112px, (max-width: 1023px) 50vw, 33vw"
                            className="thumbnail"
                        />
                    </div>
                    <div className="post-card-body">
                        <p className="post-card-category">
                            {post.categoryPath.map((c) => c.name).join(' / ')}
                        </p>
                        <h3 className="card-title">
                            <Link className="text-link" href={post.href}>
                                {post.title}
                            </Link>
                        </h3>
                        <p className="card-summary">{post.summary}</p>
                        <p className="post-card-meta">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.tags.length > 0 && (
                                <span className="post-card-tags">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </span>
                            )}
                        </p>
                    </div>
                </article>
            ))}
        </div>
    );
}
