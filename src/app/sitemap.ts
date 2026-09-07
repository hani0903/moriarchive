import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/content/posts';
import { categoryIndex } from '@/lib/content/categories';
import { getSiteOrigin } from '@/lib/seo/metadata';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const origin = getSiteOrigin();
    const posts = await getPublishedPosts();
    return [
        ...['/', '/blog', '/projects', '/about'].map((pathname) => ({ url: `${origin}${pathname}` })),
        ...categoryIndex.all
            .filter((c) => posts.some((p) => categoryIndex.includes(c.id, p.categoryId)))
            .map((c) => ({ url: `${origin}${categoryIndex.href(c.id)}` })),
        ...posts.map((p) => ({
            url: `${origin}/blog/${p.slug}`,
            lastModified: `${p.updated ?? p.date}T00:00:00+09:00`,
        })),
    ];
}
