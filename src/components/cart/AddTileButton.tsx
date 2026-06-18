'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TILE_CATALOG, TILE_IDS } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems } from '@/store/selectors/cartSelectors';
import { addItem } from '@/store/slices/cartSlice';
import type { TileId } from '@/types';
import { SketchButton } from '@/components/ui/SketchButton';

export function AddTileButton() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [open, setOpen] = useState(false);

  const availableTiles = TILE_IDS.filter(
    (id) => !cartItems.some((item) => item.tileId === id)
  );

  const handleAdd = (tileId: TileId) => {
    dispatch(addItem(tileId));
    setOpen(false);
  };

  return (
    <div className="relative mt-4">
      <SketchButton
        size="lg"
        className="w-full"
        onClick={() => setOpen((prev) => !prev)}
        disabled={availableTiles.length === 0}
      >
        <span aria-hidden>+</span> ADD NEW TILE TO CART
      </SketchButton>

      {open && availableTiles.length > 0 && (
        <div className="sketch-border absolute left-0 right-0 top-full z-20 mt-2 bg-cream p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider">
            Select a tile
          </p>
          <div className="grid grid-cols-2 gap-2">
            {availableTiles.map((tileId) => {
              const tile = TILE_CATALOG[tileId];
              return (
                <button
                  key={tileId}
                  type="button"
                  onClick={() => handleAdd(tileId)}
                  className="sketch-border flex items-center gap-2 bg-paper p-2 text-left hover:bg-cream"
                >
                  <Image
                    src={tile.thumbnail}
                    alt={tile.name}
                    width={28}
                    height={28}
                  />
                  <span className="text-xs font-bold">{tile.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
