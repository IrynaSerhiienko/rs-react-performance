import { getData } from '../../shared/api/getData';
import { use, useState } from 'react';
import { Spinner } from '../spinner/spinner';
import { MODAL, TABLE_COLUMNS } from '../../shared/constants/constants';
import type { CountryInfo, Co2Data } from '../../shared/types/types';
import { TableCellTh } from './table-cell-th/table-cell-th';
import { TableCellTd } from './table-cell-td/table-cell-td';
import { Modal } from './modal/modal';
import { Button } from '../button/button';

const DEFAULT_VALUE = 'N/A';

const dataPromise = getData();

function normalizeCountryData(country: string, info: CountryInfo) {
  const latest = info.data?.[info.data.length - 1] ?? {};

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
    TABLE_COLUMNS.map((c) => c.key)
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

  const displayedColumns = selectedColumns.map((key) => {
    const column = TABLE_COLUMNS.find((c) => c.key === key);
    return column ?? { key, label: key };
  });

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
        <Button
          title={MODAL.TITLE}
          onClick={handleOpenModal}
          className="absolute top-0 right-0"
        >
          {MODAL.ADD_BUTTON}
        </Button>
        <table className=" w-full border-collapse rounded-lg shadow-2xl bg-[var(--color-base-100)] text-[var(--color-base-content)] text-base md:text-lg">
          <thead>
            <tr>
              <TableCellTh>№</TableCellTh>
              {displayedColumns.map((column) => (
                <TableCellTh key={column.key}>{column.label}</TableCellTh>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(data).map(([country, info], index) => {
              const row = normalizeCountryData(country, info);

              return (
                <tr key={country} className="hover:bg-[var(--color-base-200)]">
                  <TableCellTd>{index + 1}</TableCellTd>
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
