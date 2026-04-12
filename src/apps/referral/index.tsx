import React from 'react';
import { useTheme } from 'styled-components';

import Spin from 'src/components/Spin';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import { StyledReferral } from './style';
import TableContent from './views/records';
import ReferralSummary from './views/summary';
import ReferralTips from './views/tips';

export default function Referral() {
  const intl = useIntl();
  const theme = useTheme() as ThemeType;
  const { hasAccessToken, ownerReferralCode, loading } = useDexAccount();
  const hasReferralAccess = !!hasAccessToken && !!ownerReferralCode;

  return (
    <StyledReferral>
      {theme.isMobile && (
        <Header
          title={intl.DeGate_Referral_Program}
          backUrl="/account/balance"
        />
      )}
      <Spin spinning={loading}>
        <div className="referral-inner">
          <div className="referral-content">
            <div className="referral-title">{intl.DeGate_Referral_Program}</div>
            {hasReferralAccess ? (
              <>
                <ReferralSummary />
                <TableContent />
              </>
            ) : (
              <ReferralTips />
            )}
          </div>
        </div>
      </Spin>
    </StyledReferral>
  );
}
