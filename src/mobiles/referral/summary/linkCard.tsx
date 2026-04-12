import React, { useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

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
    <StyledLinkCard className="hero-card">
      <div className="hero-content">
        <div className="hero-left">
          <div className="section-title">{intl.Share_my_referral_link}</div>
          <div className="link-row">
            <div className="link-value">
              {link || intl.your_referral_link_is_expired}
            </div>
          </div>
          <CopyToClipboard text={link} onCopy={handleCopy}>
            <PrimaryBtn eventName="btn_referral_copy_link" disabled={disabled}>
              {intl.Copy_Link}
            </PrimaryBtn>
          </CopyToClipboard>
        </div>
      </div>
    </StyledLinkCard>
  );
}

const StyledLinkCard = styled.div`
  background: linear-gradient(
    180deg,
    ${({ theme }: { theme: ThemeType }) => theme.bg_blue_25} 0%,
    ${({ theme }: { theme: ThemeType }) => theme.bg_main_80} 100%
  );
  border: 1px solid rgba(29, 54, 64, 1);
  border-radius: 5px;
  .hero-content {
    border-radius: 5px;
    padding: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '20px' : '30px'};
    width: 100%;
    height: 100%;
    display: flex;
  }

  .hero-left {
    width: 100%;
    max-width: 470px;
  }

  .link-row {
    padding: 0 22px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-start;
  }

  .dg-primary {
    width: 100%;
    min-height: 40px;
    height: 40px;
    margin-top: 10px;
  }

  .link-row {
    flex: 1;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 5px 0 20px;
    border-radius: 6px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_05};
  }

  .link-value {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    flex: 1;
    word-break: break-all;
  }
`;
