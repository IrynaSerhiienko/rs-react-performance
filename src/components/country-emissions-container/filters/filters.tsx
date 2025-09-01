import { memo } from 'react';

import { NameFilter } from './name-filter/name-filter';
import { YearFilter } from './year-filter/year-filter';
import { CountryFilter } from './country-filter/country-filter';

type FiltersProps = {
  searchName: string;
  onSearchNameChange: (value: string) => void;

  selectedYear: string;
  availableYears: string[];
  onYearChange: (value: string) => void;

  selectedCountry: string;
  availableCountries: string[];
  onCountryChange: (value: string) => void;
};

export const Filters = memo(function Filters({
  onSearchNameChange,
  searchName,
  selectedYear,
  onYearChange,
  availableYears,
  selectedCountry,
  availableCountries,
  onCountryChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <NameFilter value={searchName} onChange={onSearchNameChange} />
      <YearFilter
        value={selectedYear}
        values={availableYears}
        onChange={onYearChange}
      />
      <CountryFilter
        value={selectedCountry}
        values={availableCountries}
        onChange={onCountryChange}
      />
    </div>
  );
});
