'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useSyncExternalStore } from 'react';
import { MenuIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme';
import { IconButton } from '@/components/common/icon-button';
import {
    getSidebarServerSnapshot,
    getSidebarSnapshot,
    isSidebarOverlay,
    setSidebarOpen,
    subscribeSidebar,
} from '@/lib/sidebar-store';

export type CategoryLink = { id: string; name: string; href: string; parentId?: string; count: number };

const links = [
    { name: '홈', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
];

/**
 * Fixed header plus a left sidebar that pushes the content column aside. Below
 * the overlay breakpoint the sidebar stops pushing and floats over the content
 * with a scrim instead — see `--sidebar-width` in globals.css.
 *
 * The sidebar lives outside <header> so it can own its own scroll; when it was
 * nested inside the 69px fixed header its lower items were unreachable.
 */
export function AppShell({
    categories,
    children,
}: {
    categories: CategoryLink[];
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const open = useSyncExternalStore(subscribeSidebar, getSidebarSnapshot, getSidebarServerSnapshot);
    const buttonRef = useRef<HTMLButtonElement>(null);

    function close() {
        setSidebarOpen(false);
    }

    function closeAndRefocus() {
        close();
        buttonRef.current?.focus();
    }
    /**
     * Following a link only closes the sidebar where it covers the page. While it
     * pushes the content aside there is nothing to get out of the way of, and
     * closing it every time makes it useless for browsing categories.
     */
    function closeIfOverlay() {
        if (isSidebarOverlay()) close();
    }

    const parents = categories.filter((c) => !c.parentId);

    return (
        <div
            className="shell"
            data-sidebar={open ? 'open' : 'closed'}
            onKeyDown={(event) => {
                if (event.key === 'Escape' && open) closeAndRefocus();
            }}
        >
            <header className="site-header">
                <div className="header-row">
                    <div className="header-start">
                        <IconButton
                            ref={buttonRef}
                            className="menu-button"
                            type="button"
                            aria-expanded={open}
                            aria-controls="site-menu"
                            onClick={() => setSidebarOpen(!open)}
                            ariaLabel={open ? '메뉴 닫기' : '메뉴 열기'}
                        >
                            <MenuIcon size={20} />
                        </IconButton>
                        <Link href="/" className="brand text-link">
                            mori.archive
                        </Link>
                    </div>

                    <div className="header-actions">
                        <nav aria-label="주요 페이지" className="primary-nav">
                            {links.slice(1).map((link) => (
                                <Link
                                    className="nav-link text-link"
                                    key={link.href}
                                    href={link.href}
                                    aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <aside id="site-menu" className="sidebar" aria-label="사이트와 블로그 분류" inert={!open}>
                <h2 className="sidebar-title">사이트 이동</h2>
                <ul className="sidebar-list">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                className="sidebar-link"
                                href={link.href}
                                onClick={closeIfOverlay}
                                aria-current={pathname === link.href ? 'page' : undefined}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <h2 className="sidebar-title">블로그 분류</h2>
                <ul className="sidebar-list">
                    <li>
                        <Link
                            className="sidebar-link"
                            href="/blog"
                            onClick={closeIfOverlay}
                            aria-current={pathname === '/blog' ? 'page' : undefined}
                        >
                            전체 글
                        </Link>
                    </li>
                    {parents.map((parent) => (
                        <li key={parent.id}>
                            <Link
                                className="sidebar-link"
                                href={parent.href}
                                onClick={closeIfOverlay}
                                aria-current={pathname === parent.href ? 'page' : undefined}
                            >
                                {parent.name}
                                <span className="sidebar-count">{parent.count}</span>
                            </Link>
                            {categories.some((c) => c.parentId === parent.id) && (
                                <ul className="sidebar-list sidebar-sublist">
                                    {categories
                                        .filter((c) => c.parentId === parent.id)
                                        .map((child) => (
                                            <li key={child.id}>
                                                <Link
                                                    className="sidebar-link"
                                                    href={child.href}
                                                    onClick={closeIfOverlay}
                                                    aria-current={
                                                        pathname === child.href ? 'page' : undefined
                                                    }
                                                >
                                                    {child.name}
                                                    <span className="sidebar-count">{child.count}</span>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
            {/* 사이드바가 본문 위에 겹치는 오버레이 화면에서만 표시한다. */}
            <div className="sidebar-scrim" onClick={closeAndRefocus} />

            <div className="shell-content">{children}</div>
        </div>
    );
}
