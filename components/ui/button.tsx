import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'icon' | 'fab';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-[transform,box-shadow,background-color,color,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45',
          'hover:scale-[1.01] active:scale-[0.97]',
          {
            'bg-primary text-primary-foreground shadow-soft hover:shadow-elevated': variant === 'default',
            'border border-input/80 bg-surface-elevated text-foreground hover:bg-muted/80':
              variant === 'outline',
            'text-foreground hover:bg-muted/70': variant === 'ghost',
            'h-10 w-10 rounded-full p-0 text-foreground hover:bg-muted/70': variant === 'icon',
            'h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elevated ring-1 ring-black/5 dark:ring-white/10':
              variant === 'fab',
          },
          {
            'h-10 px-5 py-2': size === 'default' && variant !== 'fab' && variant !== 'icon',
            'h-9 px-4 text-xs': size === 'sm',
            'h-12 px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon' && variant !== 'fab',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
