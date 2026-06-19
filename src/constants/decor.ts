export type DecorPosition = 'left' | 'right';

export interface FooterDecorElement {
  position: DecorPosition;
  src: string;
}

export const PAGE_TITLE_DECOR_TILES = ['/decor/castle.svg', '/decor/fire.svg'] as const;

export const KILN_BANNER_TILES = {
  left: ['/tiles/marble-swirl.png', '/tiles/geometric-grid.png', '/tiles/desert-sand.png'],
  right: ['/tiles/floral-damask.png', '/tiles/midnight-cross.png', '/tiles/sunset-radiant.png'],
} as const;

export const FOOTER_DECOR_ELEMENTS: FooterDecorElement[] = [
  { position: 'left', src: '/decor/leaves-left.svg' },
  { position: 'right', src: '/decor/leaves-right.svg' },
];
