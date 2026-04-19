const STORAGE_KEY = 'ay_expect_post_login_sync';

/** Call immediately before `loginWithRedirect` so we sync once after Auth0 returns. */
export function markExpectPostLoginSync(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

/** Returns true the first time after a login redirect; clears the flag. */
export function consumeExpectPostLoginSync(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY) !== '1') return false;
    sessionStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
