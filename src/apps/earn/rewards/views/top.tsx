import React from 'react';
import styled from 'styled-components';

import ClaimableRewardsUsd from 'src/components/Earn/claimableRewardsUsd';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Portfolio() {
  const intl = useIntl();
  return (
    <StyledPortfolio>
      <div className="top-title">{intl.Claimable_Rewards}</div>
      <div className="top-value">
        <ClaimableRewardsUsd />
      </div>
    </StyledPortfolio>
  );
}

const StyledPortfolio = styled.div`
  border: 1px solid ${({ theme }) => theme.border_b7b_30};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  padding: 32px 30px;
  margin-bottom: 35px;
  .top-title {
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 24px;
    margin-bottom: 5px;
  }
  .top-value {
    font-size: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 26px;
  }
`;
