'use client';

import Image from 'next/image';
import { TILE_CATALOG } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedPaletteTile } from '@/store/selectors/cartSelectors';
import { selectPaletteTile } from '@/store/slices/designGridSlice';
import type { TileId } from '@/types';

interface DesignPaletteProps {
  onDragStart: (tileId: TileId) => void;
}

export function DesignPalette({ onDragStart }: DesignPaletteProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelectedPaletteTile);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-bold tracking-wider uppercase text-ink/70">
        Design Palette
      </h3>
      {(Object.keys(TILE_CATALOG) as TileId[]).map((tileId) => {
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
            onClick={() =>
              dispatch(selectPaletteTile(isSelected ? null : tileId))
            }
            className={`sketch-border p-1 transition-all ${
              isSelected ? 'ring-2 ring-ink scale-105' : 'hover:scale-105'
            }`}
            aria-label={`Select ${tile.name} for placement`}
            aria-pressed={isSelected}
          >
            <Image
              src={tile.pattern}
              alt={tile.name}
              width={48}
              height={48}
              className="pointer-events-none"
            />
          </button>
        );
      })}
    </div>
  );
}
