import { useState, useMemo, useCallback } from 'react';

import {
  MODAL,
  TABLE_COLUMNS,
  KEY_CODES,
  TABLE_UTILS,
  FILTERS,
} from '../../../shared/constants/constants';
import type { Co2Data } from '../../../shared/types/types';
import { TableCellTh } from './table-cell-th/table-cell-th';
import { TableCellTd } from './table-cell-td/table-cell-td';
import { Modal } from './modal/modal';
import { normalizeCountryData } from '../../../utils/normalize-country-data';

type CountryEmissionsTableProps = {
  data: Co2Data;
  searchName: string;
  selectedYear: string;
  selectedCountry: string;
};

export function CountryEmissionsTable({
  data,
  searchName,
  selectedYear,
  selectedCountry,
}: CountryEmissionsTableProps) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    TABLE_COLUMNS.map((column) => column.key)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleAddColumns = useCallback(
    (columns: string[]) =>
      setSelectedColumns((prev) => Array.from(new Set([...prev, ...columns]))),
    []
  );

  const displayedColumns = useMemo(
    () =>
      selectedColumns.map(
        (key) =>
          TABLE_COLUMNS.find((col) => col.key === key) ?? { key, label: key }
      ),
    [selectedColumns]
  );

  const normalizedData = useMemo(
    () =>
      Object.entries(data).map(([country, info]) =>
        normalizeCountryData(country, info)
      ),
    [data]
  );

  const filteredData = useMemo(() => {
    return normalizedData
      .map((row) => {
        const yearData =
          selectedYear === FILTERS.SELECT_LATEST
            ? (row.data[row.data.length - TABLE_UTILS.LAST_ELEMENT_OFFSET] ??
              {})
            : (row.data.find(
                (yearEntry) => String(yearEntry.year) === selectedYear
              ) ?? {});

        return {
          ...row,
          population: yearData.population ?? TABLE_UTILS.DEFAULT_VALUE,
          co2: yearData.cement_co2 ?? TABLE_UTILS.DEFAULT_VALUE,
          co2PerCapita:
            yearData.cement_co2_per_capita ?? TABLE_UTILS.DEFAULT_VALUE,
          year: yearData.year ?? row.year,
        };
      })
      .filter(
        (row) =>
          row.name.toLowerCase().includes(searchName.toLowerCase()) &&
          (selectedCountry === '' || row.name === selectedCountry)
      );
  }, [normalizedData, searchName, selectedYear, selectedCountry]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_CODES.ENTER) handleOpenModal();
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onAddColumns={handleAddColumns}
          existingColumns={selectedColumns}
        />
      )}

      <div className="relative w-full">
        <table className="w-full border-collapse rounded-lg shadow-2xl bg-[var(--color-base-100)] text-[var(--color-base-content)] text-base md:text-lg">
          <thead>
            <tr>
              <TableCellTh>
                <div
                  onClick={handleOpenModal}
                  role="button"
                  tabIndex={0}
                  title={MODAL.TITLE}
                  onKeyDown={handleKeyDown}
                  className="flex items-center justify-center text-4xl font-bold cursor-pointer select-none transition-transform duration-300 hover:scale-125"
                >
                  {MODAL.ADD_BUTTON}
                </div>
              </TableCellTh>

              {displayedColumns.map((column) => (
                <TableCellTh key={column.key} className="align-top">
                  <span>{column.label}</span>
                </TableCellTh>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.name} className="hover:bg-[var(--color-base-200)]">
                <TableCellTd>
                  {index + TABLE_UTILS.ROW_INDEX_OFFSET}
                </TableCellTd>
                {displayedColumns.map((column) => (
                  <TableCellTd key={column.key}>
                    {(() => {
                      const value = row[column.key as keyof typeof row];
                      if (Array.isArray(value))
                        return TABLE_UTILS.DEFAULT_VALUE;
                      if (value === undefined || value === null)
                        return TABLE_UTILS.DEFAULT_VALUE;
                      return value;
                    })()}
                  </TableCellTd>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
