import React from 'react';
import styled from 'styled-components';

import { useExternalWalletGuide } from 'src/hooks/useExternalWalletGuide';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';
import IconWrapper from '../Icons/IconWrapper';

export default function AddFundsGuide() {
  const intl = useIntl();
  const { showAddFundsGuide, dismissAddFundsGuide } = useExternalWalletGuide();
  if (!showAddFundsGuide) {
    return null;
  }

  return (
    <StyledWrap className="add-funds-guide">
      <div className="external-wallet-add-funds-banner">
        <div className="banner-text">
          {intl.external_wallet_add_funds_guide}
        </div>
        <IconWrapper
          className="banner-close"
          size={20}
          onClick={dismissAddFundsGuide}
        >
          <Close />
        </IconWrapper>
      </div>
    </StyledWrap>
  );
}

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  .external-wallet-add-funds-banner {
    width: fit-content;
    width: 100%;
    min-height: 50px;
    padding: 16px 16px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(94, 210, 162, 0.3);

    .banner-text {
      flex: 1;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 13px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }

    .banner-close {
      flex: 0 0 auto;
    }

    .icon-close {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
`;
