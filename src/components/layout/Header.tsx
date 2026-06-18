'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectCartItemCount } from '@/store/selectors/cartSelectors';

const mobileLinks = ['SHOP', 'COLLECTIONS', 'ABOUT US'];
const desktopLinks = [
  'HOME',
  'SHOP',
  'COLLECTIONS',
  'ABOUT US',
  'FAQ',
  'GALLERY',
  'BLOG',
];

export function Header() {
  const cartCount = useAppSelector(selectCartItemCount);

  return (
    <header className="border-b border-ink/20 px-4 py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <nav className="hidden gap-4 text-xs font-bold tracking-widest lg:flex">
          {desktopLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="hover:text-terracotta transition-colors"
            >
              {link}
            </Link>
          ))}
        </nav>

        <nav className="flex gap-4 text-xs font-bold tracking-widest lg:hidden">
          {mobileLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="hover:text-terracotta transition-colors"
            >
              {link}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="relative"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <span className="text-xl" aria-hidden>
              🛒
            </span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-cream">
                {cartCount}
              </span>
            )}
          </button>

          <span className="hidden items-center gap-2 lg:flex">
            <span className="text-xl" aria-hidden>
              👤
            </span>
            <span className="text-xs font-bold tracking-wide">A. Smith</span>
          </span>

          <button
            type="button"
            className="sketch-border px-3 py-1 text-xs font-bold tracking-wider uppercase lg:hidden"
          >
            Log In
          </button>
        </div>
      </div>
    </header>
  );
}
