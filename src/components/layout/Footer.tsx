import { FOOTER_DECOR_ELEMENTS } from '@/constants/decor';
import {
  DESKTOP_FOOTER_LINKS,
  FOOTER_COPYRIGHT,
  MOBILE_FOOTER_LINKS,
} from '@/constants/navigation';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-ink/20 relative mt-auto px-4 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase lg:gap-8">
          <div className="flex gap-4 lg:hidden">
            {MOBILE_FOOTER_LINKS.map((link) => (
              <Link key={link} href="#" className="hover:text-terracotta">
                {link}
              </Link>
            ))}
          </div>
          <div className="hidden gap-8 lg:flex">
            {DESKTOP_FOOTER_LINKS.map((link) => (
              <Link key={link} href="#" className="hover:text-terracotta">
                {link}
              </Link>
            ))}
          </div>
        </nav>

        <p className="text-ink/60 hidden text-xs tracking-wider lg:block">{FOOTER_COPYRIGHT}</p>
      </div>

      {FOOTER_DECOR_ELEMENTS.map(({ position, src }) => (
        <div
          key={position}
          className={`pointer-events-none absolute bottom-2 hidden opacity-60 lg:block ${
            position === 'left' ? 'left-4' : 'right-4'
          }`}
        >
          <Image src={src} alt="" width={80} height={80} aria-hidden />
        </div>
      ))}
    </footer>
  );
}
