import type { PaymentMethod } from '@/types';

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CheckoutState {
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
    setField: (state, action: PayloadAction<{ field: keyof CheckoutState; value: string }>) => {
      const { field, value } = action.payload;
      state[field] = value as never;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    resetCheckout: () => initialState,
  },
  selectors: {
    selectCheckout: (state) => state,
    selectPaymentMethod: (state) => state.paymentMethod,
    selectCustomerName: (state) => state.customerName,
    selectPhone: (state) => state.phone,
    selectEmail: (state) => state.email,
    selectShippingAddress: (state) => state.shippingAddress,
    selectProjectNotes: (state) => state.projectNotes,
    selectCardNumber: (state) => state.cardNumber,
    selectExpiration: (state) => state.expiration,
    selectCvv: (state) => state.cvv,
  },
});

export const { setField, setPaymentMethod, resetCheckout } = checkoutSlice.actions;
export const {
  selectCheckout,
  selectPaymentMethod,
  selectCustomerName,
  selectPhone,
  selectEmail,
  selectShippingAddress,
  selectProjectNotes,
  selectCardNumber,
  selectExpiration,
  selectCvv,
} = checkoutSlice.selectors;
export default checkoutSlice.reducer;
