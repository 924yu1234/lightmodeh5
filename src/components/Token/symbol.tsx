import React, { useMemo } from 'react';
import styled from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { CommonToken } from 'src/constants/interface';
import { useTokenSwapUrl } from 'src/hooks/choosePair';
import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import {
  formatTokenCode,
  formatTokenName,
  formatTokenSymbol,
} from 'src/utils/format';

import LinkWrapper from 'js/components/LinkWrapper';
import { useGetBrowserUrl } from 'js/ethers/utils';
import WindowOpen from 'js/utils/windowOpen';

import IconOpenBrowser from '../Icons/openBrowser';
import TagToken from '../TokenTag';

export default function TokenSymbol({
  token,
  iconSize = 28,
  disableLink,
  showLinkIcon,
  hideChainIcon = false,
  showTokenName = false,
  hideCode = false,
  enableNavigate = false,
  showTokenTag = false,
  chainIconSize = 14,
}: {
  token: CommonToken;
  iconSize?: number;
  disableLink?: boolean;
  showLinkIcon?: boolean;
  hideChainIcon?: boolean;
  showTokenName?: boolean;
  hideCode?: boolean;
  enableNavigate?: boolean;
  showTokenTag?: boolean;
  chainIconSize?: number;
}) {
  const isDAChainGasToken = useIsDAChainGasToken({ token });

  const codeDisplay = useMemo(() => {
    return isDAChainGasToken || token?.is_whitelist
      ? ''
      : formatTokenCode(token?.code);
  }, [token?.code, isDAChainGasToken, token?.is_whitelist]);

  const { isUsdc, handleClick, isCurrentPageAndPair } = useTokenSwapUrl({
    token,
  });
  const getBrowserUrl = useGetBrowserUrl();

  const url = getBrowserUrl({
    chainId: token?.chain,
    code: token?.code,
    tx_hash: undefined,
    address: undefined,
  });

  const _disableNavigate = isUsdc || !enableNavigate || isCurrentPageAndPair;

  return (
    <StyledSymbol
      className="token-symbol"
      disableLink={!!disableLink}
      iconSize={iconSize}
    >
      <TokenIcon
        token={token}
        size={iconSize}
        hideChainIcon={hideChainIcon}
        chainIconSize={chainIconSize}
      />
      <div className="symbols">
        <div className="token-symbol-inner">
          <div
            className={`token-symbol-inner-text ${
              _disableNavigate ? 'disable-navigate' : 'enable-navigate'
            }`}
            onClick={() => {
              if (_disableNavigate) {
                return;
              }
              handleClick();
            }}
          >
            {formatTokenSymbol(token?.symbol)}
          </div>
          {showTokenName && (
            <div className="token-name">{formatTokenName(token?.name)}</div>
          )}
        </div>
        {codeDisplay && !hideCode && (
          <div
            className="token-code"
            onClick={(e) => {
              if (!disableLink) {
                e.stopPropagation();
                WindowOpen(url);
              }
            }}
          >
            <LinkWrapper url={url} colorInherit>
              {codeDisplay}
              {showLinkIcon && <IconOpenBrowser />}
            </LinkWrapper>
          </div>
        )}
      </div>
      {showTokenTag && <TagToken token={token} />}
    </StyledSymbol>
  );
}

export const StyledSymbol = styled.div<{
  iconSize: number;
  disableLink: boolean;
}>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  .token-icon {
    width: ${(props) => props.iconSize}px;
    height: ${(props) => props.iconSize}px;
    margin-right: 5px;
  }
  .symbols {
    ${(props) => props.theme.fontMedium};
    font-size: 14px;
    line-height: 18px;
    text-align: left;

    .token-symbol-inner {
      display: flex;
      align-items: center;
      .enable-navigate {
        cursor: pointer;
        &:hover {
          color: ${(props) => props.theme.blue};
        }
      }
      .token-name {
        margin-left: 5px;
        ${(props) => props.theme.fontRegular};
        font-size: 14px;
        line-height: 18px;
        color: ${(props) => props.theme.t_b7b_60};
      }
    }

    .token-code {
      user-select: none;
      ${(props) => props.theme.fontMedium};
      font-size: 12px;
      line-height: 18px;
      color: ${(props) => props.theme.t_b7b_60};
      cursor: ${(props) => (props.disableLink ? 'default' : 'pointer')};
      display: flex;
      align-items: center;
      &:hover {
        text-decoration: ${(props) =>
          props.theme.isMobile ? 'none' : 'underline'};
      }
      .icon-open-browser {
        margin-left: 5px;
      }
    }
  }

  .multi-chain-tag {
    margin-left: 5px;
  }
`;
