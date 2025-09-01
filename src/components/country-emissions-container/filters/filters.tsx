import { memo } from 'react';

import { NameFilter } from './name-filter/name-filter';
import { YearFilter } from './year-filter/year-filter';

type FiltersProps = {
  searchName: string;
  onSearchNameChange: (value: string) => void;

  selectedYear: string;
  availableYears: string[];
  onYearChange: (value: string) => void;
};

export const Filters = memo(function Filters({
  onSearchNameChange,
  searchName,
  selectedYear,
  onYearChange,
  availableYears,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <NameFilter value={searchName} onChange={onSearchNameChange} />
      <YearFilter
        value={selectedYear}
        values={availableYears}
        onChange={onYearChange}
      />
    </div>
  );
});
