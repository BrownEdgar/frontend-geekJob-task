'use client';

import { selectCartItemCount } from '@/app/store/features/cart';
import { useAppSelector } from '@/app/store/hooks';
import {
  DESKTOP_HEADER_LINKS,
  HEADER_USER_NAME,
  MOBILE_HEADER_LINKS,
} from '@/constants/navigation';

import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const cartCount = useAppSelector(selectCartItemCount);

  return (
    <header className="border-ink/20 bg-paper relative border-b px-4 py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8">
        <nav className="hidden gap-8 text-xs font-bold tracking-widest lg:flex">
          {DESKTOP_HEADER_LINKS.map((link) => (
            <Link key={link} href="#" className="hover:text-terracotta transition-colors">
              {link}
            </Link>
          ))}
        </nav>

        <nav className="flex gap-4 text-xs font-bold tracking-widest lg:hidden">
          {MOBILE_HEADER_LINKS.map((link) => (
            <Link key={link} href="#" className="hover:text-terracotta transition-colors">
              {link}
            </Link>
          ))}
        </nav>

        <div className="absolute right-4 flex items-center gap-4 lg:right-8">
          <button
            type="button"
            className="relative"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <span className="text-xl" aria-hidden>
              <Image src="/shopping-cart.png" alt="user Icon" width={28} height={28} unoptimized />
            </span>
            {cartCount > 0 && (
              <span className="bg-terracotta text-cream absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <span className="hidden items-center gap-2 lg:flex">
            <span
              className="sketch-border bg-navy flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full! p-1"
              aria-hidden
            >
              <Image src="/user.svg" alt="user Icon" width={28} height={28} unoptimized />
            </span>
            <span className="sketch-border bg-navy text-cream hover:bg-navy/90 cursor-pointer rounded-md px-2 py-1 text-xs font-bold tracking-wide">
              {HEADER_USER_NAME}
            </span>
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
