'use client';

import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { layout } from '@/lib/design/layout';
import { auth0PublicConfig } from '@/lib/auth0-public';

export function SettingsScreen() {
  const { user, logout } = useAuth0();

  return (
    <main className={layout.page}>
      <header className={layout.headerRow}>
        <div>
          <p className="text-meta">You</p>
          <h1 className="mt-1 text-title">Settings</h1>
        </div>
        <Link
          href="/"
          className="text-meta shrink-0 rounded-full px-3 py-2 text-[0.7rem] text-muted-foreground transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
        >
          Close
        </Link>
      </header>

      <section className="mt-10 space-y-6">
        <div className="rounded-2xl bg-surface-elevated p-5 shadow-soft ring-1 ring-black/[0.03] dark:ring-white/[0.05] sm:p-6">
          <p className="text-meta">Appearance</p>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-body text-muted-foreground">Light and dark are tuned, not inverted.</p>
            <ThemeToggle />
          </div>
        </div>

        <div className="rounded-2xl bg-surface-elevated p-5 shadow-soft ring-1 ring-black/[0.03] dark:ring-white/[0.05] sm:p-6">
          <p className="text-meta">Session</p>
          <p className="mt-3 text-body text-muted-foreground">
            Signed in as{' '}
            <span className="font-medium text-foreground">{user?.email ?? user?.name}</span>
          </p>
          <button
            type="button"
            onClick={() =>
              void logout({
                logoutParams: {
                  returnTo: auth0PublicConfig.appBaseUrl.replace(/\/$/, '') || window.location.origin,
                },
              })
            }
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl border border-input/80 bg-transparent px-6 text-sm font-medium text-foreground transition-[transform,background-color] duration-200 hover:bg-muted/60 hover:scale-[1.01] active:scale-[0.97]"
          >
            Log out
          </button>
        </div>

        <Link
          href="/"
          className="inline-flex text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
        >
          Return to life
        </Link>
      </section>
    </main>
  );
}
