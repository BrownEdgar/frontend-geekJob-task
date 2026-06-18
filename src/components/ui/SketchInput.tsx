import type { InputHTMLAttributes } from 'react';

interface SketchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function SketchInput({
  label,
  error,
  className = '',
  id,
  ...props
}: SketchInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={inputId}
        className="text-xs font-semibold tracking-wider uppercase text-ink/80"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`sketch-underline w-full py-1.5 text-sm outline-none placeholder:text-ink/40 ${
          error ? 'border-red-600' : ''
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
