import { Suspense } from 'react';
import { HOME_PAGE } from '../../shared/constants/constants';
import { Spinner } from '../../components/spinner/spinner';
import { CountryEmissionsTable } from '../../components/country-emissions-table/country-emissions-table';

export function HomePage() {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold flex justify-center mb-4 text-[var(--color-primary-content)]">
        {HOME_PAGE.TITLE}
      </h1>
      <Suspense fallback={<Spinner />}>
        <CountryEmissionsTable />
      </Suspense>
    </>
  );
}
