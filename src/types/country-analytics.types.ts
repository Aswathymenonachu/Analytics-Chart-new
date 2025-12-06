export type CountryCode = 'KSA' | 'UAE' | 'SINGAPORE';

export interface AnnualFundingRecord {
  year: number;
  num_of_deals: number;
  total_amount_raised: number;
  num_of_regular_deals: number;
  total_amount_raised_regular_deals: number;
  num_of_mega_deals: number;
  total_amount_raised_mega_deals: number;
}

export type CountryFundingSeries = AnnualFundingRecord[];

// country → series
export type CountryFundingMap = Partial<Record<CountryCode, CountryFundingSeries>>;

// merged per year for Recharts
export interface YearlyMergedFundingRecord {
  year: number;
  [key: string]: string | number;
}
