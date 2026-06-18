'use client';

import Image from 'next/image';
import { TILE_CATALOG } from '@/data/tiles';
import { formatCurrency } from '@/lib/pricing';
import { useAppDispatch } from '@/store/hooks';
import {
  incrementQuantity,
  removeItem,
  updateQuantity,
} from '@/store/slices/cartSlice';
import type { CartItem } from '@/types';
import { SketchButton } from '@/components/ui/SketchButton';
import { QuantityInput } from '@/components/cart/QuantityInput';

interface OrderTableRowProps {
  item: CartItem;
}

export function OrderTableRow({ item }: OrderTableRowProps) {
  const dispatch = useAppDispatch();
  const product = TILE_CATALOG[item.tileId];

  return (
    <tr className="border-b border-ink/20 align-middle">
      <td className="py-3 pr-2">
        <div className="flex items-center gap-2">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={32}
            height={32}
            className="sketch-border shrink-0"
          />
          <span className="text-xs font-bold tracking-wide">{product.name}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <Image
          src={product.pattern}
          alt={`${product.name} pattern`}
          width={56}
          height={56}
          className="sketch-border mx-auto"
        />
      </td>
      <td className="py-3 px-2">
        <QuantityInput
          value={item.quantity}
          onChange={(qty) =>
            dispatch(updateQuantity({ tileId: item.tileId, quantity: qty }))
          }
        />
      </td>
      <td className="py-3 px-2 text-center text-sm font-sketch">
        <span className="text-ink/50">[</span>
        {formatCurrency(product.unitPrice)}
        <span className="text-ink/50">]</span>
      </td>
      <td className="py-3 pl-2">
        <div className="flex flex-col gap-1">
          <SketchButton
            size="sm"
            onClick={() => dispatch(incrementQuantity(item.tileId))}
            aria-label={`Add more ${product.name}`}
          >
            <span aria-hidden>+</span> ADD
          </SketchButton>
          <SketchButton
            size="sm"
            variant="ghost"
            onClick={() => dispatch(removeItem(item.tileId))}
            aria-label={`Remove ${product.name}`}
          >
            <span aria-hidden>🗑</span> REMOVE
          </SketchButton>
        </div>
      </td>
    </tr>
  );
}
