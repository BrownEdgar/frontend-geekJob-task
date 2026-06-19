'use client';

import { setField } from '@/app/store/features/checkout';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { CustomerField } from '@/components/checkout/CustomerField';
import { type CheckoutFormValues, checkoutSchema } from '@/lib/validation';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

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
    <section className="flex flex-col gap-1 border-b pb-12 pl-2">
      <CustomerField
        id="customer-name"
        label="Customer Name"
        value={checkout.customerName}
        onChange={(v) => syncField('customerName', v)}
        error={errors.customerName?.message}
        labelClassName="relative top-[4px]"
      />

      <div className="flex gap-6">
        <CustomerField
          id="phone"
          label="Phone"
          type="tel"
          className="flex-1"
          value={checkout.phone}
          onChange={(v) => syncField('phone', v)}
          error={errors.phone?.message}
          labelClassName="relative top-[4px]"
        />
        <CustomerField
          id="email"
          label="Email"
          type="email"
          className="flex-1"
          value={checkout.email}
          onChange={(v) => syncField('email', v)}
          error={errors.email?.message}
          labelClassName="relative top-[4px]"
        />
      </div>

      <CustomerField
        id="shipping-address"
        label="Shipping Address"
        value={checkout.shippingAddress}
        onChange={(v) => syncField('shippingAddress', v)}
        error={errors.shippingAddress?.message}
        labelClassName="relative top-[4px]"
      />

      <CustomerField
        id="project-notes"
        label="Project Notes"
        value={checkout.projectNotes}
        onChange={(v) => syncField('projectNotes', v)}
        error={errors.projectNotes?.message}
        labelClassName="relative top-[4px]"
      />
    </section>
  );
}
