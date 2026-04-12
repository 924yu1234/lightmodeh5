import React from 'react';
import styled from 'styled-components';

import ReferralBanner from 'src/components/Icons/referralBanner';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function ReferralTips() {
  const intl = useIntl();
  return (
    <StyledReferralTips className="referral-empty banner-bg">
      <div className="referral-empty-left">
        <div className="referral-empty-desc">
          {intl.Referral_Program_Desc_V2}
        </div>
        <div className="referral-empty-desc-text2">
          {intl.Referral_Program_Desc_V2_text2}
        </div>
      </div>
      <ReferralBanner size={430} />
    </StyledReferralTips>
  );
}

const StyledReferralTips = styled.div`
  width: 100%;
  padding: 30px;
  width: 100%;
  height: 175px;
  overflow: hidden;
  display: flex;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  border: 1px solid rgba(183, 189, 198, 0.15);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  position: relative;

  .icon-referral-banner {
    margin-left: auto;
    position: relative;
    top: -80px;
  }

  .referral-empty-desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 32px;
    max-width: 420px;
    white-space: pre-line;
  }
  .referral-empty-desc-text2 {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_40};
    font-size: 16px;
    line-height: 32px;
    margin-top: 10px;
    text-align: left;
  }
`;
