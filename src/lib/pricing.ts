import type { CartItem } from '@/types';
import { TILE_CATALOG } from '@/data/tiles';

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 25;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = TILE_CATALOG[item.tileId];
    return sum + item.quantity * product.unitPrice;
  }, 0);
}

export function calculateShipping(subtotal: number): number {
  return subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function calculateGrandTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}
