import type { GetTokenSilentlyOptions } from '@auth0/auth0-react';

import { getAccessTokenForBackend } from '@/lib/api/auth-token';
import { USER_PROFILE_SYNC_PATH, browserBackendProxyUrl, getBackendBaseUrl } from '@/lib/api/backend-config';

type GetToken = (options?: GetTokenSilentlyOptions) => Promise<string>;

/**
 * POST /api/v1/users/me/sync — tell the backend to persist the Auth0 user profile.
 * Uses an API access token when `NEXT_PUBLIC_AUTH0_AUDIENCE` is set.
 */
export async function syncUserProfile(getAccessTokenSilently: GetToken): Promise<void> {
  if (!getBackendBaseUrl()) {
    return;
  }

  const token = await getAccessTokenForBackend(getAccessTokenSilently);
  const res = await fetch(browserBackendProxyUrl(USER_PROFILE_SYNC_PATH), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Profile sync failed (${res.status}): ${body || res.statusText}`);
  }
}
