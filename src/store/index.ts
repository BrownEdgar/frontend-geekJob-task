import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cartSlice';
import designGridReducer from '@/store/slices/designGridSlice';
import checkoutReducer from '@/store/slices/checkoutSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      designGrid: designGridReducer,
      checkout: checkoutReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
