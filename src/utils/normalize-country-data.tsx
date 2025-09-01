import type { CountryInfo } from './../shared/types/types';
import { TABLE_UTILS } from '../shared/constants/constants';

export function normalizeCountryData(country: string, info: CountryInfo) {
  const latest =
    info.data?.[info.data.length - TABLE_UTILS.LAST_ELEMENT_OFFSET] ?? {};

  return {
    name: country,
    iso: info.iso_code ?? TABLE_UTILS.DEFAULT_VALUE,
    data: info.data ?? [],
    population: latest.population ?? TABLE_UTILS.DEFAULT_VALUE,
    co2: latest.cement_co2 ?? TABLE_UTILS.DEFAULT_VALUE,
    co2PerCapita: latest.cement_co2_per_capita ?? TABLE_UTILS.DEFAULT_VALUE,
    year: latest.year ?? TABLE_UTILS.DEFAULT_VALUE,
  };
}
