'use client';

import { incrementQuantity, removeItem, updateQuantity } from '@/app/store/features/cart';
import { useAppDispatch } from '@/app/store/hooks';
import { ActionButton } from '@/components/cart/ActionButton';
import { QuantityInput } from '@/components/cart/QuantityInput';
import { getCellClassName, getColumnClassName } from '@/components/cart/orderTableConfig';
import { BracketedValue } from '@/components/ui/BracketedValue';
import { TILE_CATALOG } from '@/data/tiles';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/pricing';
import type { CartItem } from '@/types';

import Image from 'next/image';

import { motion } from 'framer-motion';

const CELL_BORDER_CLASS = 'border border-ink';

export interface OrderTableRowProps {
  item: CartItem;
}

export function OrderTableRow({ item }: OrderTableRowProps) {
  const dispatch = useAppDispatch();
  const product = TILE_CATALOG[item.tileId];

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="align-middle"
    >
      <td className={cn(getCellClassName(), CELL_BORDER_CLASS)}>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={32}
            height={32}
            className="sketch-border shrink-0"
          />
          <span className="text-xs font-normal tracking-wide">{product.name}</span>
        </div>
      </td>
      <td className={cn(getCellClassName(), CELL_BORDER_CLASS)}>
        <Image
          src={product.pattern}
          alt={`${product.name} pattern`}
          width={56}
          height={56}
          className="sketch-border mx-auto"
        />
      </td>
      <td className={cn(getCellClassName(), getColumnClassName('quantity'), CELL_BORDER_CLASS)}>
        <QuantityInput
          value={item.quantity}
          onChange={(qty) => dispatch(updateQuantity({ tileId: item.tileId, quantity: qty }))}
        />
      </td>
      <td className={cn(getCellClassName(), CELL_BORDER_CLASS, 'text-sm')}>
        <BracketedValue>{formatCurrency(product.unitPrice)}</BracketedValue>
      </td>
      <td className={cn(getCellClassName(), CELL_BORDER_CLASS)}>
        <div className="flex items-center justify-center gap-2">
          <ActionButton
            ariaLabel={`Add more ${product.name}`}
            iconSrc="/add-button.png"
            label="ADD"
            onClick={() => dispatch(incrementQuantity(item.tileId))}
            title="Add new tile to cart"
          />
          <ActionButton
            ariaLabel={`Remove ${product.name}`}
            iconSrc="/shopping-basket.png"
            label="REMOVE"
            onClick={() => dispatch(removeItem(item.tileId))}
            title="Remove from cart"
          />
        </div>
      </td>
    </motion.tr>
  );
}
