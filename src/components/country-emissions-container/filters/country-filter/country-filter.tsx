import { memo } from 'react';
import type { ChangeEvent } from 'react';
import { FILTERS } from '../../../../shared/constants/constants';

interface CountryFilterProps {
  value: string;
  values: string[];
  onChange: (value: string) => void;
}

export const CountryFilter = memo(function CountryFilter({
  value,
  values,
  onChange,
}: CountryFilterProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 max-w-xs">
      <label
        htmlFor={FILTERS.COUNTRY_SELECT_ID}
        className="text-[var(--color-base-content)] font-semibold"
      >
        {FILTERS.LABEL_COUNTRY}
      </label>
      <div className="relative w-full flex gap-2">
        <select
          id={FILTERS.COUNTRY_SELECT_ID}
          value={value}
          onChange={handleChange}
          className="w-full px-2 py-2 border rounded
            border-[var(--color-base-300)] bg-[var(--color-base-100)]
            text-[var(--color-base-content)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
            appearance-none"
        >
          <option value="">{FILTERS.ALL_COUNTRIES}</option>
          {values.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
