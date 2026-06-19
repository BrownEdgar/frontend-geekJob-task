'use client';

import { OrderTotals } from '@/components/cart/OrderSummary';
import { CheckoutSection } from '@/components/checkout/CheckoutSection';
import { CustomerForm } from '@/components/checkout/CustomerForm';

export interface OrderCheckoutPanelProps {
  showSubmit?: boolean;
}

export function OrderCheckoutPanel({ showSubmit = true }: OrderCheckoutPanelProps) {
  return (
    <section className="flex flex-col gap-1">
      <div className="border-ink bg-paper border-b-2">
        <h2 className="border-ink bg-paper font-display mb-[-2px] inline-block rounded-t border border-b-0 px-3 py-1 text-xl tracking-[0.12em] lg:text-xl">
          ORDER SUMMARY
        </h2>
      </div>

      <CustomerForm />
      <OrderTotals />
      <CheckoutSection showSubmit={showSubmit} />
    </section>
  );
}
