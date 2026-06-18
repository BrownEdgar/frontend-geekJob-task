import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaymentMethod } from '@/types';

interface CheckoutState {
  customerName: string;
  phone: string;
  email: string;
  shippingAddress: string;
  projectNotes: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  expiration: string;
  cvv: string;
}

const initialState: CheckoutState = {
  customerName: '',
  phone: '',
  email: '',
  shippingAddress: '',
  projectNotes: '',
  paymentMethod: 'credit-card',
  cardNumber: '',
  expiration: '',
  cvv: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof CheckoutState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value as never;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const { setField, setPaymentMethod, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
