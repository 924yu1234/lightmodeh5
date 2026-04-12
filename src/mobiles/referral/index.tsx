import React from 'react';
import styled from 'styled-components';

import TableContent from 'src/apps/referral/views/records';
import Spin from 'src/components/Spin';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import ReferralSummary from './summary';
import ReferralTips from './tips';

export default function MobileReferral() {
  const intl = useIntl();
  const { hasAccessToken, ownerReferralCode, loading } = useDexAccount();
  const hasReferralAccess = !!hasAccessToken && !!ownerReferralCode;
  const showH5Header = useShowH5Header();

  return (
    <StyledMobileReferral>
      {showH5Header && (
        <Header
          title={intl.DeGate_Referral_Program}
          backUrl="/account/balance"
        />
      )}
      <div className="page-inner">
        <Spin spinning={loading}>
          {hasReferralAccess ? (
            <div className="referral-inner">
              <div className="referral-content">
                <ReferralSummary />
                <TableContent />
              </div>
            </div>
          ) : (
            <ReferralTips />
          )}
        </Spin>
      </div>
    </StyledMobileReferral>
  );
}

const StyledMobileReferral = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  min-height: 100%;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  overflow-x: hidden;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding-top: ${({ theme }: { theme: ThemeType }) => {
      return !theme.showH5Header ? 0 : 52;
    }}px;
  }

  .referral-inner {
    width: 100%;
    padding: 10px 16px 24px;
  }

  .referral-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .referral-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    margin: 8px 0 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }

  .section-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 15px;
  }
`;
