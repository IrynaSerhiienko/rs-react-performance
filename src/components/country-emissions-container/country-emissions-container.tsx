import { use, useState, useMemo } from 'react';
import { getData } from '../../shared/api/getData';
import { Spinner } from '../spinner/spinner';
import { Filters } from './filters/filters';
import { CountryEmissionsTable } from './country-emissions-table/country-emissions-table';
import type { Co2Data } from '../../shared/types/types';
import { getAvailableYears } from '../../utils/get-years';

const dataPromise = getData();

export function CountryEmissionsContainer() {
  const [searchName, setSearchName] = useState('');
  const [selectedYear, setSelectedYear] = useState('latest');
  const [selectedCountry, setSelectedCountry] = useState('');
  const data = use(dataPromise) as Co2Data;

  const availableYears = useMemo(() => {
    return data ? getAvailableYears(data) : [];
  }, [data]);

  const availableCountries = useMemo(
    () => (data ? Object.keys(data).sort() : []),
    [data]
  );

  if (!data) return <Spinner />;

  return (
    <>
      <Filters
        searchName={searchName}
        onSearchNameChange={setSearchName}
        selectedYear={selectedYear}
        availableYears={availableYears}
        onYearChange={setSelectedYear}
        selectedCountry={selectedCountry}
        availableCountries={availableCountries}
        onCountryChange={setSelectedCountry}
      />
      <CountryEmissionsTable
        data={data}
        searchName={searchName}
        selectedYear={selectedYear}
        selectedCountry={selectedCountry}
      />
    </>
  );
}
