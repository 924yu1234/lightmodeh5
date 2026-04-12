import React, { useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import ReferralBanner from 'src/components/Icons/referralBanner';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import message from 'src/utils/message';

interface LinkCardProps {
  disabled: boolean;
  link: string;
}

export default function LinkCard({ disabled, link }: LinkCardProps) {
  const intl = useIntl();
  const handleCopy = useCallback(() => {
    message.success(intl.copied);
  }, [intl.copied]);

  return (
    <StyledLinkCard className="hero-card banner-bg">
      <div className="web-cyber-grid" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="section-title">{intl.Share_my_referral_link}</div>
          <div className="link-row">
            <div className="link-value">
              {link || intl.your_referral_link_is_expired}
            </div>
            <CopyToClipboard text={link} onCopy={handleCopy}>
              <PrimaryBtn
                eventName="btn_referral_copy_link"
                disabled={disabled}
              >
                {intl.Copy_Link}
              </PrimaryBtn>
            </CopyToClipboard>
          </div>
        </div>
        <ReferralBanner size={430} />
      </div>
    </StyledLinkCard>
  );
}

const StyledLinkCard = styled.div`
  position: relative;

  .hero-content {
    padding: 30px;
    width: 100%;
    height: 175px;
    overflow: hidden;
    display: flex;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg};
    border: 1px solid rgba(183, 189, 198, 0.15);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
  }

  .web-cyber-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.03) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    mask-image: radial-gradient(circle at right, black 20%, transparent 80%);
    -webkit-mask-image: radial-gradient(
      circle at right,
      black 20%,
      transparent 80%
    );
  }

  .icon-referral-banner {
    margin-left: auto;
    position: relative;
    top: -80px;
  }

  .section-title {
    margin-bottom: 30px;
    line-height: 24px;
  }

  .link-row {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-start;
  }

  .link-row .dg-primary {
    min-width: 110px;
    flex-shrink: 0;
    min-height: 40px;
    height: 40px;
    padding: 0 18px;
  }

  .link-value {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    min-width: 360px;
    padding: 0 50px 0 20px;
    border-radius: 10px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    word-break: break-all;
  }
`;
