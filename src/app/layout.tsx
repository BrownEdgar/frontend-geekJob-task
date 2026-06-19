import { StoreProvider } from '@/providers/StoreProvider';

import type { Metadata } from 'next';
import { Bebas_Neue, Caveat, Source_Sans_3 } from 'next/font/google';

import './globals.css';

const displayFont = Bebas_Neue({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
});

const bodyFont = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
});

const sketchFont = Caveat({
  variable: '--font-sketch',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Artisan Kiln — Ceramic Tile Order Form',
  description: 'Interactive ceramic tile order form for The Artisan Kiln',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${sketchFont.variable} h-full antialiased`}
    >
      <body className="paper-texture text-ink font-body flex min-h-full flex-col">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
