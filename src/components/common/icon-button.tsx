import React from 'react';

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
    children: React.ReactNode;
    onClick: () => void;
    ariaLabel: string;
}

export function IconButton({ children, onClick, ariaLabel, className, ...props }: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            {...props}
            className={className ? `icon-button ${className}` : 'icon-button'}
        >
            {children}
        </button>
    );
}
