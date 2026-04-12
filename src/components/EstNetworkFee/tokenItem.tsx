import React from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { ThemeType } from 'src/theme';

import ChainNameTag from '../Token/chainNameTag';
import TokenIcon from '../Token/icon';

export default function TokenItem({
  token,
  className,
  onClick,
}: {
  token: Token;
  className?: string;
  onClick: () => void;
}) {
  return (
    <StyledTokenItem onClick={onClick} className={className}>
      <TokenIcon token={token} size={32} />
      <div className="token-info">
        <div className="token-symbol">
          {token.symbol}
          <ChainNameTag chain={token.chain as any} id={token.id} />
        </div>
        <div className="token-name">{token.name}</div>
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
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 0 10px;
  &:hover {
    background: ${(props) => props.theme.bgMenuHover};
  }
  &.selected {
    cursor: default;
    opacity: 0.5;
    background: ${({ theme }) => theme.bg_transparent};
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
