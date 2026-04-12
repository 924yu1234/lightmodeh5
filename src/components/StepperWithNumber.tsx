import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function StepperWithNumber({
  size = 36,
  children,
  active = false,
}: {
  size?: number;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <StyledLoader active={active} size={size} className="step-number">
      {children}
    </StyledLoader>
  );
}

const StyledLoader = styled.div<{ size: number; active: boolean }>`
  position: relative;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  color: ${({ theme }) => theme.t_000};
  background: ${({ theme }: { theme: ThemeType }) => theme.blue}${({ active }: { active: boolean }) => (active ? '' : '80')};
  width: ${({ size }: { size: number }) => size}px;
  line-height: ${({ size }: { size: number }) => size - 2}px;
  text-align: center;
  font-size: ${({ size }: { size: number }) => size * 0.55}px;
  border-radius: 50%;
`;
