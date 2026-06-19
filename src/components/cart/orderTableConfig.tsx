import type { ReactNode } from 'react';

export const ORDER_TABLE_CELL_PADDING = 'px-2 py-2 text-center';

export interface OrderTableColumn {
  id: string;
  header: ReactNode;
  className?: string;
}

export const ORDER_TABLE_COLUMNS: OrderTableColumn[] = [
  { id: 'collection', header: 'Tile Collection' },
  { id: 'item', header: 'Item' },
  {
    id: 'quantity',
    header: (
      <>
        Quantity <br />
        (sq. ft.)
      </>
    ),
    className: 'w-0 whitespace-nowrap',
  },
  { id: 'price', header: 'Unit Price ($)' },
  { id: 'actions', header: 'Actions' },
];

export function getCellClassName(): string {
  return ORDER_TABLE_CELL_PADDING;
}

export function getColumnClassName(columnId: string): string {
  return ORDER_TABLE_COLUMNS.find((column) => column.id === columnId)?.className ?? '';
}
