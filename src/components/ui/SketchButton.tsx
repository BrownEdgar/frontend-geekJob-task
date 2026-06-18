import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface SketchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'sketch-border bg-paper hover:bg-cream',
  primary: 'sketch-border bg-ink text-cream hover:bg-ink/90',
  ghost: 'border border-transparent hover:border-ink/30',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-6 py-3 text-sm font-semibold tracking-wider uppercase',
};

export function SketchButton({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: SketchButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 font-semibold tracking-wide uppercase transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
