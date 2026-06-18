import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { GridCell, TileId } from '@/types';
import { GRID_SIZE } from '@/types';

function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );
}

interface DesignGridState {
  grid: GridCell[][];
  selectedPaletteTile: TileId | null;
}

const initialState: DesignGridState = {
  grid: createEmptyGrid(),
  selectedPaletteTile: null,
};

const designGridSlice = createSlice({
  name: 'designGrid',
  initialState,
  reducers: {
    selectPaletteTile: (state, action: PayloadAction<TileId | null>) => {
      state.selectedPaletteTile = action.payload;
    },
    placeTile: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      if (!state.selectedPaletteTile) return;
      const { row, col } = action.payload;
      const rowCells = state.grid[row];
      if (!rowCells) return;
      rowCells[col] = state.selectedPaletteTile;
    },
    placeTileFromDrop: (
      state,
      action: PayloadAction<{ row: number; col: number; tileId: TileId }>
    ) => {
      const { row, col, tileId } = action.payload;
      const rowCells = state.grid[row];
      if (!rowCells) return;
      rowCells[col] = tileId;
    },
    clearCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;
      const rowCells = state.grid[row];
      if (!rowCells) return;
      rowCells[col] = null;
    },
    clearGrid: (state) => {
      state.grid = createEmptyGrid();
      state.selectedPaletteTile = null;
    },
  },
});

export const {
  selectPaletteTile,
  placeTile,
  placeTileFromDrop,
  clearCell,
  clearGrid,
} = designGridSlice.actions;
export default designGridSlice.reducer;
