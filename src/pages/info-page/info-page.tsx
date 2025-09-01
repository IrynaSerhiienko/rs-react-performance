import { INFO_PAGE, TITLE_LEVELS } from '../../shared/constants/constants';

import { Title } from '../../components/title/title';

export function InfoPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Title level={TITLE_LEVELS.H1}>{INFO_PAGE.TITLE}</Title>
      <Title level={TITLE_LEVELS.H2}>
        {' '}
        <a
          href={INFO_PAGE.LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {INFO_PAGE.LABEL}
        </a>
      </Title>
    </div>
  );
}
