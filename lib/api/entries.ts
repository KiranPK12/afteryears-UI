import type { GetTokenSilentlyOptions } from '@auth0/auth0-react';

import { getAccessTokenForBackend } from '@/lib/api/auth-token';
import { browserBackendProxyUrl, getBackendBaseUrl, getEntriesResourcePath } from '@/lib/api/backend-config';
import { MOCK_ENTRIES } from '@/lib/api/mock-entries';
import type { EventEntry } from '@/types';

type GetToken = (options?: GetTokenSilentlyOptions) => Promise<string>;

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) {
    throw new Error('Empty response');
  }
  return JSON.parse(text) as T;
}

function apiBase(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  return getBackendBaseUrl();
}

/**
 * Loads entries from your backend when `NEXT_PUBLIC_BACKEND_URL` (or `NEXT_PUBLIC_API_BASE_URL`) is set.
 * Uses the Next.js `/api/backend/...` proxy + `Authorization: Bearer` (API access token when audience is set).
 * Otherwise returns mock data.
 */
export async function fetchEntries(getAccessTokenSilently: GetToken): Promise<EventEntry[]> {
  const base = apiBase();
  if (!base) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console -- intentional dev hint
      console.info(
        '[afteryears] No NEXT_PUBLIC_BACKEND_URL / NEXT_PUBLIC_API_BASE_URL — using mock entries.',
      );
    }
    await new Promise((r) => setTimeout(r, 400));
    return [...MOCK_ENTRIES];
  }

  const token = await getAccessTokenForBackend(getAccessTokenSilently);
  const path = getEntriesResourcePath();
  const res = await fetch(browserBackendProxyUrl(path), {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw new Error('Could not load your feed');
  }

  return parseJson<EventEntry[]>(res);
}

export async function createEntry(
  getAccessTokenSilently: GetToken,
  entry: Omit<EventEntry, 'id' | 'createdAt'>,
): Promise<EventEntry> {
  const base = apiBase();
  if (!base) {
    await new Promise((r) => setTimeout(r, 400));
    return {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
  }

  const token = await getAccessTokenForBackend(getAccessTokenSilently);
  const path = getEntriesResourcePath();
  const res = await fetch(browserBackendProxyUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw new Error('Could not save this moment');
  }

  return parseJson<EventEntry>(res);
}
