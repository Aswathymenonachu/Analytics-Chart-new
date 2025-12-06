import React, { ReactNode } from 'react';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level = 2, children }) => {
  switch (level) {
    case 1: return <h1 style={{ margin: 0 }}>{children}</h1>;
    case 2: return <h2 style={{ margin: 0 }}>{children}</h2>;
    case 3: return <h3 style={{ margin: 0 }}>{children}</h3>;
    case 4: return <h4 style={{ margin: 0 }}>{children}</h4>;
    case 5: return <h5 style={{ margin: 0 }}>{children}</h5>;
    case 6: return <h6 style={{ margin: 0 }}>{children}</h6>;
    default: return <h2 style={{ margin: 0 }}>{children}</h2>;
  }
};
