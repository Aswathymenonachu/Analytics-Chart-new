import React, { ReactNode } from 'react';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  style,
}) => {
  const tag = `h${level}` as keyof HTMLElementTagNameMap;
  const Tag = tag as any;
  return (
    <Tag
      className={className}
      style={{ margin: 0, ...style }}
    >
      {children}
    </Tag>
  );
};
