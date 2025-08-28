import { HOME_PAGE } from '../../shared/constants/constants';

export function HomePage() {
  return (
    <h1 className="text-2xl md:text-4xl font-bold flex justify-center mb-4 text-[var(--color-primary-content)]">
      {HOME_PAGE.TITLE}
    </h1>
  );
}
