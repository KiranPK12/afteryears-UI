'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { Auth0SpaProvider } from '@/components/auth/Auth0SpaProvider';
import { ThemeProvider } from '@/components/theme/ThemeContext';
import { getQueryClient } from '@/lib/query-client';

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <Auth0SpaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </Auth0SpaProvider>
  );
}
