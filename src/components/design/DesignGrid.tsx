'use client';

import Image from 'next/image';
import { TILE_CATALOG } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDesignGrid,
  selectIsGridEmpty,
  selectSelectedPaletteTile,
} from '@/store/selectors/cartSelectors';
import {
  clearCell,
  placeTile,
  placeTileFromDrop,
  selectPaletteTile,
} from '@/store/slices/designGridSlice';
import type { TileId } from '@/types';

export function DesignGrid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectDesignGrid);
  const isEmpty = useAppSelector(selectIsGridEmpty);
  const selectedTile = useAppSelector(selectSelectedPaletteTile);

  const handleDrop = (row: number, col: number, e: React.DragEvent) => {
    e.preventDefault();
    const tileId = e.dataTransfer.getData('text/tile-id') as TileId;
    if (tileId && TILE_CATALOG[tileId]) {
      dispatch(placeTileFromDrop({ row, col, tileId }));
      dispatch(selectPaletteTile(tileId));
    }
  };

  return (
    <div className="relative flex-1">
      {isEmpty && (
        <p className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4 text-center font-sketch text-lg text-ink/50">
          Drag and drop tiles here to create patterns
        </p>
      )}
      <div
        className="grid grid-cols-7 grid-rows-7 gap-0.5 sketch-border bg-paper p-1"
        role="grid"
        aria-label="7 by 7 tile design grid"
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              role="gridcell"
              onClick={() => {
                if (cell) {
                  dispatch(clearCell({ row: rowIndex, col: colIndex }));
                } else {
                  dispatch(placeTile({ row: rowIndex, col: colIndex }));
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                dispatch(clearCell({ row: rowIndex, col: colIndex }));
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(rowIndex, colIndex, e)}
              className={`aspect-square sketch-border transition-colors ${
                selectedTile && !cell ? 'hover:bg-cream' : 'bg-cream'
              } ${cell ? 'p-0' : ''}`}
              aria-label={
                cell
                  ? `Placed ${TILE_CATALOG[cell].name}, click to remove`
                  : 'Empty cell, click to place selected tile'
              }
            >
              {cell && (
                <Image
                  src={TILE_CATALOG[cell].pattern}
                  alt={TILE_CATALOG[cell].name}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
