import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import Providers from '@/components/providers';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Afteryears',
  description: 'A quiet life dashboard for meaningful moments.',
};

const themeInitScript = `
(function(){
  try {
    var k='afteryears-theme';
    var t=localStorage.getItem(k);
    if (t==='dark') document.documentElement.classList.add('dark');
    else if (t==='light') document.documentElement.classList.remove('dark');
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Script id="afteryears-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
