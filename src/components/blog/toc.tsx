'use client';
import { useEffect, useState } from 'react';

const HEADING_GAP_PX = 24;
const FALLBACK_HEADER_HEIGHT_PX = 69;
const SWEEP_LIMIT_RATIO = 0.55;

export interface TocHeading {
    id: string;
    title: string;
    depth: 2 | 3;
}

/** CSS 변수에서 고정 헤더와 간격을 고려한 목차 판정선 위치를 계산한다. */
function readHeaderOffset() {
    const raw = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
    );
    return (Number.isFinite(raw) ? raw : FALLBACK_HEADER_HEIGHT_PX) + HEADING_GAP_PX;
}

/**
 * 목차와 현재 읽는 위치를 표시하는 컴포넌트
 * - JavaScript가 동작하지 않아도 앵커 목록은 사용할 수 있다.
 * - 현재 제목 강조만 클라이언트에서 동작한다.
 */
export function Toc({ headings }: { headings: TocHeading[] }) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        // headings의 ID를 실제 본문 제목 요소로 연결
        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((el): el is HTMLElement => el !== null);

        // 본문에 존재하는 제목이 없으면 이벤트를 등록하지 않는다.
        const [firstElement] = elements;
        if (!firstElement) return;

        let frame = 0; // 화면 갱신 작업 예약 유무를 저장하는 변수

        /** 스크롤 위치를 기준으로 현재 읽는 제목을 계산하는 함수 */
        function update() {
            // 예약된 프레임이 실행됐으므로 다음 예약을 허용
            frame = 0;

            const viewport = window.innerHeight;
            const maxScroll = document.documentElement.scrollHeight - viewport;
            const remaining = Math.max(0, maxScroll - window.scrollY);

            // 일반적으로 고정 헤더 바로 아래를 지난 마지막 제목을 현재 위치로 정한다.
            // 페이지 끝에서는 제목을 더 위로 올릴 수 없으므로 판정선을 아래로 이동한다.
            // 판정선은 화면 중앙 부근에서 멈춰 마지막 제목으로 무조건 바뀌지 않게 한다.
            const headerOffset = readHeaderOffset();
            const sweep = Math.max(0, viewport - remaining);
            const line = Math.min(headerOffset + sweep, Math.max(headerOffset, viewport * SWEEP_LIMIT_RATIO));

            // 판정선 위로 올라온 제목 중 가장 마지막 제목을 선택한다.
            let current = firstElement.id;
            for (const el of elements) {
                if (el.getBoundingClientRect().top <= line) current = el.id;
                else break;
            }
            setActiveId(current);
        }

        function schedule() {
            // 스크롤 이벤트가 한 프레임에 여러 번 발생해도 위치 계산은 한 번만 실행한다.
            if (!frame) frame = requestAnimationFrame(update);
        }

        // 마운트 직후 현재 스크롤 위치를 반영한다.
        schedule();

        // 스크롤·화면 크기 변경 때 다음 화면 갱신 시점에 위치를 다시 계산한다.
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            // 컴포넌트가 사라질 때 예약된 작업과 이벤트 리스너를 정리한다.
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [headings]);

    return (
        <nav aria-label="목차" className="toc">
            <h2 className="toc-title">목차</h2>
            <ul>
                {headings.map((heading) => (
                    <li key={heading.id} className={heading.depth === 3 ? 'subheading' : undefined}>
                        <a
                            className="toc-link"
                            href={`#${heading.id}`}
                            aria-current={heading.id === activeId ? 'location' : undefined}
                        >
                            {heading.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
