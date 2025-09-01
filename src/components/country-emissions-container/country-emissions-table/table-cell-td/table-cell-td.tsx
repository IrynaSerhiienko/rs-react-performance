import React from 'react';
import { clsx } from 'clsx';

type TableCellTdProps = {
  children: React.ReactNode;
  className?: string;
};

export const TableCellTd = React.memo(function TableCellTd({
  children,
  className,
}: TableCellTdProps) {
  return (
    <td
      className={clsx(
        'px-4 py-2 border-b border-2 border-[var(--color-base-300)]',
        className
      )}
    >
      {children}
    </td>
  );
});
