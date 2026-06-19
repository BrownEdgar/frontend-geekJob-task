'use client';

import { addItem, selectCartItems } from '@/app/store/features/cart';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { SketchButton } from '@/components/ui/SketchButton';
import { TILE_CATALOG, TILE_IDS } from '@/data/tiles';
import type { TileId } from '@/types';

import Image from 'next/image';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

const tilePickerSpring = { type: 'spring' as const, stiffness: 400, damping: 32 };

const tilePickerVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: tilePickerSpring,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { ...tilePickerSpring, delay: 0.06 },
  },
};

export function AddTileButton() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [open, setOpen] = useState(false);

  const availableTiles = TILE_IDS.filter((id) => !cartItems.some((item) => item.tileId === id));
  const isTilePickerOpen = open && availableTiles.length > 0;

  const handleAdd = (tileId: TileId) => {
    dispatch(addItem(tileId));
    setOpen(false);
  };

  return (
    <div className="flex w-full max-w-[200px] justify-center">
      <SketchButton
        className="w-full max-w-[200px] cursor-pointer rounded-[8px]! text-[14px]! font-bold disabled:cursor-not-allowed disabled:opacity-60"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        disabled={availableTiles.length === 0}
      >
        <span aria-hidden>+</span>
        {availableTiles.length > 0 && (
          <Image
            src={TILE_CATALOG[availableTiles[0]].thumbnail}
            alt=""
            width={16}
            height={16}
            aria-hidden
          />
        )}
        ADD NEW TILE TO CART
      </SketchButton>

      <AnimatePresence initial={false}>
        {isTilePickerOpen && (
          <motion.div
            key="tile-picker"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tilePickerVariants}
            className="sketch-border bg-cream absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden p-3"
          >
            <p className="mb-2 text-xs font-semibold tracking-wider uppercase">Select a tile</p>
            <div className="grid grid-cols-2 gap-2">
              {availableTiles.map((tileId) => {
                const tile = TILE_CATALOG[tileId];
                return (
                  <button
                    key={tileId}
                    type="button"
                    onClick={() => handleAdd(tileId)}
                    className="sketch-border bg-paper hover:bg-cream flex cursor-pointer items-center gap-2 rounded-[8px]! p-2 text-left"
                  >
                    <Image src={tile.thumbnail} alt={tile.name} width={28} height={28} />
                    <span className="text-xs font-bold">{tile.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
