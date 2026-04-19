import type { GetTokenSilentlyOptions } from '@auth0/auth0-react';

type GetToken = (options?: GetTokenSilentlyOptions) => Promise<string>;

/**
 * Prefer an access token for your API (`NEXT_PUBLIC_AUTH0_AUDIENCE`) when set.
 */
export async function getAccessTokenForBackend(getAccessTokenSilently: GetToken): Promise<string> {
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE?.trim();
  if (audience) {
    return getAccessTokenSilently({ authorizationParams: { audience } });
  }
  return getAccessTokenSilently();
}
