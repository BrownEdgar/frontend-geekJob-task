'use client';

import { AddTileButton } from '@/components/cart/AddTileButton';
import OrderSummary from '@/components/cart/OrderSummary';
import { OrderTable } from '@/components/cart/OrderTable';
import { OrderTableRow } from '@/components/cart/OrderTableRow';

import Image from 'next/image';

export function OrderTableSection() {
  return (
    <>
      <OrderTable>{(item) => <OrderTableRow item={item} />}</OrderTable>
      <div className="relative mt-2 flex items-start justify-between gap-2 lg:mt-0">
        <div className="shrink-0">
          <Image
            src="/hand.png"
            alt="Select tiles"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="flex flex-1 justify-center">
          <AddTileButton />
        </div>
        <div className="shrink-0">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
