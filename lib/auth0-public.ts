/**
 * Browser-visible Auth0 + app URLs (NEXT_PUBLIC_*).
 * Set these in `.env.local` for the SPA SDK.
 */
export const auth0PublicConfig = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE ?? '',
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL ?? '',
};

export function isAuth0Configured(): boolean {
  return Boolean(
    auth0PublicConfig.domain && auth0PublicConfig.clientId && auth0PublicConfig.appBaseUrl,
  );
}
