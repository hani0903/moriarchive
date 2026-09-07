import type { Metadata } from 'next';
import { categoryIndex, getPostSummaries } from '@/lib/content';
import { profile } from '@content/site';
import { AppShell } from '@/components/app-shell';
import { ThemeRoot } from '@/components/theme';
import { getSiteOrigin, isPublicSite } from '@/lib/seo/metadata';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL(getSiteOrigin()),
    title: { default: profile.name, template: `%s | ${profile.name}` },
    description: profile.description,
    robots: { index: isPublicSite(), follow: isPublicSite() },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
    const posts = await getPostSummaries();
    const categories = categoryIndex.all.map((c) => ({
        id: c.id,
        name: c.name,
        parentId: c.parentId,
        href: categoryIndex.href(c.id),
        count: posts.filter((p) => categoryIndex.includes(c.id, p.categoryId)).length,
    }));

    // data-scroll-behavior lets Next disable smooth scrolling during route
    // transitions. Without it the scroll reset animates, Next re-measures before
    // the animation lands, and falls back to scrollIntoView() — which parks the
    // article top under the fixed header.
    return (
        <html lang="ko" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body>
                <ThemeRoot>
                    <a className="skip text-link" href="#main">
                        본문으로 바로가기
                    </a>
                    <AppShell categories={categories}>
                        <main id="main" className="site-main" tabIndex={-1}>
                            {children}
                        </main>
                        <footer className="site-footer">
                            <p className="footer-copy">
                                © {new Date().getFullYear()} {profile.name}
                            </p>
                            <ul className="links">
                                {profile.links.map((l) => (
                                    <li key={l.href}>
                                        <a className="text-link" href={l.href}>
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </footer>
                    </AppShell>
                </ThemeRoot>
            </body>
        </html>
    );
}
