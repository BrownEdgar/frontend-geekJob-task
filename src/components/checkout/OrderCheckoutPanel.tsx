'use client';

import OrderSummary from '@/components/cart/OrderSummary';
import { CheckoutFormProvider } from '@/components/checkout/CheckoutFormProvider';
import { CheckoutSection } from '@/components/checkout/CheckoutSection';
import { CustomerForm } from '@/components/checkout/CustomerForm';

export interface OrderCheckoutPanelProps {
  showSubmit?: boolean;
}

export function OrderCheckoutPanel({ showSubmit = true }: OrderCheckoutPanelProps) {
  return (
    <CheckoutFormProvider>
      <section className="flex flex-col gap-1">
        <div className="border-ink bg-paper border-b-2">
          <h2 className="border-ink bg-paper font-display mb-[-2px] inline-block rounded-t border border-b-0 px-3 py-1 text-xl tracking-[0.12em] lg:text-xl">
            ORDER SUMMARY
          </h2>
        </div>

        <CustomerForm />
        <OrderSummary />
        <CheckoutSection showSubmit={showSubmit} />
      </section>
    </CheckoutFormProvider>
  );
}
