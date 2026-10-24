import { profile } from '@content/site';
import { categoryIndex, getPublishedPosts } from '@/lib/content';
import { getSiteOrigin } from '@/lib/seo/metadata';

// GET Route Handlers are dynamic by default since Next 15; the feed only changes on deploy.
export const dynamic = 'force-static';

const escapeXml = (value: string) =>
    value.replace(
        /[<>&'"]/g,
        (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!,
    );

/** YYYY-MM-DD(서울 기준)를 RSS가 요구하는 RFC 822 날짜로 바꾼다. */
const toRfc822 = (date: string) => new Date(`${date}T00:00:00+09:00`).toUTCString();

/**
 * 공개 글 RSS 2.0 피드. 최신순 전체이며 본문 대신 요약을 담는다.
 */
export async function GET() {
    const origin = getSiteOrigin();
    const posts = await getPublishedPosts();

    const items = posts
        .map((post) => {
            const url = `${origin}/blog/${post.slug}`;
            const category = categoryIndex.byId.get(post.categoryId)?.name;
            return [
                '<item>',
                `<title>${escapeXml(post.title)}</title>`,
                `<link>${url}</link>`,
                `<guid isPermaLink="true">${url}</guid>`,
                `<pubDate>${toRfc822(post.date)}</pubDate>`,
                `<description>${escapeXml(post.summary)}</description>`,
                category ? `<category>${escapeXml(category)}</category>` : '',
                '</item>',
            ].join('');
        })
        .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(profile.name)}</title>
<link>${origin}</link>
<description>${escapeXml(profile.description)}</description>
<language>ko</language>
<atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>
${posts[0] ? `<lastBuildDate>${toRfc822(posts[0].updated ?? posts[0].date)}</lastBuildDate>` : ''}
${items}
</channel>
</rss>`;

    return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
