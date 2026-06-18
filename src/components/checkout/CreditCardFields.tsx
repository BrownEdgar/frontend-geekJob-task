'use client';

import { SketchInput } from '@/components/ui/SketchInput';

interface CreditCardFieldsProps {
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

export function CreditCardFields({
  cardNumber,
  expiration,
  cvv,
  errors,
  onChange,
}: CreditCardFieldsProps) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <SketchInput
        label="Card Number"
        value={cardNumber}
        onChange={(e) => onChange('cardNumber', e.target.value)}
        placeholder="1234 5678 9012 3456"
        error={errors.cardNumber}
        className="sm:col-span-3"
      />
      <SketchInput
        label="Expiration"
        value={expiration}
        onChange={(e) => onChange('expiration', e.target.value)}
        placeholder="MM/YY"
        error={errors.expiration}
      />
      <SketchInput
        label="CVV"
        value={cvv}
        onChange={(e) => onChange('cvv', e.target.value)}
        placeholder="123"
        error={errors.cvv}
        className="sm:col-span-2"
      />
    </div>
  );
}
