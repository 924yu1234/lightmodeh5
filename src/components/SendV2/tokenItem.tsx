import React from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { ThemeType } from 'src/theme';
import { formatTokenName, formatTokenSymbol } from 'src/utils/format';

import ChainNameTag from '../Token/chainNameTag';
import TokenIcon from '../Token/icon';

export default function TokenItem({
  token,
  onClick,
}: {
  token: Token;
  onClick: () => void;
}) {
  return (
    <StyledTokenItem
      onClick={onClick}
      className={`${Number(token.available) === 0 ? 'disabled' : ''}`}
    >
      <TokenIcon token={token} size={32} />
      <div className="token-info">
        <div className="token-symbol">
          {formatTokenSymbol(token.symbol)}
          <ChainNameTag chain={token.chain as any} id={token.id} />
        </div>
        <div className="token-name">{formatTokenName(token.name)}</div>
      </div>
      <div className="token-balance">
        {token.availableDisplay}
        <div className="token-value">
          {(token as any)?.availableValueDisplay}
        </div>
      </div>
    </StyledTokenItem>
  );
}

const StyledTokenItem = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &.disabled {
    cursor: default;
    opacity: 0.5;
  }
  .token-info {
    display: flex;
    flex-direction: column;
    .token-symbol {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .token-name {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
  .token-balance {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    .token-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
