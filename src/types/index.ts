export type TileId =
  | 'ocean-wave'
  | 'forest-fern'
  | 'terracotta-dot'
  | 'yellow-star';

export interface TileProduct {
  id: TileId;
  name: string;
  unitPrice: number;
  thumbnail: string;
  pattern: string;
  accentColor: string;
}

export interface CartItem {
  tileId: TileId;
  quantity: number;
}

export type PaymentMethod =
  | 'credit-card'
  | 'paypal'
  | 'apple-pay'
  | 'bank-transfer';

export type GridCell = TileId | null;

export const GRID_SIZE = 7;
