import React from 'react';
import { clsx } from 'clsx';
import { TITLE_LEVELS } from '../../shared/constants/constants';
import type { TitleLevel } from '../../shared/types/types';

type TitleProps = {
  level?: TitleLevel;
  className?: string;
  children: React.ReactNode;
};

export function Title(props: TitleProps) {
  const { level, className = '', children } = props;
  const baseClass =
    'flex justify-center font-bold text-[var(--color-primary-content)]';

  switch (level) {
    case TITLE_LEVELS.H1:
      return (
        <h1 className={clsx('text-xl md:text-2xl', baseClass, className)}>
          {children}
        </h1>
      );
    case TITLE_LEVELS.H2:
      return (
        <h2 className={clsx('text-lg md:text-xl', baseClass, className)}>
          {children}
        </h2>
      );
    case TITLE_LEVELS.H3:
      return (
        <h3 className={clsx('text-base md:text-lg', baseClass, className)}>
          {children}
        </h3>
      );
    default:
      return (
        <h1 className={clsx('text-xl md:text-2xl', baseClass, className)}>
          {children}
        </h1>
      );
  }
}
