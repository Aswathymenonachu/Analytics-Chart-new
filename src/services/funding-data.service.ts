import {
  CountryCode,
  CountryFundingSeries,
} from '../types/country-analytics.types';

import ksaData from '../data/chart-data-ksa.json.json';
import uaeData from '../data/chart-data-uae.json.json';
import singaporeData from '../data/chart-data-singapore.json.json';

const DB: Record<CountryCode, CountryFundingSeries> = {
  KSA: ksaData,
  UAE: uaeData,
  SINGAPORE: singaporeData,
};

const CACHE_KEY = 'funding_cache_v1';
const TTL = 5 * 60 * 1000;

export async function fetchCountryFundingData(
  country: CountryCode
): Promise<CountryFundingSeries> {
  const now = Date.now();
  const cachedRaw = localStorage.getItem(CACHE_KEY);
  let cache = cachedRaw ? JSON.parse(cachedRaw) : { data: {}, ts: {} };

  if (cache.ts[country] && now - cache.ts[country] < TTL) {
    return cache.data[country];
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = DB[country];
      cache.data[country] = data;
      cache.ts[country] = now;
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      resolve(data);
    }, 300);
  });
}
