import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function TurboRangeTag() {
  const intl = useIntl();
  return (
    <StyledTurboRangeTag className="turbo-range-tag">
      {intl.turboRange.Turbo_Range}
    </StyledTurboRangeTag>
  );
}

const StyledTurboRangeTag = styled.div`
  background: ${({ theme }) => theme.bg_b7b_10};
  border-radius: 15px;
  height: 26px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  font-size: 12px;
  line-height: 20px;
`;
