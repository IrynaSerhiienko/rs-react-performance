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

## Performance Profiling & Memoization

### Initial Profiling

Before applying memoization, the application was profiled using the **React DevTools Profiler**. Key metrics included:

- **Commit Duration** – time taken for React to apply updates after user actions (e.g., selecting a year, filtering countries)
- **Render Duration** – time taken by individual components to render
- **Interactions** – user actions that triggered renders
- **Flame Graph & Ranked Chart** – visual representation of component render times

At this stage, unnecessary re-renders were observed in table rows, filters, and column selection components.

### Optimization with `React.memo`, `useMemo`, and `useCallback`

- `React.memo` was applied to **pure functional components** that depend only on props, e.g., `TableCellTd`, `TableCellTh`, `Filters`, `NameFilter`, `CountryFilter`, `YearFilter`.
- `useMemo` was used to **memoize expensive calculations** such as:
  - Normalizing country data
  - Filtering and sorting countries based on name, population, and selected year
  - Available years and countries
- `useCallback` was used to **memoize event handlers** for:
  - Filter changes
  - Search input
  - Sorting
  - Column selection

### Results After Optimization

After applying memoization:

- **Reduced Commit Duration** – fewer components re-rendered unnecessarily
- **Shorter Render Duration** – table rows and filters no longer re-render on unrelated state changes
- **Fewer Interactions Triggering Renders** – typing in the search bar or changing the year does not re-render the entire table
- **Improved Flame Graph & Ranked Chart** – components that do not depend on changing props are now flatlined, showing minimal render times

### 🚀 Performance Profiling

#### Tested interactions: Search countries by name

#### 🔍 Before Optimization

![name-filter1](docs/screenshots/image-18.png)
![name-filter2](docs/screenshots/image-19.png)
![name-filter3](docs/screenshots/image-20.png)

#### 🔍 After Optimization

![name-filter1_memo.png](docs/screenshots/image.png)
![name-filter2_memo.png](docs/screenshots/image-1.png)
![name-filter3_memo](docs/screenshots/image-2.png)
![name-filter4_memo](docs/screenshots/image-3.png)

#### 📌 Comparison table

| Metric                       | Before | After  | Change        |
| ---------------------------- | ------ | ------ | ------------- |
| **Commit Duration**          | 4.5s   | 6.8s   | ↓ regression  |
| **Max Render Time**          | 50.7ms | 14.2ms | ↑ improvement |
| **Most Expensive Component** | 16.6ms | 9.7ms  | ↑ improvement |
| **Number of Re-renders**     | 3      | 2      | ↑ improvement |

#### Tested interactions: Year selector

#### 🔍 Before Optimization

![year-filter1](docs/screenshots/image-21.png)
![year-filter2](docs/screenshots/image-22.png)

#### 🔍 After Optimization

![year-filter1](docs/screenshots/image-4.png)
![year-filter2](docs/screenshots/image-5.png)

#### 📌 Comparison table

| Metric                       | Before  | After   | Change        |
| ---------------------------- | ------- | ------- | ------------- |
| **Commit Duration**          | 3.5s    | 7.3s    | ↓ regression  |
| **Max Render Time**          | 370.4ms | 281.2ms | ↑ improvement |
| **Most Expensive Component** | 147.7ms | 143.1ms | ↑ improvement |
| **Number of Re-renders**     | 2       | 1       | ↑ improvement |

#### Tested interactions: Filter countries

#### 🔍 Before Optimization

![country-filter1](docs/screenshots/image-23.png)
![country-filter2](docs/screenshots/image-24.png)

#### 🔍 After Optimization

![country-filter1](docs/screenshots/image-6.png)
![country-filter2](docs/screenshots/image-7.png)

#### 📌 Comparison table

| Metric                       | Before | After  | Change        |
| ---------------------------- | ------ | ------ | ------------- |
| **Commit Duration**          | 3.1s   | 2.6s   | ↑ improvement |
| **Max Render Time**          | 55.1ms | 33.6ms | ↑ improvement |
| **Most Expensive Component** | 17.8ms | -      | -             |
| **Number of Re-renders**     | 2      | 1      | ↑ improvement |

#### Tested interactions: Sort countries by name

#### 🔍 Before Optimization

![sort-by-name1](docs/screenshots/image-25.png)
![sort-by-name2](docs/screenshots/image-26.png)

#### 🔍 After Optimization

![sort-by-name1](docs/screenshots/image-8.png)
![sort-by-name2](docs/screenshots/image-9.png)

#### 📌 Comparison table

| Metric                       | Before  | After   | Change        |
| ---------------------------- | ------- | ------- | ------------- |
| **Commit Duration**          | 1.9s    | 1.3s    | ↑ improvement |
| **Max Render Time**          | 315.2ms | 173.1ms | ↑ improvement |
| **Most Expensive Component** | 133.5ms | 130.5ms | ↑ improvement |
| **Number of Re-renders**     | 1       | 1       | not changed   |

#### Tested interactions: Sort countries by population

#### 🔍 Before Optimization

![sort-by-population1](docs/screenshots/image-27.png)
![sort-by-population2](docs/screenshots/image-28.png)

#### 🔍 After Optimization

![sort-by-population1](docs/screenshots/image-10.png)
![sort-by-population2](docs/screenshots/image-11.png)

#### 📌 Comparison table

| Metric                       | Before  | After   | Change        |
| ---------------------------- | ------- | ------- | ------------- |
| **Commit Duration**          | 1.9s    | 3.3s    | ↓ regression  |
| **Max Render Time**          | 322.2ms | 171.9ms | ↑ improvement |
| **Most Expensive Component** | 131.3ms | 137.8ms | ↓ regression  |
| **Number of Re-renders**     | 1       | 1       | not changed   |

#### Tested interactions: Select additional columns

#### 🔍 Before Optimization

![add-columns1](docs/screenshots/image-29.png)
![add-columns2](docs/screenshots/image-30.png)

#### 🔍 After Optimization

![add-columns1](docs/screenshots/image-12.png)
![add-columns2](docs/screenshots/image-13.png)
![add-columns3](docs/screenshots/image-14.png)
![add-columns4](docs/screenshots/image-15.png)
![add-columns5](docs/screenshots/image-16.png)
![add-columns6](docs/screenshots/image-17.png)

#### 📌 Comparison table

| Metric                       | Before  | After   | Change        |
| ---------------------------- | ------- | ------- | ------------- |
| **Commit Duration**          | 4.9s    | 4.2s    | ↑ improvement |
| **Max Render Time**          | 355.4ms | 202.9ms | ↑ improvement |
| **Most Expensive Component** | 156ms   | 154.1ms | ↑ improvement |
| **Number of Re-renders**     | 3       | 3       | not changed   |
