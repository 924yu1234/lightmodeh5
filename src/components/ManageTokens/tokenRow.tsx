import React from 'react';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMinus from 'src/components/Icons/minus';
import IconPlus from 'src/components/Icons/plus';
import TokenSymbol from 'src/components/Token/symbol';
import { type ManagedTokenAction } from 'src/hooks/useAssets';
import { ThemeType } from 'src/theme';

export default function ManageTokenRow({
  token,
  action,
  onClickAction,
}: {
  token: any;
  action: ManagedTokenAction;
  onClickAction?: (token: any) => void;
}) {
  const showCode = !token?.is_whitelist;

  return (
    <StyledManageTokenRow className="manage-token-row">
      <TokenSymbol
        token={token}
        showTokenTag
        hideCode={!showCode}
        iconSize={32}
        chainIconSize={16}
      />
      <div className="manage-token-values">
        <div className="amount">{token.totalDisplay || '0'}</div>
        <div className="value">{token.totalValueDisplay || '$0'}</div>
      </div>
      <IconWrapper
        className={`action-btn ${action === 'disabled' ? 'disabled' : ''}`}
        size={36}
        cursor={action === 'disabled' ? 'default' : 'pointer'}
        onClick={(e) => {
          e.stopPropagation();
          if (action === 'disabled') return;
          onClickAction?.(token);
        }}
      >
        {action === 'add' ? <IconPlus size={10} /> : <IconMinus size={10} />}
      </IconWrapper>
    </StyledManageTokenRow>
  );
}

const StyledManageTokenRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 0 20px;
  gap: 9px;
  height: 52px;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .token-symbol {
    margin-right: auto;
    min-width: 0;
    flex: 1;

    .token-icon {
      margin-right: 9px;
    }
  }

  .manage-token-values {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 62px;

    .amount {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
      font-size: 16px;
      line-height: 18px;
    }

    .value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      font-size: 12px;
      line-height: 18px;
      margin-top: 2px;
    }
  }

  .action-btn {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    flex-shrink: 0;
    .dg-icon {
      border-radius: 999px;
      padding: 2px;
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }

    @media (hover: hover) {
      &:not(.disabled):hover {
        .dg-icon {
          border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
          color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }

    &.disabled {
      opacity: 0.5;
    }
  }
`;
