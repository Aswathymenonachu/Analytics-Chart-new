import React from 'react';
import { Heading } from '../../atoms/Heading/Heading';

interface LayoutProps {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
}

export const AnalyticsDashboardLayout: React.FC<LayoutProps> = ({
  sidebar,
  mainContent,
}) => (
  <div style={{ padding: 24 }}>
    <header style={{ marginBottom: 24 }}>
      <Heading level={2}>MAGNiTT Analytics – VC Funding Comparison</Heading>
    </header>

    <div style={{ display: 'flex', gap: 24 }}>
      <aside style={{ width: 260 }}>{sidebar}</aside>
      <section style={{ flex: 1 }}>{mainContent}</section>
    </div>
  </div>
);
