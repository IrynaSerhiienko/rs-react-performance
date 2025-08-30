export const ROUTES = {
  HOME: '/',
  INFO: '/info',
  Error404Page: '*',
} as const;

export const ROUTE_LABELS = {
  HOME: 'Home',
  INFO: 'Info',
} as const;

export const ERROR404 = {
  TIMEOUT_MS: 5000,
  TITLE: '404 - Page not found',
  REDIRECT_MESSAGE:
    'You will be automatically redirected to the Home Page in 5 seconds.',
  LINK_TEXT: 'go to Home Page now',
} as const;

export const HOME_PAGE = {
  TITLE: 'CO2 emissions data by countries',
} as const;

export const INFO_PAGE = {
  TITLE: 'More detailed information is available via the link below',
  LINK: 'https://github.com/owid/co2-data',
  LABEL: 'Link',
} as const;

export const SPINNER = {
  TITLE: 'Loading...',
} as const;

export const TABLE_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'iso', label: 'ISO Code' },
  { key: 'year', label: 'Year' },
  { key: 'population', label: 'Population' },
  { key: 'co2', label: 'CO2' },
  { key: 'co2PerCapita', label: 'CO2 per capita' },
] as const;

export const KEY_CODES = {
  ESCAPE: 'Escape',
} as const;

export const AVAILABLE_COLUMNS = [
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
] as const;

export const MODAL = {
  CLOSE_BUTTON: 'Close',
  ADD_BUTTON: '+',

  TITLE: 'Add columns',
  DESCRIPTION: 'Select which columns to add:',
  COLUMNS: AVAILABLE_COLUMNS,
} as const;

export const TITLE_LEVELS = {
  H1: 1,
  H2: 2,
  H3: 3,
} as const;
