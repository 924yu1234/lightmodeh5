/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useInfo } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';
import IconWrapper from '../Icons/IconWrapper';

export default function EarnDepositWarning({ vault }: { vault: any }) {
  const { simpleEarnDisabledDepositDAs } = useInfo();
  const intl = useIntl();
  const isDisabled = (simpleEarnDisabledDepositDAs || []).includes(
    vault?.address
  );
  const [visible, setVisible] = useState(true);
  if (!isDisabled || !visible) return null;

  return (
    <StyledMessage className="serverMessage-banner" isCloseable>
      <div className="msg-content">
        {intl.simple_earn_disabled_deposit_tips}
      </div>
      <IconWrapper
        size={40}
        onClick={() => {
          setVisible(false);
        }}
      >
        <Close />
      </IconWrapper>
    </StyledMessage>
  );
}

const StyledMessage = styled.div<{ isCloseable: boolean }>`
  padding: ${({ isCloseable, theme }) =>
    theme.isMobile
      ? `10px ${isCloseable ? '45px' : '20px'} 15px 20px`
      : `10px ${isCloseable ? '60px' : '20px'} 10px 28px`};
  width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth}px;
  background: ${(props) => props.theme.bg_yellow_10};
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  .dg-icon-wrapper {
    position: absolute;
    margin-left: ${(props) => (props.theme.isMobile ? '0px' : '10px')};
    top: 0;
    right: 0;
  }
  .icon-notice {
    margin-right: 10px;
  }
  .dg-icon {
    color: ${({ theme }) => theme.yellow};
  }
  .msg-content {
    margin-right: auto;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }) => theme.yellow};
    letter-spacing: 0;
    line-height: 20px;
    text-align: ${(props) => (props.theme.isMobile ? 'left' : 'left')};
    white-space: ${(props) => (props.theme.isMobile ? 'normal' : 'pre-line')};
    a {
      padding-bottom: 1px;
      color: ${({ theme }) => theme.yellow};
      border-bottom: 1px solid #febe2f;
    }
    b {
      ${(props) => props.theme.fontBold};
    }
  }
`;
