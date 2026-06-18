import Link from 'next/link';
import Image from 'next/image';

const mobileFooterLinks = ['TERMS', 'CONTACT'];
const desktopFooterLinks = [
  'Terms of Service',
  'Privacy Policy',
  'Shipping Info',
  'Contact Us',
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-ink/20 px-4 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase lg:gap-8">
          <div className="flex gap-4 lg:hidden">
            {mobileFooterLinks.map((link) => (
              <Link key={link} href="#" className="hover:text-terracotta">
                {link}
              </Link>
            ))}
          </div>
          <div className="hidden gap-8 lg:flex">
            {desktopFooterLinks.map((link) => (
              <Link key={link} href="#" className="hover:text-terracotta">
                {link}
              </Link>
            ))}
          </div>
        </nav>

        <p className="hidden text-xs tracking-wider text-ink/60 lg:block">
          © 2026 THE ARTISAN KILN. ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-2 left-4 hidden opacity-60 lg:block">
        <Image
          src="/decor/leaves-left.svg"
          alt=""
          width={80}
          height={80}
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute bottom-2 right-4 hidden opacity-60 lg:block">
        <Image
          src="/decor/leaves-right.svg"
          alt=""
          width={80}
          height={80}
          aria-hidden
        />
      </div>
    </footer>
  );
}
