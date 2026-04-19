'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

import { LifeFeed } from '@/components/feed/LifeFeed';
import { StatRow } from '@/components/dashboard/StatRow';
import { Button } from '@/components/ui/button';
import { useEntries } from '@/hooks/use-entries';
import { layout } from '@/lib/design/layout';
import { isBackendConfigured } from '@/lib/api/backend-config';

type DashboardScreenProps = {
  greetingName?: string | null;
};

export function DashboardScreen({ greetingName }: DashboardScreenProps) {
  const { data: entries, isLoading, isError, refetch } = useEntries();

  const firstName = greetingName?.split(' ')[0] ?? 'there';

  return (
    <main className={layout.page}>
      <header className={layout.headerRow}>
        <div className="min-w-0 space-y-1">
          <h1 className="text-title">Life</h1>
          <p className="text-body text-muted-foreground">
            <span className="text-foreground/90">Hello, {firstName}</span>
            <span className="text-muted-foreground"> · </span>
            <span>soft light on what mattered</span>
          </p>
        </div>
        <Link
          href="/settings"
          className="text-meta shrink-0 rounded-full px-3 py-2 text-[0.7rem] text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
        >
          Settings
        </Link>
      </header>

      <section className="mt-8 space-y-8">
        <StatRow entries={entries} />
        {!isBackendConfigured() ? (
          <p className="text-meta text-muted-foreground">
            Mock feed — add <code className="text-foreground/90">NEXT_PUBLIC_BACKEND_URL</code> and restart{' '}
            <code className="text-foreground/90">npm run dev</code> to load from your API.
          </p>
        ) : null}
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-meta">Feed</h2>
          </div>
          <LifeFeed
            entries={entries}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => void refetch()}
          />
        </div>
      </section>

      <Link href="/add" className="fixed bottom-6 right-5 z-50 sm:bottom-8 sm:right-8" aria-label="Log a moment">
        <Button type="button" variant="fab" className="ds-lift shadow-elevated">
          <Plus className="h-6 w-6" strokeWidth={1.5} />
        </Button>
      </Link>
    </main>
  );
}
