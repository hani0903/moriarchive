'use client';
import { CheckIcon, CopyIcon, LoaderIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

const FEEDBACK_DURATION_MS = 3000;
const CODE_BLOCK_SELECTOR = '.code-block';

type CopyStatus = 'idle' | 'copying' | 'copied' | 'error';

const VIEW: Record<CopyStatus, { Icon: typeof CopyIcon; label: string; className?: string }> = {
    idle: { Icon: CopyIcon, label: '코드 복사' },
    copying: { Icon: LoaderIcon, label: '복사 중' },
    copied: { Icon: CheckIcon, label: '복사했습니다', className: 'text-accent' },
    error: { Icon: XIcon, label: '복사하지 못했습니다. 다시 시도해 주세요.' },
};

export function CopyCodeButton() {
    const [status, setStatus] = useState<CopyStatus>('idle');
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const clickCopyButtonRef = useRef(false);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const { Icon, label, className } = VIEW[status];

    function showTemporarily(next: 'copied' | 'error') {
        setStatus(next);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setStatus('idle');
        }, FEEDBACK_DURATION_MS);
    }

    async function handleCopyClick(event: MouseEvent<HTMLButtonElement>) {
        if (status === 'copying' || status === 'copied' || clickCopyButtonRef.current) return;

        // await 전에 버튼이 속한 코드 블록의 텍스트를 읽는다.
        const code =
            event.currentTarget.closest(CODE_BLOCK_SELECTOR)?.querySelector('pre')?.textContent ?? '';

        if (!code) {
            showTemporarily('error');
            return;
        }

        clearTimeout(timerRef.current);
        clickCopyButtonRef.current = true;
        setStatus('copying');

        try {
            await navigator.clipboard.writeText(code.replace(/\n$/, ''));
            showTemporarily('copied');
        } catch {
            showTemporarily('error');
        } finally {
            clickCopyButtonRef.current = false;
        }
    }

    return (
        <button
            disabled={status === 'copying' || status === 'copied'}
            className="copy-button"
            type="button"
            onClick={handleCopyClick}
            aria-label={VIEW.idle.label}
        >
            <Icon size={16} className={className} aria-hidden />
            <span className="sr-only" role="status" aria-live="polite">
                {status === 'idle' ? '' : label}
            </span>
        </button>
    );
}
