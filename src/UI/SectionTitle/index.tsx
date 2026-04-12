import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export interface UISectionTitleProps {
  title: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .title-left {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 22px;
  }
`;

export default function UISectionTitle({
  title,
  right,
  className,
}: UISectionTitleProps) {
  return (
    <StyledTitle className={className}>
      <div className="title-left">{title}</div>
      {right}
    </StyledTitle>
  );
}
