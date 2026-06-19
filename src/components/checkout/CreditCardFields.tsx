'use client';

import { useCheckoutFormContext } from '@/components/checkout/CheckoutFormProvider';
import { cn } from '@/lib/cn';
import { CARD_NUMBER_MAX_DISPLAY_LENGTH, type CheckoutFormValues } from '@/lib/validation';

import { useFormContext } from 'react-hook-form';

const inputClass = 'w-full rounded border border-ink px-2 py-1 outline-none';

export function CreditCardFields() {
  const { setCheckoutField } = useCheckoutFormContext();
  const {
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  const cardNumber = watch('cardNumber') ?? '';
  const expiration = watch('expiration') ?? '';
  const cvv = watch('cvv') ?? '';

  return (
    <fieldset className="flex w-full flex-col gap-2 border-0 p-0">
      <div className="flex flex-col gap-1">
        <label htmlFor="card-number" className="text-[12px] font-bold uppercase">
          Card Number
        </label>
        <input
          id="card-number"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength={CARD_NUMBER_MAX_DISPLAY_LENGTH}
          value={cardNumber}
          onChange={(e) => setCheckoutField('cardNumber', e.target.value)}
          placeholder="1234 4556 7723 8990"
          className={cn(inputClass, errors.cardNumber && 'border-red-600')}
        />
        {errors.cardNumber && (
          <span className="text-xs text-red-600">{errors.cardNumber.message}</span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <input
            id="card-expiration"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
            value={expiration}
            onChange={(e) => setCheckoutField('expiration', e.target.value)}
            placeholder="EXPIRATION /"
            aria-label="Expiration"
            className={cn(inputClass, errors.expiration && 'border-red-600')}
          />
          {errors.expiration && (
            <span className="text-xs text-red-600">{errors.expiration.message}</span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <input
            id="card-cvv"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCheckoutField('cvv', e.target.value)}
            placeholder="CVV"
            aria-label="CVV"
            className={cn(inputClass, errors.cvv && 'border-red-600')}
          />
          {errors.cvv && <span className="text-xs text-red-600">{errors.cvv.message}</span>}
        </div>
      </div>
    </fieldset>
  );
}
