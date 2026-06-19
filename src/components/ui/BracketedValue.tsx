import type { ReactNode } from 'react';

export function BracketedValue({ children }: { children: ReactNode }) {
  return (
    <span>
      <span>[</span> {children} <span>]</span>
    </span>
  );
}
