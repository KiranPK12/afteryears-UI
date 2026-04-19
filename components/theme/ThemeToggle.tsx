'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';

import { useTheme } from '@/components/theme/ThemeContext';
import { cn } from '@/lib/utils';
import type { ThemeChoice } from '@/lib/theme/storage';

const options: { id: ThemeChoice; label: string; icon: React.ReactNode }[] = [
  { id: 'light', label: 'Light', icon: <Sun className="h-4 w-4" strokeWidth={1.5} /> },
  { id: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: 'system', label: 'System', icon: <SunMoon className="h-4 w-4" strokeWidth={1.5} /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex rounded-2xl bg-muted/50 p-1 ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
      role="group"
      aria-label="Theme"
    >
      {options.map((opt) => {
        const active = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors duration-200',
              active
                ? 'bg-surface-elevated text-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
