import { BracketedValue } from '@/components/ui/BracketedValue';
import { formatCurrency } from '@/lib/pricing';

export interface SketchBoxProps {
  label: string;
  value: number;
  className?: string;
}

export function SketchBox({ label, value, className = '' }: SketchBoxProps) {
  return (
    <p className={`text-right text-sm font-bold tracking-wider uppercase ${className}`}>
      {label}: <BracketedValue>{formatCurrency(value)}</BracketedValue>
    </p>
  );
}
