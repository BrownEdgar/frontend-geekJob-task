'use client';

import { BracketedValue } from '@/components/ui/BracketedValue';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <span className="inline-block whitespace-nowrap">
      <BracketedValue>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            onChange(Number.isNaN(parsed) ? 0 : parsed);
          }}
          className="no-number-spinners w-12 max-w-12 min-w-0 bg-transparent! text-center text-sm outline-none"
          aria-label="Quantity in square feet"
        />
      </BracketedValue>
    </span>
  );
}
