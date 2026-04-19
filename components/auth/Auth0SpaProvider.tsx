'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import type { ReactNode } from 'react';

import { PostLoginBackendSync } from '@/components/auth/PostLoginBackendSync';
import { auth0PublicConfig, isAuth0Configured } from '@/lib/auth0-public';

/**
 * Auth0 SPA SDK — login/session live in the browser; access tokens go to your API.
 */
export function Auth0SpaProvider({ children }: { children: ReactNode }) {
  if (!isAuth0Configured()) {
    return <>{children}</>;
  }

  const { domain, clientId, audience, appBaseUrl } = auth0PublicConfig;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: appBaseUrl.replace(/\/$/, '') || undefined,
        ...(audience ? { audience } : {}),
      }}
      cacheLocation="localstorage"
    >
      <PostLoginBackendSync />
      {children}
    </Auth0Provider>
  );
}
