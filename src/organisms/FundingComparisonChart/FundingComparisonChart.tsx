import React, { useMemo } from 'react';
import { Card } from '../../atoms/Card/Card';
import {
  CountryCode,
  CountryFundingMap,
  YearlyMergedFundingRecord,
} from '../../types/country-analytics.types';

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface FundingComparisonChartProps {
  selectedCountries: CountryCode[];
  fundingDataByCountry: CountryFundingMap;
  isLoading: boolean;
}

const COUNTRY_COLORS: Record<CountryCode, string> = {
  KSA: '#8884d8',
  UAE: '#82ca9d',
  SINGAPORE: '#ffc658',
};

const MILLION = 1_000_000;

function mergeFundingData(
  fundingDataByCountry: CountryFundingMap
): YearlyMergedFundingRecord[] {
  const yearMap: Record<number, YearlyMergedFundingRecord> = {};

  Object.entries(fundingDataByCountry).forEach(([code, series]) => {
    if (!series) return;
    const country = code as CountryCode;

    series.forEach((r) => {
      if (!yearMap[r.year]) yearMap[r.year] = { year: r.year };
      yearMap[r.year][`${country}_num_of_deals`] = r.num_of_deals;
      yearMap[r.year][`${country}_total_amount_raised`] =
        r.total_amount_raised;
    });
  });

  return Object.values(yearMap).sort((a, b) => a.year - b.year);
}

export const FundingComparisonChart: React.FC<FundingComparisonChartProps> = ({
  selectedCountries,
  fundingDataByCountry,
  isLoading,
}) => {
  const chartData = useMemo(
    () => mergeFundingData(fundingDataByCountry),
    [fundingDataByCountry]
  );

  return (
    <Card title="VC Funding – Deals & Amount Raised">
      {isLoading && <div>Loading funding data…</div>}

      {!isLoading && selectedCountries.length === 0 && (
        <div>Please select at least one country.</div>
      )}

      {!isLoading && selectedCountries.length > 0 && (
        <>
          <ResponsiveContainer width="100%" height={420}>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                yAxisId="left"
                label={{
                  value: 'Number of Deals',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(v: number) => `${(v / MILLION).toFixed(0)}M`}
                label={{
                  value: 'Total Amount Raised (USD)',
                  angle: 90,
                  position: 'insideRight',
                  dx: 40,
                  dy:60
                }}
              />

              <Tooltip
                formatter={(value, name) => {
                  const label = String(name).replace(/_/g, ' ');
                  return [value as string | number, label];
                }}
              />
              <Legend />

              {selectedCountries.map((country) => (
                <Bar
                  key={`${country}-bar`}
                  yAxisId="left"
                  dataKey={`${country}_num_of_deals`}
                  name={`${country} – Deals`}
                  fill={COUNTRY_COLORS[country]}
                  barSize={20}
                />
              ))}

              {selectedCountries.map((country) => (
                <Line
                  key={`${country}-line`}
                  yAxisId="right"
                  type="monotone"
                  dataKey={`${country}_total_amount_raised`}
                  name={`${country} – Amount Raised`}
                  stroke={COUNTRY_COLORS[country]}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>

          <div style={{ marginTop: 16, fontSize: 13 }}>
            <strong>Legend</strong>
            <ul>
              <li>Bars: total number of deals per year per country.</li>
              <li>Lines: total amount raised (USD) per year per country.</li>
            </ul>
          </div>
        </>
      )}
    </Card>
  );
};
