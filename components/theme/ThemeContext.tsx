'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';

import { readStoredTheme, writeStoredTheme, type ThemeChoice } from '@/lib/theme/storage';

type ThemeContextValue = {
  theme: ThemeChoice;
  setTheme: (value: ThemeChoice) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyFromChoice(theme: ThemeChoice) {
  const dark = theme === 'system' ? readSystemDark() : theme === 'dark';
  document.documentElement.classList.toggle('dark', dark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>(() => readStoredTheme() ?? 'system');

  useLayoutEffect(() => {
    applyFromChoice(theme);
  }, [theme]);

  useLayoutEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyFromChoice('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = useCallback((value: ThemeChoice) => {
    setThemeState(value);
    writeStoredTheme(value);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
