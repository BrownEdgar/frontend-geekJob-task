'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormValues } from '@/lib/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setField } from '@/store/slices/checkoutSlice';
import { SketchInput } from '@/components/ui/SketchInput';

export function CustomerForm() {
  const dispatch = useAppDispatch();
  const checkout = useAppSelector((s) => s.checkout);

  const {
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

  return (
    <section className="flex flex-col gap-5">
      <SketchInput
        label="Customer Name"
        value={checkout.customerName}
        onChange={(e) => syncField('customerName', e.target.value)}
        error={errors.customerName?.message}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SketchInput
          label="Phone"
          type="tel"
          value={checkout.phone}
          onChange={(e) => syncField('phone', e.target.value)}
          error={errors.phone?.message}
        />
        <SketchInput
          label="Email"
          type="email"
          value={checkout.email}
          onChange={(e) => syncField('email', e.target.value)}
          error={errors.email?.message}
        />
      </div>

      <SketchInput
        label="Shipping Address"
        value={checkout.shippingAddress}
        onChange={(e) => syncField('shippingAddress', e.target.value)}
        error={errors.shippingAddress?.message}
      />
    </section>
  );
}
