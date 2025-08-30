import { Suspense } from 'react';
import { HOME_PAGE, TITLE_LEVELS } from '../../shared/constants/constants';
import { Spinner } from '../../components/spinner/spinner';
import { CountryEmissionsTable } from '../../components/country-emissions-table/country-emissions-table';
import { Title } from '../../components/title/title';

export function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Title level={TITLE_LEVELS.H1}>{HOME_PAGE.TITLE}</Title>
      <Suspense fallback={<Spinner />}>
        <CountryEmissionsTable />
      </Suspense>
    </div>
  );
}
