import { cn } from '@/lib/cn';

import type { InputHTMLAttributes } from 'react';

export interface SketchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function SketchInput({ label, error, className = '', id, ...props }: SketchInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={className}>
      <label htmlFor={inputId}>
        {label}
        <br />
        <input
          id={inputId}
          className={cn(
            'w-full border-0 border-b outline-none',
            error ? 'border-b-red-500' : 'border-b-current'
          )}
          {...props}
        />
      </label>
      {error && <span>{error}</span>}
    </div>
  );
}
