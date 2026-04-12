import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export interface UISectionCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const StyledCard = styled.div<{ $padding: string }>`
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_10};
  border-radius: 8px;
  padding: ${({ $padding }: { $padding: string }) => $padding};
`;

export default function UISectionCard({
  children,
  className,
  padding = '12px',
}: UISectionCardProps) {
  return (
    <StyledCard className={className} $padding={padding}>
      {children}
    </StyledCard>
  );
}
