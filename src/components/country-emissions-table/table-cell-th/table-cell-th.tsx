import React from 'react';

type TableCellThProps = {
  children: React.ReactNode;
};

export const TableCellTh = React.memo(function TableCellTh({
  children,
}: TableCellThProps) {
  return (
    <th className="bg-[var(--color-info)] text-[var(--color-primary-content)] px-4 py-2 font-semibold border-b border-2 border-[var(--color-base-300)]">
      {children}
    </th>
  );
});
