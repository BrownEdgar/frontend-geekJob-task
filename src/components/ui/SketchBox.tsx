import { formatCurrency } from '@/lib/pricing';

interface SketchBoxProps {
  label: string;
  value: number;
  highlight?: boolean;
  className?: string;
}

export function SketchBox({
  label,
  value,
  highlight = false,
  className = '',
}: SketchBoxProps) {
  return (
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <span className="text-xs font-semibold tracking-wider uppercase text-ink/70">
        {label}
      </span>
      <div
        className={`sketch-border min-w-[120px] px-3 py-1.5 text-right font-sketch text-lg ${
          highlight ? 'bg-paper text-lg font-bold' : 'bg-transparent'
        }`}
      >
        <span className="text-ink/50">[</span>
        {formatCurrency(value)}
        <span className="text-ink/50">]</span>
      </div>
    </div>
  );
}
