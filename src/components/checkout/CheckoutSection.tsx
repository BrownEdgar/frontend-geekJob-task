'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormValues } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setField } from '@/store/slices/checkoutSlice';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethod';
import { CreditCardFields } from '@/components/checkout/CreditCardFields';
import { ProjectNotes } from '@/components/checkout/ProjectNotes';
import { SketchButton } from '@/components/ui/SketchButton';

interface CheckoutSectionProps {
  showNotes?: boolean;
  showSubmit?: boolean;
}

export function CheckoutSection({
  showNotes = true,
  showSubmit = false,
}: CheckoutSectionProps) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <PaymentMethodSelector />

      {checkout.paymentMethod === 'credit-card' && (
        <CreditCardFields
          cardNumber={checkout.cardNumber}
          expiration={checkout.expiration}
          cvv={checkout.cvv}
          errors={{
            cardNumber: errors.cardNumber?.message,
            expiration: errors.expiration?.message,
            cvv: errors.cvv?.message,
          }}
          onChange={(field, value) => syncField(field, value)}
        />
      )}

      {showNotes && (
        <ProjectNotes
          value={checkout.projectNotes}
          onChange={(v) => syncField('projectNotes', v)}
        />
      )}

      {showSubmit && (
        <SketchButton type="submit" variant="primary" size="lg" className="w-full">
          Place Secure Order
        </SketchButton>
      )}
    </form>
  );
}
