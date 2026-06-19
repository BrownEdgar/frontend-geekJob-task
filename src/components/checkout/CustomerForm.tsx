'use client';

import { useCheckoutFormContext } from '@/components/checkout/CheckoutFormProvider';
import { CustomerField } from '@/components/checkout/CustomerField';
import { type CheckoutFormValues } from '@/lib/validation';

import { useFormContext } from 'react-hook-form';

export function CustomerForm() {
  const { setCheckoutField } = useCheckoutFormContext();
  const {
    watch,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <section className="flex flex-col gap-1 border-b pb-12 pl-2">
      <CustomerField
        id="customer-name"
        label="Customer Name"
        value={watch('customerName') ?? ''}
        onChange={(v) => setCheckoutField('customerName', v)}
        error={errors.customerName?.message}
        labelClassName="relative top-[4px]"
      />

      <div className="flex gap-6">
        <CustomerField
          id="phone"
          label="Phone"
          type="tel"
          className="flex-1"
          value={watch('phone') ?? ''}
          onChange={(v) => setCheckoutField('phone', v)}
          error={errors.phone?.message}
          labelClassName="relative top-[4px]"
        />
        <CustomerField
          id="email"
          label="Email"
          type="email"
          className="flex-1"
          value={watch('email') ?? ''}
          onChange={(v) => setCheckoutField('email', v)}
          error={errors.email?.message}
          labelClassName="relative top-[4px]"
        />
      </div>

      <CustomerField
        id="shipping-address"
        label="Shipping Address"
        value={watch('shippingAddress') ?? ''}
        onChange={(v) => setCheckoutField('shippingAddress', v)}
        error={errors.shippingAddress?.message}
        labelClassName="relative top-[4px]"
      />

      <CustomerField
        id="project-notes"
        label="Project Notes"
        value={watch('projectNotes') ?? ''}
        onChange={(v) => setCheckoutField('projectNotes', v)}
        error={errors.projectNotes?.message}
        labelClassName="relative top-[4px]"
      />
    </section>
  );
}
