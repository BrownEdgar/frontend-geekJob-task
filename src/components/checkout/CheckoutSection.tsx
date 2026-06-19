'use client';

import { PaymentMethodSelector } from '@/components/checkout/PaymentMethod';
import { SketchButton } from '@/components/ui/SketchButton';
import { type CheckoutFormValues } from '@/lib/validation';

import { useFormContext } from 'react-hook-form';

export interface CheckoutSectionProps {
  showSubmit?: boolean;
}

export function CheckoutSection({ showSubmit = false }: CheckoutSectionProps) {
  const { handleSubmit } = useFormContext<CheckoutFormValues>();

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Order placed:', data);
    alert('Order placed successfully! Thank you for your order.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <PaymentMethodSelector />

      {showSubmit && (
        <SketchButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer rounded-[8px]! font-bold"
        >
          Place Secure Order
        </SketchButton>
      )}
    </form>
  );
}
