import type { PaymentMethod } from '@/types';

export const PAYMENT_METHOD_VALUES = [
  'credit-card',
  'paypal',
  'apple-pay',
  'bank-transfer',
] as const satisfies readonly PaymentMethod[];

export const PAYMENT_METHODS: PaymentMethod[] = [...PAYMENT_METHOD_VALUES];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  'credit-card': 'Credit/Debit Card',
  paypal: 'PayPal',
  'apple-pay': 'Apple Pay',
  'bank-transfer': 'Bank Transfer',
};

export const PAYMENT_ICONS: Record<PaymentMethod, string | null> = {
  'credit-card': '/cards .png',
  paypal: '/paypal.png',
  'apple-pay': '/apple-pay.png',
  'bank-transfer': null,
};
