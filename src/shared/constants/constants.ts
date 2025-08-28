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
  TITLE: 'Home Page',
} as const;
