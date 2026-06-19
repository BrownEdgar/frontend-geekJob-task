'use client';

import {
  clearCell,
  placeTile,
  placeTileFromDrop,
  selectDesignGrid,
  selectPaletteTile,
  selectSelectedPaletteTile,
} from '@/app/store/features/designGrid';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { TILE_CATALOG } from '@/data/tiles';
import type { TileId } from '@/types';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

export function DesignGrid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(selectDesignGrid);
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
    <div className="relative min-h-[380px] min-w-[300px] flex-1 shrink-0">
      <div className="mb-4 py-2 text-center">
        <h2 className="font-display text-xl lg:text-2xl">VISUALIZE YOUR ORDER:</h2>
        <p className="text-sm font-semibold tracking-wider">
          Drag and drop tiles here to create patterns.
        </p>
      </div>
      <div
        className="grid min-h-[280px] max-w-[500px] min-w-[280px] grid-cols-7 grid-rows-7"
        role="grid"
        aria-label="7 by 7 tile design grid"
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.button
              key={`${rowIndex}-${colIndex}`}
              type="button"
              role="gridcell"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              className={`aspect-square min-h-[40px] min-w-[40px] border transition-colors ${
                selectedTile && !cell ? 'hover:bg-cream' : 'bg-cream'
              } ${cell ? 'p-0' : ''}`}
              aria-label={
                cell
                  ? `Placed ${TILE_CATALOG[cell].name}, click to remove`
                  : 'Empty cell, click to place selected tile'
              }
            >
              <AnimatePresence>
                {cell && (
                  <motion.div
                    key={cell}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="h-full w-full"
                  >
                    <Image
                      src={TILE_CATALOG[cell].pattern}
                      alt={TILE_CATALOG[cell].name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}
