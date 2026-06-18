import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, TileId } from '@/types';
import { initialCartItems } from '@/store/initialState';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: initialCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantity: (
      state,
      action: PayloadAction<{ tileId: TileId; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.tileId === action.payload.tileId);
      if (!item) return;

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.tileId !== action.payload.tileId
        );
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
});

export const { updateQuantity, incrementQuantity, removeItem, addItem } =
  cartSlice.actions;
export default cartSlice.reducer;
