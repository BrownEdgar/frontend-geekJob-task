import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart';
import designGridReducer from './features/designGrid';

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      designGrid: designGridReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
