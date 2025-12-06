import React, { useEffect, useState } from 'react';
import {
  CountryCode,
  CountryFundingMap,
} from '../../types/country-analytics.types';
import { fetchCountryFundingData } from '../../services/funding-data.service';
import { AnalyticsDashboardLayout } from '../../templates/AnalyticsDashboardLayout/AnalyticsDashboardLayout';
import { CountrySelector } from '../../molecules/CountrySelector/CountrySelector';
import { FundingComparisonChart } from '../../organisms/FundingComparisonChart/FundingComparisonChart';

const DEFAULT_COUNTRIES: CountryCode[] = ['KSA'];

export const FundingAnalyticsPage: React.FC = () => {
  const [selectedCountries, setSelectedCountries] =
    useState<CountryCode[]>(DEFAULT_COUNTRIES);
  const [fundingDataByCountry, setFundingDataByCountry] =
    useState<CountryFundingMap>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setIsLoading(true);

      const updated: CountryFundingMap = { ...fundingDataByCountry };
      for (const country of selectedCountries) {
        if (!updated[country]) {
          const series = await fetchCountryFundingData(country);
          if (!cancelled) {
            updated[country] = series;
          }
        }
      }

      if (!cancelled) {
        setFundingDataByCountry(updated);
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries]);

  return (
    <AnalyticsDashboardLayout
      sidebar={
        <CountrySelector
          selectedCountries={selectedCountries}
          onSelectedCountriesChange={setSelectedCountries}
        />
      }
      mainContent={
        <FundingComparisonChart
          selectedCountries={selectedCountries}
          fundingDataByCountry={fundingDataByCountry}
          isLoading={isLoading}
        />
      }
    />
  );
};
