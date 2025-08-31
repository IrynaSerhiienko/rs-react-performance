import { getData } from '../../shared/api/getData';
import { use, useState } from 'react';
import { Spinner } from '../spinner/spinner';
import {
  MODAL,
  TABLE_COLUMNS,
  KEY_CODES,
} from '../../shared/constants/constants';
import type { CountryInfo, Co2Data } from '../../shared/types/types';
import { TableCellTh } from './table-cell-th/table-cell-th';
import { TableCellTd } from './table-cell-td/table-cell-td';
import { Modal } from './modal/modal';

const DEFAULT_VALUE = 'N/A';
const ROW_INDEX_OFFSET = 1;
const LAST_ELEMENT_OFFSET = 1;

const dataPromise = getData();

function normalizeCountryData(country: string, info: CountryInfo) {
  const latest = info.data?.[info.data.length - LAST_ELEMENT_OFFSET] ?? {};

  return {
    name: country,
    iso: info.iso_code ?? DEFAULT_VALUE,
    year: latest.year ?? DEFAULT_VALUE,
    population: latest.population ?? DEFAULT_VALUE,
    co2: latest.cement_co2 ?? DEFAULT_VALUE,
    co2PerCapita: latest.cement_co2_per_capita ?? DEFAULT_VALUE,
  };
}

export function CountryEmissionsTable() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    TABLE_COLUMNS.map((column) => column.key)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = use(dataPromise) as Co2Data;

  if (!data) {
    return <Spinner />;
  }

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddColumns = (columns: string[]) => {
    setSelectedColumns((prev) => Array.from(new Set([...prev, ...columns])));
  };

  const displayedColumns = selectedColumns.map((selectedKey) => {
    const columnDefinition = TABLE_COLUMNS.find(
      (tableColumn) => tableColumn.key === selectedKey
    );
    return columnDefinition ?? { key: selectedKey, label: selectedKey };
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_CODES.ENTER) {
      handleOpenModal();
    }
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
        <table className=" w-full border-collapse rounded-lg shadow-2xl bg-[var(--color-base-100)] text-[var(--color-base-content)] text-base md:text-lg">
          <thead>
            <tr>
              <TableCellTh>
                <div
                  onClick={handleOpenModal}
                  role="button"
                  tabIndex={0}
                  title={MODAL.TITLE}
                  onKeyDown={handleKeyDown}
                  className="flex items-center justify-center text-4xl font-bold cursor-pointer select-none transition-transform duration-300  hover:scale-125"
                >
                  {MODAL.ADD_BUTTON}
                </div>
              </TableCellTh>

              {displayedColumns.map((column) => (
                <TableCellTh key={column.key} className="align-top">
                  {column.label}
                </TableCellTh>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(data).map(([country, info], index) => {
              const row = normalizeCountryData(country, info);

              return (
                <tr key={country} className="hover:bg-[var(--color-base-200)]">
                  <TableCellTd>{index + ROW_INDEX_OFFSET}</TableCellTd>
                  {displayedColumns.map((column) => (
                    <TableCellTd key={column.key}>
                      {row[column.key as keyof typeof row] ?? 'N/A'}
                    </TableCellTd>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
