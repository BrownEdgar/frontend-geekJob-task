import { KILN_BANNER_TILES, PAGE_TITLE_DECOR_TILES } from '@/constants/decor';

import Image from 'next/image';

export function PageTitle() {
  return (
    <section className="px-4 py-8 text-center lg:py-10">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 lg:gap-6">
        <div className="hidden shrink-0 sm:flex">
          <Image
            src={PAGE_TITLE_DECOR_TILES[0]}
            alt=""
            width={52}
            height={72}
            className="h-[72px] w-[52px] object-contain"
            aria-hidden
          />
        </div>

        <div>
          <h1 className="font-display text-3xl leading-[1.2] tracking-widest sm:text-4xl lg:text-5xl">
            CERAMIC TILE ORDER FORM
          </h1>
          <div className="mt-2 flex items-center gap-2">
            {KILN_BANNER_TILES.left.map((src) => (
              <Image
                key={`kiln-left-${src}`}
                src={src}
                alt=""
                width={36}
                height={36}
                className="sketch-border shrink-0"
                aria-hidden
              />
            ))}
            <p className="flex-1 text-center text-lg font-semibold lg:text-xl">THE ARTISAN KILN</p>
            {KILN_BANNER_TILES.right.map((src) => (
              <Image
                key={`kiln-right-${src}`}
                src={src}
                alt=""
                width={36}
                height={36}
                className="sketch-border shrink-0"
                aria-hidden
              />
            ))}
          </div>
        </div>

        <div className="hidden shrink-0 sm:flex">
          <Image
            src={PAGE_TITLE_DECOR_TILES[1]}
            alt=""
            width={52}
            height={72}
            className="h-[72px] w-[52px] object-contain"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
