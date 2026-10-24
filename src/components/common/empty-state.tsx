import Image from 'next/image';
import Link from 'next/link';

export interface EmptyStateProps {
    title: string;
    description?: string;
    /** 실제로 이동할 수 있는 곳만 넣는다. 첫 항목이 주된 동작으로 강조된다. */
    actions?: { href: string; label: string }[];
}

/**
 * 목록이 비었을 때의 안내. 로고의 나무 + 한 줄 제목 + 짧은 설명 + 갈 수 있는 링크.
 * - 나무는 「아직 자라는 중」이라는 뜻으로 쓴다. 장식이므로 대체 텍스트를 비운다.
 * - 가짜 글·작성 버튼·검색 같은 없는 기능을 만들지 않는다(DESIGN.md 8절 빈 상태).
 */
export function EmptyState({ title, description, actions = [] }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <Image
                className="empty-state-art only-light"
                src="/images/brand/tree-light.png"
                alt=""
                width={119}
                height={192}
            />
            <Image
                className="empty-state-art only-dark"
                src="/images/brand/tree-dark.png"
                alt=""
                width={119}
                height={192}
            />
            <h2 className="empty-state-title">{title}</h2>
            {description && <p className="empty-state-description">{description}</p>}
            {actions.length > 0 && (
                <ul className="plain-list empty-state-actions">
                    {actions.map((a, i) => (
                        <li key={a.href}>
                            <Link
                                className={i === 0 ? 'pill-link pill-link-primary' : 'pill-link'}
                                href={a.href}
                            >
                                {a.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
