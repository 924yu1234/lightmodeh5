import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { PrimaryBtn, Tooltip } from 'src/UI';

import { useExternalWalletGuide } from 'src/hooks/useExternalWalletGuide';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function ReceiveGuide({
  children,
}: {
  children: React.ReactNode;
}) {
  const intl = useIntl();
  const { showReceiveGuide, dismissReceiveGuide } = useExternalWalletGuide();

  return (
    <>
      {showReceiveGuide &&
        typeof document !== 'undefined' &&
        createPortal(<StyledBackdrop aria-hidden />, document.body)}
      <Tooltip
        withArrow
        opened={showReceiveGuide}
        position="bottom"
        zIndex={400}
        label={
          <StyledBubble className="guide-card">
            <div className="guide-text">
              {intl.external_wallet_receive_guide}
            </div>
            <PrimaryBtn
              eventName="external_wallet_receive_guide_confirm"
              className="guide-btn"
              onClick={dismissReceiveGuide}
            >
              {intl.btn_ok}
            </PrimaryBtn>
          </StyledBubble>
        }
      >
        {showReceiveGuide ? (
          <StyledGuideContainer className="guide-container">
            {children}
          </StyledGuideContainer>
        ) : (
          children
        )}
      </Tooltip>
    </>
  );
}

const StyledBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 250;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_black_70};
`;

const StyledBubble = styled.div`
  position: relative;
  padding: 5px;

  .guide-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    white-space: pre-line;
  }

  .guide-btn.dg-primary {
    margin-top: 14px;
    min-width: 80px;
    height: 30px;
    min-height: 30px;
    padding: 0 10px;
  }
`;

const StyledGuideContainer = styled.div`
  position: relative;
  z-index: 251;
  pointer-events: none;
`;
