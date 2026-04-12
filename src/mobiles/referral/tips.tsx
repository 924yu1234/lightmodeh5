import React from 'react';
import styled from 'styled-components';

import ReferralBannerM from 'src/components/Icons/referralBannerM';
import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';

export default function ReferralTips() {
  const intl = useIntl();
  const theme = useThemeParams();
  return (
    <StyledReferralTips className="referral-empty">
      <div className="app-visual">
        <div className="app-glow-core"></div>
        <div className="app-cyber-grid"></div>
      </div>
      <ReferralBannerM size={theme.viewWidth} />
      <div className="referral-empty-desc-container">
        <div className="referral-empty-desc">
          {intl.Referral_Program_Desc_V2}
        </div>
        <div className="referral-empty-desc-text2">
          {intl.Referral_Program_Desc_V2_text2}
        </div>
      </div>
    </StyledReferralTips>
  );
}

const StyledReferralTips = styled.div`
  width: 100%;
  max-width: 1048px;
  margin-top: 8px;
  text-align: left;
  position: relative;
  padding: 0 16px;

  .app-visual {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 55%;
    background: radial-gradient(
      circle at 50% 20%,
      rgba(0, 160, 255, 0.4) 0%,
      #06060d 70%
    );
    z-index: 0;
    overflow: hidden;
  }
  .app-glow-core {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    aspect-ratio: 1;
    background: radial-gradient(
      circle,
      rgba(93, 0, 255, 0.4) 0%,
      transparent 60%
    );
    filter: blur(40px);
    z-index: 1;
  }
  .app-cyber-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    mask-image: radial-gradient(circle at 50% 30%, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(
      circle at 50% 30%,
      black 20%,
      transparent 80%
    );
  }

  padding-top: ${({ theme }: { theme: ThemeType }) =>
    (theme.viewWidth / 370) * 240}px;

  .icon-referral-banner-m {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .banner-img {
    width: 100%;
  }

  .referral-empty-desc-container {
    position: relative;
    margin-top: 30px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    padding: 40px 20px 20px;

    background-image: linear-gradient(
      180deg,
      rgba(0, 160, 255, 0.15) 0%,
      rgba(0, 160, 255, 0) 100%
    );
    border-radius: 10px;
  }
  .referral-empty-desc-text2 {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_40};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 15px;
  }
`;
