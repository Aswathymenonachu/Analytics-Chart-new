import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <div style={{ padding: 16, border: '1px solid #ccc', borderRadius: 6 }}>
    {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
    {children}
  </div>
);
