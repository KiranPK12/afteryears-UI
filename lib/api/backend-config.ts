/** Backend API host (no trailing slash), e.g. http://localhost:8080 — used by the server proxy + config checks. */
export function getBackendBaseUrl(): string | undefined {
  const raw = (process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/$/, '');
}

export function isBackendConfigured(): boolean {
  return Boolean(getBackendBaseUrl());
}

export const USER_PROFILE_SYNC_PATH = '/api/v1/users/me/sync';

/** Path on the backend for the entries collection (no leading slash). */
export function getEntriesResourcePath(): string {
  const raw = process.env.NEXT_PUBLIC_ENTRIES_PATH?.trim().replace(/^\//, '');
  return raw || 'api/v1/entries';
}

/**
 * Same-origin URL proxied by `app/api/backend/[...path]/route.ts` → real backend.
 * Avoids browser CORS (page is :3000, API is :8080).
 */
export function browserBackendProxyUrl(pathFromBackendRoot: string): string {
  const p = pathFromBackendRoot.replace(/^\//, '');
  return `/api/backend/${p}`;
}
