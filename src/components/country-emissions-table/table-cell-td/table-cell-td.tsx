import React from 'react';

type TableCellTdProps = {
  children: React.ReactNode;
};

export const TableCellTd = React.memo(function TableCellTd({
  children,
}: TableCellTdProps) {
  return (
    <td className="px-4 py-2 border-b border-2 border-[var(--color-base-300)]">
      {children}
    </td>
  );
});
