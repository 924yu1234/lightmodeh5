import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { FUNGIBLE_USDC_ID } from 'src/da';
import { ThemeType } from 'src/theme';

import ChainTokenIcon from '../ChainTokenIcon';

export default function TokenIcon({
  token,
  size = 32,
  className = '',
  hideChainIcon = false,
  chainIconSize = 14,
}: {
  token?: CommonToken;
  size?: number;
  className?: string;
  hideChainIcon?: boolean;
  chainIconSize?: number;
}) {
  const showIcon = token?.icon;
  const _hideChainIcon = hideChainIcon || token?.id === FUNGIBLE_USDC_ID;
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(false);
  }, [showIcon]);
  return (
    <StyledTokenIcon
      className={`token-icon ${className}`}
      size={size}
      key={showIcon}
    >
      {showIcon && !isError ? (
        <img
          src={showIcon}
          alt="logo"
          className="token-icon-img"
          onError={() => {
            setIsError(true);
          }}
        />
      ) : (
        <div className="token-icon-symbol" data-url={showIcon}>
          {token?.symbol?.slice(0, 1)}
        </div>
      )}
      {!_hideChainIcon && token?.chain && (
        <ChainTokenIcon chain={token.chain as any} size={chainIconSize} />
      )}
    </StyledTokenIcon>
  );
}

export const StyledTokenIcon = styled.div<{ size: number }>`
  position: relative;
  width: ${(props: any) => props.size + props.size / 12}px;
  height: ${(props: any) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  .token-icon-img {
    width: ${(props: any) => props.size}px;
    height: ${(props: any) => props.size}px;
    border-radius: 50%;
  }
  .token-icon-symbol {
    width: ${(props: any) => props.size}px;
    height: ${(props: any) => props.size}px;
    border-radius: 50%;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    background: ${({ theme }) => theme.bg_white};
    color: ${(props) => props.theme.t_13122f};
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chain-token-icon {
    position: absolute;
    width: ${(props: any) => props.size / 2}px;
    height: ${(props: any) => props.size / 2}px;
    bottom: 0;
    right: 0;
    z-index: 1;
    border: 0.5px solid ${({ theme }) => theme.border_b7b_50};
    border-radius: 50%;
  }
`;
