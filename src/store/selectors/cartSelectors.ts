import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import {
  calculateGrandTotal,
  calculateShipping,
  calculateSubtotal,
} from '@/lib/pricing';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.length
);

export const selectSubtotal = createSelector([selectCartItems], (items) =>
  calculateSubtotal(items)
);

export const selectShipping = createSelector([selectSubtotal], (subtotal) =>
  calculateShipping(subtotal)
);

export const selectGrandTotal = createSelector(
  [selectSubtotal, selectShipping],
  (subtotal, shipping) => calculateGrandTotal(subtotal, shipping)
);

export const selectDesignGrid = (state: RootState) => state.designGrid.grid;

export const selectSelectedPaletteTile = (state: RootState) =>
  state.designGrid.selectedPaletteTile;

export const selectIsGridEmpty = createSelector(
  [selectDesignGrid],
  (grid) => grid.every((row) => row.every((cell) => cell === null))
);
