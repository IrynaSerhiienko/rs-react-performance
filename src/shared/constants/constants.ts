export const ROUTES = {
  HOME: '/',
  Error404Page: '*',
} as const;

export const ROUTE_LABELS = {
  HOME: 'Home',
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
