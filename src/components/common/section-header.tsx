import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface SectionHeaderProps {
    /** 섹션의 aria-labelledby 값과 일치시킨다. */
    id: string;
    title: string;
    /** 두 값을 모두 생략하면 제목만 표시한다. */
    href?: string;
    linkLabel?: string;
}

/**
 * 섹션 제목과 선택적인 전체 보기 링크를 같은 기준선에 배치한다.
 */
export function SectionHeader({ id, title, href, linkLabel }: SectionHeaderProps) {
    return (
        <div className="section-header">
            <h2 className="section-title" id={id}>
                {title}
            </h2>
            {href && linkLabel && (
                <Link className="arrow-link" href={href}>
                    {linkLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            )}
        </div>
    );
}
