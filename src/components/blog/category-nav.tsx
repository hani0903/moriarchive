import Link from 'next/link';

export interface CategoryNavItem {
    id: string;
    name: string;
    href: string;
    count: number;
}

/**
 * 같은 단계 또는 하위 카테고리를 칩 목록으로 표시한다.
 * /blog의 대분류 목록과 카테고리 페이지의 하위 분류에 사용한다.
 * 모든 글에는 카테고리가 있으므로 미분류 칩은 표시하지 않는다.
 */
export function CategoryNav({
    items,
    ariaLabel,
    currentId,
}: {
    items: CategoryNavItem[];
    ariaLabel: string;
    currentId?: string;
}) {
    if (!items.length) return null;

    return (
        <nav aria-label={ariaLabel}>
            <ul className="category-nav">
                {items.map((item) => (
                    <li key={item.id}>
                        <Link
                            className="category-chip"
                            href={item.href}
                            aria-current={item.id === currentId ? 'page' : undefined}
                        >
                            {item.name}
                            <span className="category-chip-count">{item.count}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
