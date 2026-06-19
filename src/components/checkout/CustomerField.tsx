import { cn } from '@/lib/cn';

export interface CustomerFieldProps {
  label: string;
  id: string;
  value: string;
  error?: string;
  type?: string;
  className?: string;
  onChange: (value: string) => void;
  labelClassName?: string;
}

export function CustomerField({
  label,
  id,
  value,
  error,
  type = 'text',
  className,
  onChange,
  labelClassName,
}: CustomerFieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col', className)}>
      <div className="flex items-end gap-1">
        <label
          htmlFor={id}
          className={cn('shrink-0 text-base font-bold uppercase lg:text-[10px]', labelClassName)}
        >
          {label}:
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'min-w-0 flex-1 border-0 border-b bg-transparent! px-0.5 text-base outline-none lg:text-[10px]',
            error ? 'border-b-red-600' : 'border-b-ink'
          )}
        />
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
