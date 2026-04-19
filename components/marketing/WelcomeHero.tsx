'use client';

import { useAuth0 } from '@auth0/auth0-react';

import { isAuth0Configured } from '@/lib/auth0-public';

function WelcomeHeroAuthed() {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-6 py-20 sm:px-8">
      <p className="text-meta">Afteryears</p>
      <h1 className="mt-5 text-title sm:text-[2rem]">A calm place for the life you actually live</h1>
      <p className="mt-5 text-body text-muted-foreground">
        Log trips, wins, and quiet memories in seconds. Open this when you want perspective — not
        noise.
      </p>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() =>
            void loginWithRedirect({
              authorizationParams: {
                redirect_uri: process.env.NEXT_PUBLIC_APP_BASE_URL?.replace(/\/$/, ''),
              },
            })
          }
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow] duration-200 hover:scale-[1.01] hover:shadow-elevated active:scale-[0.97]"
        >
          Continue
        </button>
        {/* <p className="text-meta text-center normal-case tracking-normal text-muted-foreground sm:text-left">
          Secured with Auth0
        </p> */}
      </div>
    </main>
  );
}

export function WelcomeHero() {
  if (!isAuth0Configured()) {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-6 py-20 sm:px-8">
        <p className="text-meta">Afteryears</p>
        <h1 className="mt-5 text-title sm:text-[2rem]">A calm place for the life you actually live</h1>
        <p className="mt-5 text-body text-muted-foreground">
          Add <code className="text-foreground">NEXT_PUBLIC_AUTH0_DOMAIN</code>,{' '}
          <code className="text-foreground">NEXT_PUBLIC_AUTH0_CLIENT_ID</code>, and{' '}
          <code className="text-foreground">NEXT_PUBLIC_APP_BASE_URL</code> to <code className="text-foreground">.env.local</code> (see{' '}
          <code className="text-foreground">env.example</code>).
        </p>
      </main>
    );
  }

  return <WelcomeHeroAuthed />;
}
