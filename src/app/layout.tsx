import type { Metadata } from 'next';
import { Bebas_Neue, Source_Sans_3, Caveat } from 'next/font/google';
import { StoreProvider } from '@/providers/StoreProvider';
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
      <body className="min-h-full flex flex-col paper-texture bg-cream text-ink font-body">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
