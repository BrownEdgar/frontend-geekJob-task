import { calculateGrandTotal, calculateShipping, calculateSubtotal } from '@/lib/pricing';
import type { CartItem, TileId } from '@/types';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { initialCartItems } from '../initialState';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: initialCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: (state, action: PayloadAction<{ tileId: TileId; quantity: number }>) => {
      const item = state.items.find((i) => i.tileId === action.payload.tileId);
      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((i) => i.tileId !== action.payload.tileId);
        return;
      }

      item.quantity = action.payload.quantity;
    },
    incrementQuantity: (state, action: PayloadAction<TileId>) => {
      const item = state.items.find((i) => i.tileId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    removeItem: (state, action: PayloadAction<TileId>) => {
      state.items = state.items.filter((i) => i.tileId !== action.payload);
    },
    addItem: (state, action: PayloadAction<TileId>) => {
      const exists = state.items.some((i) => i.tileId === action.payload);
      if (exists) return;
      state.items.push({ tileId: action.payload, quantity: 1 });
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartItemCount: (state) => state.items.length,
    selectSubtotal: (state) => calculateSubtotal(state.items),
    selectShipping: (state) => calculateShipping(calculateSubtotal(state.items)),
    selectGrandTotal: (state) => {
      const subtotal = calculateSubtotal(state.items);
      const shipping = calculateShipping(subtotal);
      return calculateGrandTotal(subtotal, shipping);
    },
  },
});

export const { updateQuantity, incrementQuantity, removeItem, addItem } = cartSlice.actions;
export const {
  selectCartItems,
  selectCartItemCount,
  selectSubtotal,
  selectShipping,
  selectGrandTotal,
} = cartSlice.selectors;
export default cartSlice.reducer;
