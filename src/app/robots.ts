import type { MetadataRoute } from 'next';
import { getSiteOrigin, isPublicSite } from '@/lib/seo/metadata';
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', ...(isPublicSite() ? { allow: '/' } : { disallow: '/' }) },
        sitemap: `${getSiteOrigin()}/sitemap.xml`,
    };
}
