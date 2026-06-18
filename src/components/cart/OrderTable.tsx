'use client';

import { useAppSelector } from '@/store/hooks';
import { selectCartItems } from '@/store/selectors/cartSelectors';
import { OrderTableRow } from '@/components/cart/OrderTableRow';
import { AddTileButton } from '@/components/cart/AddTileButton';

export function OrderTable() {
  const items = useAppSelector(selectCartItems);

  return (
    <section className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink/60 text-xs font-bold tracking-wider uppercase">
              <th className="pb-2 pr-2">Tile Collection</th>
              <th className="pb-2 px-2 text-center">Item</th>
              <th className="pb-2 px-2 text-center">Quantity (sq. ft.)</th>
              <th className="pb-2 px-2 text-center">Unit Price ($)</th>
              <th className="pb-2 pl-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <OrderTableRow key={item.tileId} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <AddTileButton />
    </section>
  );
}
