'use client';

import { useAppDispatch } from '@/store/hooks';
import { selectPaletteTile } from '@/store/slices/designGridSlice';
import type { TileId } from '@/types';
import { DesignGrid } from '@/components/design/DesignGrid';
import { DesignPalette } from '@/components/design/DesignPalette';

export function DesignTool() {
  const dispatch = useAppDispatch();

  const handleDragStart = (tileId: TileId) => {
    dispatch(selectPaletteTile(tileId));
  };

  return (
    <section className="hidden lg:flex lg:flex-col">
      <h2 className="mb-4 text-center font-display text-2xl tracking-widest">
        VISUALIZE YOUR ORDER
      </h2>
      <div className="flex gap-3">
        <DesignGrid />
        <DesignPalette onDragStart={handleDragStart} />
      </div>
    </section>
  );
}
