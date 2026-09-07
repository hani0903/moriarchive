import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    name: string;
    /** 현재 페이지를 나타내는 마지막 항목은 생략한다. */
    href?: string;
}

/**
 * 글 상세·카테고리 페이지에서 사용하는 현재 위치 경로
 * - 공통 마크업과 구분자를 사용해 페이지마다 표시 방식이 달라지지 않게 한다.
 *
 * 계층 순서를 표현하기 위해 순서 있는 목록을 사용한다.
 * `href`가 없는 항목은 현재 페이지이므로 이동할 수 있는 링크 대신
 * `aria-current="page"`가 붙은 텍스트로 표시한다.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="현재 위치">
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={item.href ?? item.name} className="breadcrumb-item">
                        {index > 0 && <ChevronRight size={16} aria-hidden="true" />}
                        {item.href ? (
                            <Link href={item.href}>{item.name}</Link>
                        ) : (
                            <span aria-current="page">{item.name}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
