import type { ChangeEvent } from 'react';
import { FILTERS } from '../../../../shared/constants/constants';

interface YearFilterProps {
  value: string;
  values: string[];
  onChange: (value: string) => void;
}

export const YearFilter = ({ value, values, onChange }: YearFilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 max-w-xs">
      <label
        htmlFor={FILTERS.YEAR_SELECT_ID}
        className="text-[var(--color-base-content)] font-semibold"
      >
        {FILTERS.LABEL_YEAR}
      </label>
      <div className="relative w-full flex gap-2">
        <select
          id={FILTERS.YEAR_SELECT_ID}
          value={value}
          onChange={handleChange}
          className="w-full px-2 py-2 border rounded
            border-[var(--color-base-300)] bg-[var(--color-base-100)]
            text-[var(--color-base-content)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
            appearance-none"
        >
          <option value="">{FILTERS.ALL_YEARS}</option>
          {values.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
