import type { TileId, TileProduct } from '@/types';

export const TILE_CATALOG: Record<TileId, TileProduct> = {
  'ocean-wave': {
    id: 'ocean-wave',
    name: 'OCEAN WAVE',
    unitPrice: 28,
    thumbnail: '/tiles/ocean-wave.svg',
    pattern: '/tiles/ocean-wave.svg',
    accentColor: '#2C3E6B',
  },
  'forest-fern': {
    id: 'forest-fern',
    name: 'FOREST FERN',
    unitPrice: 30,
    thumbnail: '/tiles/forest-fern.svg',
    pattern: '/tiles/forest-fern.svg',
    accentColor: '#3D5C3A',
  },
  'terracotta-dot': {
    id: 'terracotta-dot',
    name: 'TERRACOTTA DOT',
    unitPrice: 26,
    thumbnail: '/tiles/terracotta-dot.svg',
    pattern: '/tiles/terracotta-dot.svg',
    accentColor: '#C4654A',
  },
  'yellow-star': {
    id: 'yellow-star',
    name: 'YELLOW STAR',
    unitPrice: 29,
    thumbnail: '/tiles/yellow-star.svg',
    pattern: '/tiles/yellow-star.svg',
    accentColor: '#D4A843',
  },
};

export const TILE_IDS = Object.keys(TILE_CATALOG) as TileId[];
