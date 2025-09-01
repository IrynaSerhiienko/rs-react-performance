import { Suspense } from 'react';
import { HOME_PAGE, TITLE_LEVELS } from '../../shared/constants/constants';
import { Spinner } from '../../components/spinner/spinner';

import { Title } from '../../components/title/title';
import { CountryEmissionsContainer } from '../../components/country-emissions-container/country-emissions-container';

export function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <Title level={TITLE_LEVELS.H1}>{HOME_PAGE.TITLE}</Title>
      <Suspense fallback={<Spinner />}>
        <CountryEmissionsContainer />
      </Suspense>
    </div>
  );
}
