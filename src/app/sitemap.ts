import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/content/posts';
import { categoryIndex } from '@/lib/content/categories';
import { getProjects } from '@/lib/content/projects';
import { getSiteOrigin } from '@/lib/seo/metadata';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const origin = getSiteOrigin();
    const posts = await getPublishedPosts();
    const projects = await getProjects();
    return [
        ...['/', '/blog', '/projects', '/about'].map((pathname) => ({ url: `${origin}${pathname}` })),
        ...categoryIndex.all
            .filter((c) => posts.some((p) => categoryIndex.includes(c.id, p.categoryId)))
            .map((c) => ({ url: `${origin}${categoryIndex.href(c.id)}` })),
        ...projects.map((p) => ({ url: `${origin}/projects/${p.id}` })),
        ...posts.map((p) => ({
            url: `${origin}/blog/${p.slug}`,
            lastModified: `${p.updated ?? p.date}T00:00:00+09:00`,
        })),
    ];
}
