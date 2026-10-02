'use client';
import { ThemeProvider, useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon as MoonIcon, Sun as SunIcon } from 'lucide-react';
import { IconButton } from '@/components/common/icon-button';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ThemeRoot({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    );
}

/**
 * 사용자가 클릭해서 테마를 바꾸는 버튼
 */
export function ThemeToggle() {
    const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

    const { resolvedTheme, setTheme } = useTheme(); // 실제 적용된 테마와 테마를 변경하는 함수를 받아온다.
    const dark = mounted && resolvedTheme === 'dark';

    const Icon = dark ? MoonIcon : SunIcon;

    return (
        <IconButton
            className="theme-toggle"
            ariaLabel={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(dark ? 'light' : 'dark')}
        >
            <Icon size={20} />
        </IconButton>
    );
}
