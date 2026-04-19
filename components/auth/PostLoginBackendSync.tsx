'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';

import { syncUserProfile } from '@/lib/api/sync-user-profile';
import { getBackendBaseUrl } from '@/lib/api/backend-config';

/**
 * After sign-in (or restored session with a user), POST /api/v1/users/me/sync with a backend token.
 * Runs whenever Auth0 reports a logged-in user — your `/sync` handler should be idempotent.
 */
export function PostLoginBackendSync() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
  const inFlight = useRef(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user?.sub) return;
    if (!getBackendBaseUrl()) return;
    if (inFlight.current) return;

    inFlight.current = true;

    void (async () => {
      try {
        await syncUserProfile(getAccessTokenSilently);
      } catch (err) {
        console.warn('[afteryears] User profile sync failed:', err);
      } finally {
        inFlight.current = false;
      }
    })();
  }, [isAuthenticated, isLoading, user?.sub, getAccessTokenSilently]);

  return null;
}
