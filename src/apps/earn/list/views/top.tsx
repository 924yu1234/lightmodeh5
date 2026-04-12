import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import ClaimableRewardsUsd from 'src/components/Earn/claimableRewardsUsd';
import TotalDepositUsd from 'src/components/Earn/totalDepositUsd';
import PrivateClientDeskEntry from 'src/components/PrivateClientDesk/floatingEntry';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

export default function Portfolio() {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const dexAccount = useDexAccount();
  const hasAccessToken = dexAccount.hasAccessToken;
  return (
    <StyledPortfolio>
      <div className="top-title">{intl.Portfolio}</div>
      <div className="top-content">
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
        {!!hasAccessToken && (
          <PrimaryBtn
            eventName="btn_to_claim_page"
            onClick={() => navigate('/simple-earn/rewards')}
          >
            {intl.Claim}
          </PrimaryBtn>
        )}
      </div>
      <PrivateClientDeskEntry />
    </StyledPortfolio>
  );
}

const StyledPortfolio = styled.div`
  border: 1px solid ${({ theme }) => theme.border_b7b_30};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  padding: 32px 30px;
  margin-bottom: 35px;
  position: relative;
  .private-client-desk-entry {
    position: absolute;
    right: 20px;
    top: 15px;
    height: 46px;
    z-index: 30;
  }
  .top-title {
    font-size: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 25px;
  }
  .top-content {
    display: flex;
    align-items: flex-end;
    .top-item {
      margin-right: 90px;
      .top-item-title {
        font-size: 14px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
        line-height: 24px;
        margin-bottom: 5px;
      }
      .top-item-value {
        font-size: 24px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        line-height: 24px;
      }
    }
  }
  .dg-primary.mantine-Button-root {
    height: 30px;
    min-height: 30px;
    min-width: 100px;
    font-size: 14px;
  }
`;
