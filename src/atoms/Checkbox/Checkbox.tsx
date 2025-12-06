import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
}) => (
  <label style={{ display: 'block', marginBottom: 6 }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <span style={{ marginLeft: 8 }}>{label}</span>
  </label>
);
