'use client';

import { selectPaletteTile } from '@/app/store/features/designGrid';
import { selectSelectedPaletteTile } from '@/app/store/features/designGrid';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { TILE_CATALOG } from '@/data/tiles';
import type { TileId } from '@/types';

import Image from 'next/image';

export interface DesignPaletteProps {
  onDragStart: (tileId: TileId) => void;
}

export function DesignPalette({ onDragStart }: DesignPaletteProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedPaletteTile);
  const tileIds = Object.keys(TILE_CATALOG) as TileId[];

  return (
    <aside className="flex w-[130px] shrink-0 flex-col border-l">
      <h3 className="border-ink/60 border-b px-2 py-2 text-center text-[12px] font-bold tracking-wider uppercase">
        Design Palette
      </h3>

      <div className="grid grid-cols-2 gap-1 p-2">
        {tileIds.map((tileId) => {
          const tile = TILE_CATALOG[tileId];
          const isSelected = selected === tileId;

          return (
            <button
              key={tileId}
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/tile-id', tileId);
                onDragStart(tileId);
              }}
              onClick={() => dispatch(selectPaletteTile(isSelected ? null : tileId))}
              className={`sketch-border aspect-square overflow-hidden rounded-md p-0 transition-all ${
                isSelected ? 'ring-ink ring-2' : 'hover:opacity-80'
              }`}
              aria-label={`Select ${tile.name} for placement`}
              aria-pressed={isSelected}
            >
              <Image
                src={tile.pattern}
                alt={tile.name}
                width={48}
                height={48}
                className="pointer-events-none h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
