import React from 'react';
import { clsx } from 'clsx';

type TableCellThProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableCellTh = React.memo(function TableCellTh({
  children,
  className,
}: TableCellThProps) {
  return (
    <th
      className={clsx(
        'bg-[var(--color-info)] text-[var(--color-primary-content)] px-4 py-2 font-semibold border-b border-2 border-[var(--color-base-300)]',
        className
      )}
    >
      {children}
    </th>
  );
});
