export type YearData = Record<string, number | string | null | undefined>;

export type CountryInfo = {
  iso_code?: string;
  data?: YearData[];
};

export type Co2Data = Record<string, CountryInfo>;
