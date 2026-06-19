'use client';

import { setField } from '@/app/store/features/checkout';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethod';
import { SketchButton } from '@/components/ui/SketchButton';
import { type CheckoutFormValues, checkoutSchema } from '@/lib/validation';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

export interface CheckoutSectionProps {
  showSubmit?: boolean;
}

export function CheckoutSection({ showSubmit = false }: CheckoutSectionProps) {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector((s) => s.checkout);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkout,
  });

  const syncField = (field: keyof CheckoutFormValues, value: string) => {
    dispatch(setField({ field: field as never, value }));
    setValue(field, value, { shouldValidate: false });
  };

  const onSubmit = () => {
    const result = checkoutSchema.safeParse(checkout);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? 'Please fix form errors';
      alert(firstError);
      return;
    }
    console.log('Order placed:', result.data);
    alert('Order placed successfully! Thank you for your order.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <PaymentMethodSelector
        creditCardFields={{
          cardNumber: checkout.cardNumber,
          expiration: checkout.expiration,
          cvv: checkout.cvv,
          errors: {
            cardNumber: errors.cardNumber?.message,
            expiration: errors.expiration?.message,
            cvv: errors.cvv?.message,
          },
          onChange: (field, value) => syncField(field, value),
        }}
      />

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
