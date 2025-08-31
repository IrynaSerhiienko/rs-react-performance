import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export function Button({
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'px-2 py-1 bg-[var(--color-base-200)] text-[var(--color-primary-content)] rounded border-2 hover:bg-[var(--color-primary-content)] hover:text-[var(--color-base-200)] transition-all duration-500 cursor-pointer font-semibold text-xl focus:outline-none focus:border-[var(--color-primary-content)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:shadow-lg',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
