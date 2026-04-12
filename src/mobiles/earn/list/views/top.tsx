import React from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import ClaimableRewardsUsd from 'src/components/Earn/claimableRewardsUsd';
import TotalDepositUsd from 'src/components/Earn/totalDepositUsd';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Portfolio() {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  return (
    <StyledPortfolio>
      <div className="top-title">{intl.Portfolio}</div>
      <div className="top-item">
        <div className="top-item-title">{intl.Total_Deposits}</div>
        <div className="top-item-value">
          <TotalDepositUsd />
        </div>
      </div>
      <div className="top-item">
        <div className="top-item-title">{intl.Claimable_Rewards}</div>
        <div className="top-item-value">
          <ClaimableRewardsUsd />
        </div>
      </div>
      <div className="top-btns">
        <GhostBtn
          eventName="btn_earn_history"
          onClick={() => navigate('/account/history/simple-earn')}
        >
          {intl.history}
        </GhostBtn>
        <PrimaryBtn
          eventName="btn_to_claim_page"
          onClick={() => navigate('/simple-earn/rewards')}
        >
          {intl.Claim}
        </PrimaryBtn>
      </div>
    </StyledPortfolio>
  );
}

const StyledPortfolio = styled.div`
  padding: 10px 20px 20px;
  .top-title {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .top-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .top-item-title {
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      line-height: 20px;
    }
    .top-item-value {
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
      line-height: 20px;
    }
  }
  .top-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
    .dg-ghost {
      height: 46px;
      min-width: 100px;
      font-size: 14px;
      flex: 1;
    }
    .dg-primary {
      height: 46px;
      min-width: 100px;
      font-size: 14px;
      flex: 1;
    }
  }
`;
