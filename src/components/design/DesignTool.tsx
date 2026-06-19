'use client';

import { selectPaletteTile } from '@/app/store/features/designGrid';
import { useAppDispatch } from '@/app/store/hooks';
import { DesignGrid } from '@/components/design/DesignGrid';
import { DesignPalette } from '@/components/design/DesignPalette';
import { cn } from '@/lib/cn';
import type { TileId } from '@/types';

export function DesignTool() {
  const dispatch = useAppDispatch();

  const handleDragStart = (tileId: TileId) => {
    dispatch(selectPaletteTile(tileId));
  };

  return (
    <section
      className={cn('hidden min-w-[430px] lg:flex lg:w-full lg:flex-col', 'xl:w-auto xl:shrink-0')}
    >
      <div className="devider h-12"></div>
      {/* Design Grid and Design Palette */}
      <div className="sketch-border bg-paper flex min-h-[420px] min-w-[430px]">
        <DesignGrid />
        <DesignPalette onDragStart={handleDragStart} />
      </div>
    </section>
  );
}
