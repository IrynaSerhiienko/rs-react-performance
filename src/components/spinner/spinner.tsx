import { Loader2 } from 'lucide-react';
import { SPINNER } from '../../shared/constants/constants';

export function Spinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="animate-spin text-[var(--color-primary-content)]" />
      <span className="text-[var(--color-primary-content)] text-sm md:text-base">
        {SPINNER.TITLE}
      </span>
    </div>
  );
}
