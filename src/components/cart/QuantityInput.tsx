'use client';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <div className="sketch-border mx-auto w-16 bg-paper px-1 py-1 text-center">
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          onChange(Number.isNaN(parsed) ? 0 : parsed);
        }}
        className="w-full bg-transparent text-center text-sm outline-none"
        aria-label="Quantity in square feet"
      />
    </div>
  );
}
