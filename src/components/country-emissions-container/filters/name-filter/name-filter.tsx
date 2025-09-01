import { useState, useEffect, memo } from 'react';
import { FILTERS, KEY_CODES } from '../../../../shared/constants/constants';
import { Button } from '../../../button/button';

type NameFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export const NameFilter = memo(function NameFilter({
  value,
  onChange,
}: NameFilterProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onChange(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_CODES.ENTER) {
      handleSearchClick();
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="flex flex-col gap-1 max-w-xs">
      <label
        htmlFor={FILTERS.LABEL_COUNTRY}
        className="text-[var(--color-base-content)] font-semibold"
      >
        {FILTERS.LABEL_COUNTRY_NAME}
      </label>
      <div className="w-full flex gap-2">
        <div className="relative w-full">
          <input
            id={FILTERS.LABEL_COUNTRY}
            type="text"
            placeholder={FILTERS.PLACEHOLDER_SEARCH}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-2 border rounded
              border-[var(--color-base-300)] bg-[var(--color-base-100)] 
              text-[var(--color-base-content)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            autoComplete="on"
          />

          {inputValue && (
            <Button
              unstyled
              onClick={handleClear}
              title={FILTERS.CLEAR_BUTTON_TITLE}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer select-none text-[var(--color-base-content)]"
            >
              {FILTERS.CLEAR_BUTTON}
            </Button>
          )}
        </div>

        <Button onClick={handleSearchClick}>{FILTERS.SEARCH_BUTTON}</Button>
      </div>
    </div>
  );
});
