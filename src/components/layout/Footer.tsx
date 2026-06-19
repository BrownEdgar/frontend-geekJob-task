import { FOOTER_DECOR_ELEMENTS } from '@/constants/decor';
import {
  DESKTOP_FOOTER_LINKS,
  FOOTER_COPYRIGHT_REST,
  FOOTER_COPYRIGHT_YEAR,
  MOBILE_FOOTER_LINKS,
} from '@/constants/navigation';
import { cn } from '@/lib/cn';

import Image from 'next/image';
import Link from 'next/link';

const footerNavClass = 'text-xs font-bold tracking-widest uppercase';

function FooterLinkList({
  links,
  separatorClassName,
}: {
  links: readonly string[];
  separatorClassName?: string;
}) {
  return (
    <>
      {links.map((link, index) => (
        <span key={link} className="inline-flex items-center">
          {index > 0 && (
            <span
              className={cn('text-ink/70 px-3 font-normal select-none lg:px-4', separatorClassName)}
              aria-hidden
            >
              |
            </span>
          )}
          <Link href="#" className="hover:text-terracotta transition-colors">
            {link}
          </Link>
        </span>
      ))}
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-ink/20 relative mt-auto px-4 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2">
        <nav className={cn('flex flex-wrap justify-center', footerNavClass)}>
          <span className="lg:hidden">
            <FooterLinkList links={MOBILE_FOOTER_LINKS} separatorClassName="px-2" />
          </span>
          <span className="hidden lg:inline-flex lg:flex-wrap lg:justify-center">
            <FooterLinkList links={DESKTOP_FOOTER_LINKS} />
          </span>
        </nav>

        <p className={cn('text-ink hidden text-xs uppercase lg:block', footerNavClass)}>
          © {FOOTER_COPYRIGHT_YEAR} {FOOTER_COPYRIGHT_REST}
        </p>
      </div>

      {FOOTER_DECOR_ELEMENTS.map(({ position, src }) => (
        <div
          key={position}
          className={cn('pointer-events-none absolute bottom-2 hidden opacity-60 lg:block', {
            'left-4': position === 'left',
            'right-4': position === 'right',
          })}
        >
          <Image src={src} alt="" width={80} height={80} aria-hidden />
        </div>
      ))}
    </footer>
  );
}
