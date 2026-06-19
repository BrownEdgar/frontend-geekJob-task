'use client';

import { cn } from '@/lib/cn';

export interface CreditCardFieldsProps {
  cardNumber: string;
  expiration: string;
  cvv: string;
  errors: {
    cardNumber?: string;
    expiration?: string;
    cvv?: string;
  };
  onChange: (field: 'cardNumber' | 'expiration' | 'cvv', value: string) => void;
}

const inputClass = 'w-full rounded border border-ink px-2 py-1 outline-none';

export function CreditCardFields({
  cardNumber,
  expiration,
  cvv,
  errors,
  onChange,
}: CreditCardFieldsProps) {
  return (
    <fieldset className="flex w-full flex-col gap-2 border-0 p-0">
      <div className="flex flex-col gap-1">
        <label htmlFor="card-number" className="text-[10px] font-bold uppercase">
          Card Number
        </label>
        <input
          id="card-number"
          type="text"
          value={cardNumber}
          onChange={(e) => onChange('cardNumber', e.target.value)}
          placeholder="1234 4556 7723 8990"
          className={cn(inputClass, errors.cardNumber && 'border-red-600')}
        />
        {errors.cardNumber && <span className="text-xs text-red-600">{errors.cardNumber}</span>}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <input
            id="card-expiration"
            type="text"
            value={expiration}
            onChange={(e) => onChange('expiration', e.target.value)}
            placeholder="EXPIRATION /"
            aria-label="Expiration"
            className={cn(inputClass, errors.expiration && 'border-red-600')}
          />
          {errors.expiration && <span className="text-xs text-red-600">{errors.expiration}</span>}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <input
            id="card-cvv"
            type="text"
            value={cvv}
            onChange={(e) => onChange('cvv', e.target.value)}
            placeholder="CVV"
            aria-label="CVV"
            className={cn(inputClass, errors.cvv && 'border-red-600')}
          />
          {errors.cvv && <span className="text-xs text-red-600">{errors.cvv}</span>}
        </div>
      </div>
    </fieldset>
  );
}
