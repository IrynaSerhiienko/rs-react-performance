import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-2 py-1 bg-[var(--color-base-200)] text-[var(--color-primary-content)] rounded border-2  hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-200)] transition-all duration-500 cursor-pointer font-semibold text-xl',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
