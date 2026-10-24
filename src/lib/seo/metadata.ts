import type { Metadata } from 'next';
import { profile } from '@content/site';
import { about } from '@content/about';
import { toSummary, type PostDetail } from '@/lib/content/posts';

/** RSS 구독 주소. 모든 페이지의 `<link rel="alternate">`로 알린다. */
export const FEED_PATH = '/feed.xml';

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
        // 페이지의 alternates는 레이아웃 것을 덮어쓰므로 RSS 링크도 여기서 함께 넣는다.
        alternates: {
            canonical: url,
            types: {
                'application/rss+xml': [{ url: `${getSiteOrigin()}${FEED_PATH}`, title: profile.name }],
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: profile.name,
            locale: 'ko_KR',
            type: 'website',
            images: [
                {
                    url: `${getSiteOrigin()}/images/default-thumbnail.png`,
                    width: 1672,
                    height: 941,
                    alt: profile.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${getSiteOrigin()}/images/default-thumbnail.png`],
        },
    };
}

/**
 * 글 metadata를 생성하는 함수
 */
export function postMetadata(post: PostDetail): Metadata {
    const base = pageMetadata(post.title, post.summary, `/blog/${post.slug}`);
    // 목록 카드와 같은 우선순위(글 → 분류 → 기본)로 고른 이미지를 공유 미리보기에도 쓴다.
    const cover = toSummary(post).cover;
    const image = { url: `${getSiteOrigin()}${cover.src}`, alt: cover.alt || post.title };

    return {
        ...base,
        openGraph: {
            ...base.openGraph,
            type: 'article',
            publishedTime: `${post.date}T00:00:00+09:00`,
            modifiedTime: `${post.updated ?? post.date}T00:00:00+09:00`,
            tags: post.tags,
            images: [image],
        },
        twitter: { ...base.twitter, images: [image.url] },
    };
}

/** 사이트 작성자. 사이트·글 구조화 데이터가 같은 사람을 가리키게 한다. */
function authorJsonLd() {
    const origin = getSiteOrigin();
    return {
        '@type': 'Person',
        '@id': `${origin}/about#person`,
        name: about.name,
        jobTitle: about.role,
        url: `${origin}/about`,
        image: `${origin}${about.photo.src}`,
        sameAs: about.contacts.filter((c) => c.href.startsWith('https://')).map((c) => c.href),
    };
}

/** 모든 페이지에 넣는 WebSite + Person. */
export function siteJsonLd() {
    const origin = getSiteOrigin();
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: profile.name,
            description: profile.description,
            url: origin,
            inLanguage: 'ko-KR',
            author: { '@id': `${origin}/about#person` },
        },
        { '@context': 'https://schema.org', ...authorJsonLd() },
    ];
}

/** 글 상세의 BlogPosting. */
export function postJsonLd(post: PostDetail) {
    const origin = getSiteOrigin();
    const url = `${origin}/blog/${post.slug}`;
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        url,
        mainEntityOfPage: url,
        datePublished: `${post.date}T00:00:00+09:00`,
        dateModified: `${post.updated ?? post.date}T00:00:00+09:00`,
        image: `${origin}${toSummary(post).cover.src}`,
        inLanguage: 'ko-KR',
        keywords: post.tags.join(', '),
        author: authorJsonLd(),
    };
}
