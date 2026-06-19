import { cn } from '@/lib/cn';

export const DESKTOP_LAYOUT_CLASSNAME = cn(
  'hidden gap-2 lg:grid',
  'lg:grid-cols-1',
  'xl:grid-cols-2',
  '2xl:grid-cols-[1fr_1.2fr_1fr]'
);

export const CHECKOUT_PANEL_LAYOUT_CLASSNAME = cn(
  'min-w-0 max-w-[500px]',
  'xl:col-span-2',
  '2xl:col-span-1'
);
