import { PAYMENT_METHOD_VALUES } from '@/constants/payment';

import { z } from 'zod';

export const CARD_FIELDS = ['cardNumber', 'expiration', 'cvv'] as const;
export type CardField = (typeof CARD_FIELDS)[number];

export const CARD_NUMBER_MAX_DISPLAY_LENGTH = 23;

const CARD_NUMBER_DIGITS_REGEX = /^\d{13,19}$/;
const CARD_EXPIRATION_REGEX = /^\d{2}\/\d{2}$/;
const CARD_CVV_REGEX = /^\d{3,4}$/;

export function sanitizeCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function sanitizeExpiration(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function sanitizeCvv(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4);
}

export function sanitizeCardField(field: CardField, value: string): string {
  switch (field) {
    case 'cardNumber':
      return sanitizeCardNumber(value);
    case 'expiration':
      return sanitizeExpiration(value);
    case 'cvv':
      return sanitizeCvv(value);
  }
}

export function isCardField(field: string): field is CardField {
  return (CARD_FIELDS as readonly string[]).includes(field);
}

function isValidExpirationMonth(expiration: string): boolean {
  const [month] = expiration.split('/').map((part) => Number(part));
  return month >= 1 && month <= 12;
}

function validateCreditCardFields(
  data: { cardNumber?: string; expiration?: string; cvv?: string },
  ctx: z.RefinementCtx
) {
  const cardNumber = data.cardNumber?.replace(/\s/g, '') ?? '';
  if (!CARD_NUMBER_DIGITS_REGEX.test(cardNumber)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Card number must be 13–19 digits',
      path: ['cardNumber'],
    });
  }

  const expiration = data.expiration ?? '';
  if (!CARD_EXPIRATION_REGEX.test(expiration)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Use MM/YY format',
      path: ['expiration'],
    });
  } else if (!isValidExpirationMonth(expiration)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Month must be between 01 and 12',
      path: ['expiration'],
    });
  }

  if (!CARD_CVV_REGEX.test(data.cvv ?? '')) {
    ctx.addIssue({
      code: 'custom',
      message: 'CVV must be 3–4 digits',
      path: ['cvv'],
    });
  }
}

export const checkoutSchema = z
  .object({
    customerName: z.string().min(2, 'Customer name is required'),
    phone: z
      .string()
      .min(7, 'Phone number is required')
      .regex(/^[\d\s()+-]+$/, 'Invalid phone number'),
    email: z.string().email('Invalid email address'),
    shippingAddress: z.string().min(5, 'Shipping address is required'),
    projectNotes: z.string().optional(),
    paymentMethod: z.enum(PAYMENT_METHOD_VALUES),
    cardNumber: z.string().optional(),
    expiration: z.string().optional(),
    cvv: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== 'credit-card') return;
    validateCreditCardFields(data, ctx);
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const emptyCheckoutValues = {
  customerName: '',
  phone: '',
  email: '',
  shippingAddress: '',
  projectNotes: '',
  paymentMethod: '' as CheckoutFormValues['paymentMethod'],
  cardNumber: '',
  expiration: '',
  cvv: '',
} satisfies Record<keyof CheckoutFormValues, string | undefined>;
