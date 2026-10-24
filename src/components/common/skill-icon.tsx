import { useId, type ReactNode } from 'react';
import { SKILL_ICONS } from '@/lib/skill-icons';

/**
 * 기술 칩 앞의 단색 브랜드 아이콘. 글자색(`currentColor`)을 따른다.
 * - 아이콘이 없는 기술은 아무것도 그리지 않는다.
 * - `cut`은 그때까지 그린 도형을 mask로 감싸 뚫는다. 뒤의 `fill`은 mask 밖에 그려 다시 위에 올라온다.
 *   원본의 흰 도형을 배경색으로 칠하지 않는 이유는 칩 배경이 투명이라 테마마다 색이 달라서다.
 */
export function SkillIcon({ name }: { name: string }) {
    const id = useId();
    const icon = SKILL_ICONS[name];
    if (!icon) return null;

    const [, , width, height] = icon.viewBox.split(' ');
    const masks: ReactNode[] = [];
    let drawn: ReactNode[] = [];
    icon.ops.forEach(([op, d], i) => {
        if (op === 'fill') {
            drawn.push(<path key={i} d={d} />);
            return;
        }
        const maskId = `${id}-${i}`;
        masks.push(
            <mask key={maskId} id={maskId}>
                <rect width={width} height={height} fill="white" />
                <path d={d} fill="black" />
            </mask>,
        );
        drawn = [
            <g key={maskId} mask={`url(#${maskId})`}>
                {drawn}
            </g>,
        ];
    });

    return (
        <svg viewBox={icon.viewBox} aria-hidden="true">
            {masks.length > 0 && <defs>{masks}</defs>}
            {drawn}
        </svg>
    );
}
