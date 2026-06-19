import { PAYMENT_METHOD_VALUES } from '@/constants/payment';

import { z } from 'zod';

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

    const cardNumber = data.cardNumber?.replace(/\s/g, '') ?? '';
    if (!/^\d{13,19}$/.test(cardNumber)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Card number must be 13–19 digits',
        path: ['cardNumber'],
      });
    }

    if (!/^\d{2}\/\d{2}$/.test(data.expiration ?? '')) {
      ctx.addIssue({
        code: 'custom',
        message: 'Use MM/YY format',
        path: ['expiration'],
      });
    }

    if (!/^\d{3,4}$/.test(data.cvv ?? '')) {
      ctx.addIssue({
        code: 'custom',
        message: 'CVV must be 3–4 digits',
        path: ['cvv'],
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
