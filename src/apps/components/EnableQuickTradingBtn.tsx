import React from 'react';
import styled from 'styled-components';

import IconEnable from 'src/components/Icons/enable';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';

import { useShowUnlockModal } from 'js/state/application/hooks';

export default function EnableQuickTradingBtn({
  className = '',
  children,
  iconSize = 40,
  onClick,
  disabled,
}: {
  className?: string;
  iconSize?: number;
  children?: React.ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const unlock = useShowUnlockModal();
  const dexAccount = useDexAccount();
  const hasUnlocked = dexAccount?.hasUnlocked;
  const intl = useIntl();

  return (
    <StyledBtns
      className={`enable-quick-trading-btns ${className} ${
        hasUnlocked ? 'hasUnlocked' : ''
      } ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
    >
      {children}
      <IconWrapper
        className="enable-quick-trading-btn"
        title={intl.turn_on_signature_free_mode}
        size={iconSize}
        onClick={() => {
          if (disabled) return;
          unlock();
          if (onClick) onClick();
        }}
      >
        <IconEnable />
      </IconWrapper>
    </StyledBtns>
  );
}

const StyledBtns = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  .enable-quick-trading-btn {
    cursor: pointer;
    border-radius: 0 ${({ theme }) => theme.swapCtaPillRadius}
      ${({ theme }) => theme.swapCtaPillRadius} 0;
    position: relative;
    background: ${({ theme }) => theme.blue};
    border-left: 0.5px solid ${({ theme }) => theme.innerBorder};
    &:hover {
      border-radius: 0 ${({ theme }) => theme.swapCtaPillRadius}
        ${({ theme }) => theme.swapCtaPillRadius} 0;
      background: ${({ theme }) => theme.blue};
      background-image: linear-gradient(
        180deg,
        rgba(255, 253, 253, 0.35) 0%,
        rgba(0, 193, 255, 0.35) 100%
      );
    }
  }
  &.enable-quick-trading-btns {
    border-radius: ${({ theme }) => theme.swapCtaPillRadius};
    overflow: hidden;

    .mantine-Button-root,
    .mantine-Button-root.dg-buy,
    .mantine-Button-root.dg-sell,
    .mantine-Button-root.dg-swap-sell {
      border-radius: ${({ theme }) => theme.swapCtaPillRadius} 0 0
        ${({ theme }) => theme.swapCtaPillRadius};
    }

    .mantine-Button-root.dg-swap-buy {
      border-radius: ${({ theme }) => theme.swapCtaPillRadius} 0 0
        ${({ theme }) => theme.swapCtaPillRadius};
    }
  }

  &.sell-btn {
    .enable-quick-trading-btn {
      background: ${({ theme }) => theme.sell};
      &:hover {
        background-image: linear-gradient(
          180deg,
          rgba(255, 253, 253, 0.35) 0%,
          rgba(255, 0, 0, 0.35) 100%
        );
      }
    }
  }
  &.buy-btn {
    .enable-quick-trading-btn {
      background: ${({ theme }) => theme.buy};
      &:hover {
        background-image: linear-gradient(
          180deg,
          rgba(255, 253, 253, 0.35) 0%,
          rgba(0, 193, 255, 0.35) 100%
        );
      }
    }
  }
  &.disabled {
    pointer-events: none;
    .enable-quick-trading-btn {
      &:not([data-loading]),
      &:hover:not([data-loading]) {
        color: ${(props) => props.theme.t_666};
        background: ${({ theme }) => theme.bg_f5f5f5_10};
        cursor: default;
      }
    }
  }
`;
