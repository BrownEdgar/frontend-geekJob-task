'use client';

import { useCheckoutFormContext } from '@/components/checkout/CheckoutFormProvider';
import { CreditCardFields } from '@/components/checkout/CreditCardFields';
import { PAYMENT_ICONS, PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from '@/constants/payment';
import { cn } from '@/lib/cn';
import { type CheckoutFormValues } from '@/lib/validation';
import type { PaymentMethod } from '@/types';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const paymentOptionTransition = { type: 'spring' as const, stiffness: 400, damping: 32 };

interface PaymentOptionProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentOption({ method, selected, onSelect }: PaymentOptionProps) {
  const isCreditCard = method === 'credit-card';
  const showCreditCardForm = isCreditCard && selected;

  return (
    <motion.div
      layout
      transition={paymentOptionTransition}
      role="radio"
      aria-checked={selected}
      aria-label={PAYMENT_METHOD_LABELS[method]}
      tabIndex={0}
      onClick={() => onSelect(method)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(method);
        }
      }}
      className={cn(
        'sketch-border flex w-full cursor-pointer flex-col gap-2 p-3 transition-colors',
        selected && 'ring-ink ring-2',
        showCreditCardForm && 'bg-cream col-span-full'
      )}
    >
      <motion.div
        layout="position"
        whileTap={{ scale: 0.98 }}
        className="flex w-full flex-col items-center gap-2"
      >
        <div className="relative flex h-4 w-4 items-center justify-center">
          <input
            type="radio"
            id={`payment-${method}`}
            name="payment-method"
            value={method}
            checked={selected}
            onChange={() => onSelect(method)}
            className="border-ink h-4 w-4 appearance-none rounded-full border-2 bg-transparent"
          />
          <AnimatePresence initial={false}>
            {selected && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="bg-ink pointer-events-none absolute h-1.5 w-1.5 rounded-full"
              />
            )}
          </AnimatePresence>
        </div>
        <Image
          src={PAYMENT_ICONS[method]!}
          alt={PAYMENT_METHOD_LABELS[method]}
          width={50}
          height={50}
          className="h-16 w-16"
          aria-hidden
        />
        <p
          className={cn(
            'text-normal leading-tight font-semibold uppercase',
            selected ? 'text-left' : 'text-center'
          )}
        >
          {PAYMENT_METHOD_LABELS[method]}
        </p>
      </motion.div>

      <AnimatePresence initial={false}>
        {showCreditCardForm && (
          <motion.div
            key="credit-card-fields"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={paymentOptionTransition}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <CreditCardFields />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PaymentMethodSelector() {
  const { watch } = useFormContext<CheckoutFormValues>();
  const { setCheckoutField } = useCheckoutFormContext();
  const paymentMethod = watch('paymentMethod');

  return (
    <section>
      <h3 className="bg-paper mb-3 inline-block border p-1 pl-2 text-xs font-bold tracking-wider uppercase">
        Select Payment Method:
      </h3>

      <LayoutGroup>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,calc(50%-0.25rem)),1fr))] gap-2">
          {PAYMENT_METHODS.map((method) => (
            <PaymentOption
              key={method}
              method={method}
              selected={paymentMethod === method}
              onSelect={(m) => setCheckoutField('paymentMethod', m)}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
