# React Performance

## Overview

This application visualizes CO2 emissions data by country, focusing on performance optimization and responsive UI. It loads a large hierarchical JSON file (~100MB) containing yearly data for each country/region.

## Technologies & Key Patterns

- Vite
- TypeScript
- React
- React Portals (modal windows)
- useMemo
- useCallback
- React Suspense
- ESLint (code analysis)
- Prettier (code formatting)
- Husky (git hooks, pre-commit)

## Features

- Fetch and display country data, including name, population (latest year), and ISO code (if available)
- Display a table of yearly data for each country with required columns (year, population, co2, co2_per_capita)
- Modal widget for selecting additional columns to display
- Year selector to change displayed year for all countries, with highlight on updated data
- Searching countries by name using a search bar
- Sorting countries by population (selected year) or name (asc/desc)
- Using useMemo to memoize filtered, searched, sorted countries and selected columns
- Using useCallback to memoize event handlers for filtering, searching, sorting, and column selection
- Using React Suspense for data loading and fallback UI

## Installation & Running

- Clone the repository and navigate into the project directory

```
git clone https://github.com/IrynaSerhiienko/rs-react-performance.git
```

```
cd rs-react-performance
```

- Install dependencies

```
npm install
```

- Run the development server (starts the app in development mode)

```
npm run dev
```

- Build the project for production (creates optimized files in the dist folder)

```
npm run build
```

- Format code with Prettier

```
npm run format
```

- Format code with ESLint

```
npm run lint
```
