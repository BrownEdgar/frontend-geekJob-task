'use client';

import { setPaymentMethod } from '@/app/store/features/checkout';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  CreditCardFields,
  type CreditCardFieldsProps,
} from '@/components/checkout/CreditCardFields';
import { PAYMENT_ICONS, PAYMENT_METHODS, PAYMENT_METHOD_LABELS } from '@/constants/payment';
import { cn } from '@/lib/cn';
import type { PaymentMethod } from '@/types';

import Image from 'next/image';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const paymentOptionTransition = { type: 'spring' as const, stiffness: 400, damping: 32 };

interface PaymentOptionProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: (method: PaymentMethod) => void;
  creditCardFields?: CreditCardFieldsProps;
}
interface PaymentMethodSelectorProps {
  creditCardFields?: CreditCardFieldsProps;
}

export function PaymentOption({
  method,
  selected,
  onSelect,
  creditCardFields,
}: PaymentOptionProps) {
  const isCreditCard = method === 'credit-card';
  const showCreditCardForm = isCreditCard && selected && creditCardFields;

  return (
    <motion.div
      layout
      transition={paymentOptionTransition}
      className={cn(
        'sketch-border flex w-full flex-col gap-2 p-3 transition-colors',
        selected && 'ring-ink ring-2',
        showCreditCardForm && 'bg-cream col-span-full'
      )}
    >
      <motion.button
        type="button"
        layout="position"
        onClick={() => onSelect(method)}
        whileTap={{ scale: 0.98 }}
        className={cn('flex w-full cursor-pointer flex-col items-center gap-2 transition-colors')}
        aria-pressed={selected}
      >
        <motion.span
          layout
          className={cn(
            'border-ink flex h-4 w-4 items-center justify-center rounded-full border-2 bg-transparent',
            {
              selected: 'bg-ink',
            }
          )}
          aria-hidden
        >
          <AnimatePresence initial={false}>
            {selected && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-1.5 w-1.5 rounded-full"
              />
            )}
          </AnimatePresence>
        </motion.span>
        {PAYMENT_ICONS[method] ? (
          <Image
            src={PAYMENT_ICONS[method]!}
            alt={PAYMENT_METHOD_LABELS[method]}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            aria-hidden
          />
        ) : (
          <span className="text-lg" aria-hidden>
            🏦
          </span>
        )}
        <p className="text-normal text-center leading-tight font-semibold uppercase">
          {PAYMENT_METHOD_LABELS[method]}
        </p>
      </motion.button>

      <AnimatePresence initial={false}>
        {showCreditCardForm && (
          <motion.div
            key="credit-card-fields"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={paymentOptionTransition}
            className="overflow-hidden"
          >
            <CreditCardFields {...creditCardFields} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PaymentMethodSelector({ creditCardFields }: PaymentMethodSelectorProps) {
  const dispatch = useAppDispatch();
  const paymentMethod = useAppSelector((s) => s.checkout.paymentMethod);

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
              onSelect={(m) => dispatch(setPaymentMethod(m))}
              creditCardFields={method === 'credit-card' ? creditCardFields : undefined}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
