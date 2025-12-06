import React from 'react';
import { CountryCode } from '../../types/country-analytics.types';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Heading } from '../../atoms/Heading/Heading';

interface CountrySelectorProps {
  selectedCountries: CountryCode[];
  onSelectedCountriesChange: (codes: CountryCode[]) => void;
}

const COUNTRY_OPTIONS: CountryCode[] = ['KSA', 'UAE', 'SINGAPORE'];

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountries,
  onSelectedCountriesChange,
}) => {
  const toggleCountry = (country: CountryCode, checked: boolean) => {
    if (checked) {
      // Add country
      if (!selectedCountries.includes(country)) {
        onSelectedCountriesChange([...selectedCountries, country]);
      }
    } else {
      // Remove country
      onSelectedCountriesChange(
        selectedCountries.filter((c) => c !== country)
      );
    }
  };

  return (
    <div>
      <Heading level={3}>Countries</Heading>

      {COUNTRY_OPTIONS.map((country) => (
        <Checkbox
          key={country}
          label={country}
          checked={selectedCountries.includes(country)}
          onChange={(checked) => toggleCountry(country, checked)}
        />
      ))}

      <small style={{ marginTop: 10, display: 'block', fontSize: 12 }}>
        Select 1–3 countries to compare.
      </small>
    </div>
  );
};
