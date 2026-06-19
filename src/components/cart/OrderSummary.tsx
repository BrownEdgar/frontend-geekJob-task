'use client';

import { selectGrandTotal, selectShipping, selectSubtotal } from '@/app/store/features/cart';
import { useAppSelector } from '@/app/store/hooks';
import { BracketedValue } from '@/components/ui/BracketedValue';
import { formatCurrency } from '@/lib/pricing';

interface OrderTotalsProps {
  className?: string;
}

const rowClass = 'text-[12px] font-bold uppercase leading-4';

export function OrderTotals({ className = '' }: OrderTotalsProps) {
  const subtotal = useAppSelector(selectSubtotal);
  const shipping = useAppSelector(selectShipping);
  const grandTotal = useAppSelector(selectGrandTotal);

  const rows = [
    { label: 'SUBTOTAL', value: subtotal },
    { label: 'SHIPPING', value: shipping },
    { label: 'GRAND TOTAL', value: grandTotal },
  ] as const;

  return (
    <div className={`my-1 text-right ${className}`}>
      {rows.map(({ label, value }) => (
        <p key={label} className={rowClass}>
          {label}: <BracketedValue>{formatCurrency(value)}</BracketedValue>
        </p>
      ))}
    </div>
  );
}

export function OrderSummary({ className = '' }: OrderTotalsProps) {
  return <OrderTotals className={className} />;
}
