'use client';

import { selectCartItems } from '@/app/store/features/cart';
import { useAppSelector } from '@/app/store/hooks';
import { ORDER_TABLE_COLUMNS, getCellClassName } from '@/components/cart/orderTableConfig';
import type { CartItem } from '@/types';

import { Fragment, type ReactNode } from 'react';

import { AnimatePresence } from 'framer-motion';

export interface OrderTableProps {
  children: (item: CartItem) => ReactNode;
}

export function OrderTable({ children }: OrderTableProps) {
  const items = useAppSelector(selectCartItems);

  return (
    <section className="w-full">
      {items.length > 0 && (
        <div className="overflow-x-auto">
          {/* SHOPPING CART & DESIGN TOOL Table */}
          <table className="border-ink w-full min-w-[480px] border-collapse border-2 text-left">
            <caption className="font-display mb-2 caption-top text-left text-lg tracking-[0.12em] uppercase lg:text-4xl">
              SHOPPING CART & DESIGN TOOL
            </caption>
            <thead>
              <tr className="bg-paper text-xs font-bold tracking-wider uppercase">
                {ORDER_TABLE_COLUMNS.map((column) => (
                  <th
                    key={column.id}
                    className={`${getCellClassName()} ${column.className ?? ''} border-ink border`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {items.map((item) => (
                  <Fragment key={item.tileId}>{children(item)}</Fragment>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
