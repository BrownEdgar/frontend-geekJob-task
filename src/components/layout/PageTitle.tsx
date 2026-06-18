import Image from 'next/image';

const decorTiles = [
  '/tiles/ocean-wave.svg',
  '/tiles/forest-fern.svg',
  '/tiles/terracotta-dot.svg',
  '/tiles/yellow-star.svg',
];

export function PageTitle() {
  return (
    <section className="px-4 py-8 text-center lg:py-10">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 lg:gap-6">
        <div className="hidden gap-2 sm:flex">
          {decorTiles.slice(0, 2).map((src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={36}
              height={36}
              className="sketch-border"
              aria-hidden
            />
          ))}
        </div>

        <div>
          <h1 className="font-display text-3xl tracking-[0.15em] sm:text-4xl lg:text-5xl">
            CERAMIC TILE ORDER FORM
          </h1>
          <p className="mt-1 font-sketch text-xl tracking-widest text-ink/70 lg:text-2xl">
            THE ARTISAN KILN
          </p>
        </div>

        <div className="hidden gap-2 sm:flex">
          {decorTiles.slice(2).map((src) => (
            <Image
              key={src}
              src={src}
              alt=""
              width={36}
              height={36}
              className="sketch-border"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
