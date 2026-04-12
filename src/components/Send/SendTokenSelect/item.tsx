import React from 'react';
import styled from 'styled-components';

import TokenSymbol from 'src/components/Token/symbol';
import { CommonToken } from 'src/constants/interface';
import { ThemeType } from 'src/theme';

export default function TokenItem({
  token,
  onClick,
}: {
  token: CommonToken;
  onClick: any;
}) {
  return (
    <StyledItem key={token.id} className="token-item" onClick={onClick}>
      <TokenSymbol token={token} hideCode />
      <div className="token-balance">
        {(token as any)?.availableDisplay || '0'}
        <div className="token-value">
          ${(token as any)?.availableValueDisplay || '--'}
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  padding: 0 20px;
  min-height: 52px;
  font-size: 14px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};

  &:hover {
    background: ${({ theme }) => theme.bg_white_10};
  }

  .chain-icon {
    margin-right: 8px;
  }
  .token-balance {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-left: auto;

    .token-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
