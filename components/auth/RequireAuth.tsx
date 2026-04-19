'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, type ReactNode } from 'react';

import { auth0PublicConfig, isAuth0Configured } from '@/lib/auth0-public';

type RequireAuthProps = {
  children: ReactNode;
};

function RequireAuthInner({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isLoading || isAuthenticated) return;
    void loginWithRedirect({
      authorizationParams: {
        redirect_uri: auth0PublicConfig.appBaseUrl.replace(/\/$/, ''),
      },
    });
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted-foreground/30" aria-hidden />
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Sends unauthenticated users through Auth0 login, then returns them here.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  if (!isAuth0Configured()) {
    return (
      <main className="mx-auto max-w-md px-6 py-20 text-body text-muted-foreground">
        Set <code className="text-foreground">NEXT_PUBLIC_AUTH0_DOMAIN</code>,{' '}
        <code className="text-foreground">NEXT_PUBLIC_AUTH0_CLIENT_ID</code>, and{' '}
        <code className="text-foreground">NEXT_PUBLIC_APP_BASE_URL</code> in{' '}
        <code className="text-foreground">.env.local</code>.
      </main>
    );
  }

  return <RequireAuthInner>{children}</RequireAuthInner>;
}
