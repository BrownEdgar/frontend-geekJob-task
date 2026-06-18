'use client';

import { useAppSelector } from '@/store/hooks';
import {
  selectGrandTotal,
  selectShipping,
  selectSubtotal,
} from '@/store/selectors/cartSelectors';
import { SketchBox } from '@/components/ui/SketchBox';

interface OrderSummaryProps {
  className?: string;
}

export function OrderSummary({ className = '' }: OrderSummaryProps) {
  const subtotal = useAppSelector(selectSubtotal);
  const shipping = useAppSelector(selectShipping);
  const grandTotal = useAppSelector(selectGrandTotal);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <SketchBox label="Subtotal" value={subtotal} />
      <SketchBox label="Shipping" value={shipping} />
      <SketchBox label="Grand Total" value={grandTotal} highlight />
    </div>
  );
}
