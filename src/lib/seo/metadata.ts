import type { Metadata } from 'next';
import { profile } from '@content/site';
import type { PostDetail } from '@/lib/content/posts';

export function getSiteOrigin() {
    const url = new URL(process.env.SITE_URL || 'http://localhost:3000');

    if (
        !['https:', 'http:'].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.pathname !== '/' ||
        url.search ||
        url.hash
    )
        throw new Error('SITE_URL에는 http(s) origin만 입력하세요.');

    return url.origin;
}

/**
 * localhost가 아닌 도메인인지 확인하는 유틸
 * @returns
 */
export function isPublicSite() {
    const url = new URL(getSiteOrigin());

    return (
        Boolean(process.env.SITE_URL) &&
        url.protocol === 'https:' &&
        !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    );
}

/**
 * 페이지 metadata를 생성하는 기본 함수
 * @param title
 * @param description
 * @param pathname
 * @returns
 */
export function pageMetadata(title: string, description: string, pathname: string): Metadata {
    const url = `${getSiteOrigin()}${pathname}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: profile.name,
            locale: 'ko_KR',
            type: 'website',
            images: [{ url: `${getSiteOrigin()}/og.png`, width: 1200, height: 630, alt: profile.name }],
        },
        twitter: { card: 'summary_large_image', title, description, images: [`${getSiteOrigin()}/og.png`] },
    };
}

/**
 * 글 metadata를 생성하는 함수
 */
export function postMetadata(post: PostDetail): Metadata {
    const base = pageMetadata(post.title, post.summary, `/blog/${post.slug}`);

    return {
        ...base,
        openGraph: {
            ...base.openGraph,
            type: 'article',
            publishedTime: `${post.date}T00:00:00+09:00`,
            modifiedTime: `${post.updated ?? post.date}T00:00:00+09:00`,
            tags: post.tags,
        },
    };
}
