'use client';

import { useAuth0 } from '@auth0/auth0-react';

import { DashboardScreen } from '@/components/dashboard/DashboardScreen';
import { WelcomeHero } from '@/components/marketing/WelcomeHero';
import { isAuth0Configured } from '@/lib/auth0-public';

function HomeGateAuthed() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted-foreground/30" aria-hidden />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <WelcomeHero />;
  }

  return <DashboardScreen greetingName={user?.name ?? user?.email ?? null} />;
}

export function HomeGate() {
  if (!isAuth0Configured()) {
    return <WelcomeHero />;
  }

  return <HomeGateAuthed />;
}
