import { getData } from '../../shared/api/getData';
import { use } from 'react';
import { Spinner } from '../spinner/spinner';
import { TABLE_COLUMNS } from '../../shared/constants/constants';
import type { CountryInfo, Co2Data } from '../../shared/types/types';
import { TableCellTh } from './table-cell-th/table-cell-th';
import { TableCellTd } from './table-cell-td/table-cell-td';

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
  const data = use(dataPromise) as Co2Data;

  if (!data) {
    return <Spinner />;
  }

  return (
    <table className="w-full border-collapse rounded-lg shadow-2xl bg-[var(--color-base-100)] text-[var(--color-base-content)] text-base md:text-lg">
      <thead>
        <tr>
          {TABLE_COLUMNS.map((column) => (
            <TableCellTh key={column.key}>{column.label}</TableCellTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([country, info]) => {
          const row = normalizeCountryData(country, info);

          return (
            <tr key={country} className="hover:bg-[var(--color-base-200)]">
              {TABLE_COLUMNS.map((column) => (
                <TableCellTd key={column.key}>
                  {row[column.key as keyof typeof row]}
                </TableCellTd>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
