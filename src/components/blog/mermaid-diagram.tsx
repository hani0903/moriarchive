'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { diagramConfig, renderDiagram } from '@/lib/mermaid/render';

type Result = { source: string; theme: string; svg?: string; failed?: boolean };

export function MermaidDiagram({ source }: { source: string }) {
    const { resolvedTheme } = useTheme();
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
    const host = useRef<HTMLDivElement>(null);
    const revision = useRef(0);
    const [result, setResult] = useState<Result>();
    const current = result?.source === source && result.theme === resolvedTheme ? result : undefined;

    useEffect(() => {
        if (!resolvedTheme || !host.current) return;
        let cancelled = false;
        const element = host.current;
        const renderId = `mermaid-${id}-${++revision.current}`;
        async function draw() {
            try {
                await document.fonts.ready;
                if (cancelled) return;
                const { svg } = await renderDiagram(
                    renderId,
                    source,
                    diagramConfig(element, resolvedTheme === 'dark'),
                );
                if (!cancelled) setResult({ source, theme: resolvedTheme!, svg });
            } catch {
                if (!cancelled) setResult({ source, theme: resolvedTheme!, failed: true });
            }
        }
        void draw();
        return () => {
            cancelled = true;
        };
    }, [source, resolvedTheme, id]);

    return (
        <div className="not-prose mermaid-block" ref={host}>
            {current?.svg ? (
                <div
                    className="mermaid-viewport"
                    role="region"
                    aria-label="다이어그램"
                    tabIndex={0}
                    dangerouslySetInnerHTML={{ __html: current.svg }}
                />
            ) : (
                <p className="mermaid-status" role="status">
                    {current?.failed
                        ? '다이어그램을 표시하지 못했습니다. 아래 원본을 확인해 주세요.'
                        : '다이어그램을 준비하고 있습니다.'}
                </p>
            )}
            <details className="mermaid-source" open={current?.failed || undefined}>
                <summary>다이어그램 원본 보기</summary>
                <pre>
                    <code>{source}</code>
                </pre>
            </details>
        </div>
    );
}
