'use client';

import type { PaymentMethod } from '@/types';
import { paymentMethodLabels } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPaymentMethod } from '@/store/slices/checkoutSlice';

const paymentIcons: Record<PaymentMethod, string> = {
  'credit-card': '💳',
  paypal: 'P',
  'apple-pay': '',
  'bank-transfer': '🏦',
};

interface PaymentOptionProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentOption({
  method,
  selected,
  onSelect,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`sketch-border flex flex-1 flex-col items-center gap-2 bg-paper p-3 transition-colors hover:bg-cream ${
        selected ? 'ring-2 ring-ink bg-cream' : ''
      }`}
      aria-pressed={selected}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink ${
          selected ? 'bg-ink' : 'bg-transparent'
        }`}
        aria-hidden
      >
        {selected && (
          <span className="h-1.5 w-1.5 rounded-full bg-cream" />
        )}
      </span>
      <span className="text-lg" aria-hidden>
        {paymentIcons[method]}
      </span>
      <span className="text-center text-[10px] font-bold leading-tight tracking-wide uppercase">
        {paymentMethodLabels[method]}
      </span>
    </button>
  );
}

export function PaymentMethodSelector() {
  const dispatch = useAppDispatch();
  const paymentMethod = useAppSelector((s) => s.checkout.paymentMethod);

  const methods: PaymentMethod[] = [
    'credit-card',
    'paypal',
    'apple-pay',
    'bank-transfer',
  ];

  return (
    <section>
      <h3 className="mb-3 text-xs font-bold tracking-wider uppercase">
        Select Payment Method:
      </h3>
      <div className="flex flex-wrap gap-2">
        {methods.map((method) => (
          <PaymentOption
            key={method}
            method={method}
            selected={paymentMethod === method}
            onSelect={(m) => dispatch(setPaymentMethod(m))}
          />
        ))}
      </div>
    </section>
  );
}
