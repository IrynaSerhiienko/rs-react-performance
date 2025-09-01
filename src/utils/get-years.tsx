import type { Co2Data } from '../shared/types/types';

export function getAvailableYears(data: Co2Data): string[] {
  const yearsSet = new Set<string>();
  Object.values(data).forEach((info) => {
    info.data?.forEach((record) => yearsSet.add(String(record.year)));
  });
  return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
}
