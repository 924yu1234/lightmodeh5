import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useToSwap } from 'src/hooks/navigate';
import { isPage } from 'src/hooks/useCustomNavigate';
import { useIsAppH5 } from 'src/providers/useWallet';
import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import { ThemeType, useThemeParams } from 'src/theme';
import {
  formatTokenCode,
  formatTokenName,
  formatTokenSymbol,
} from 'src/utils/format';

import PairLogo from 'js/components/Pair/logo';
import useChoosePair, { getUrlPath } from 'js/hooks/choosePair';

import LinkWrapper from '../LinkWrapper';

export default function SwapPairChoose({
  pair = {},
  page = 'swap',
  hideCode = false,
  hideName = false,
  disableNavigate = false,
}: {
  pair: any;
  page?: string;
  hideCode?: boolean;
  hideName?: boolean;
  disableNavigate?: boolean;
}) {
  const { baseToken, quoteToken, pairId } = pair;

  const isApp = useIsAppH5();
  const toSwap = useToSwap();

  const choosePair = useChoosePair();
  const { isMobile } = useThemeParams();
  const isChainNativeToken = useIsDAChainGasToken({ token: baseToken });

  const codeDisplay = useMemo(() => {
    return isChainNativeToken || baseToken?.is_whitelist
      ? ''
      : formatTokenCode(baseToken?.code);
  }, [baseToken?.code, isChainNativeToken, baseToken?.is_whitelist]);

  const location = useLocation();
  const { pathname } = location;
  const url = useMemo(() => {
    return getUrlPath({ baseToken, quoteToken, page });
  }, [baseToken, quoteToken, page]);

  const isCurrentPageAndPair = useMemo(() => {
    return isPage(pathname, url);
  }, [pathname, url]);

  const _disableNavigate = disableNavigate || isCurrentPageAndPair;

  const handleClick = () => {
    if (_disableNavigate) return;
    if (isApp) {
      toSwap({ token: baseToken });
    } else {
      document.getElementById('appContainer')?.scrollTo(0, 0);
      choosePair({ baseToken, quoteToken, pairId }, page);
    }
  };

  const noHoverBlur = useMemo(() => {
    return isMobile || _disableNavigate;
  }, [_disableNavigate, isMobile]);

  return (
    <StyledPairMarket
      className="pair-market"
      noHoverBlur={noHoverBlur}
      disableNavigate={_disableNavigate}
      onClick={handleClick}
    >
      <LinkWrapper url={_disableNavigate ? '' : url}>
        <PairLogo baseToken={baseToken} size={32} />
        <div className="names">
          <div className="pair-info-market">
            <span className="pair-info-market-base">
              {formatTokenSymbol(baseToken?.symbol)}
            </span>
            {baseToken?.name && !hideName && (
              <span className="pair-info-market-name">
                {formatTokenName(baseToken?.name)}
              </span>
            )}
          </div>
          {!hideCode && <div className="token-code">{codeDisplay}</div>}
        </div>
      </LinkWrapper>
    </StyledPairMarket>
  );
}

export const StyledPairMarket = styled.div<{
  disableNavigate: boolean;
  noHoverBlur: boolean;
}>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .link-wrapper {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  cursor: ${(props) => (props.disableNavigate ? `default` : 'pointer')};
  pointer-events: ${(props) => (props.disableNavigate ? `none` : 'unset')};
  .pair-logo {
    margin-right: 5px;
  }
  .link-wrapper {
    color: inherit;
  }
  .names {
    .pair-info-market {
      display: flex;
      align-items: center;
      line-height: 18px;
      .pair-info-market-base {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
      }
      .pair-info-market-name {
        margin-left: 5px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      }
      .icon-mobileMining {
        margin-left: 5px;
      }
    }
    .token-code {
      font-size: 12px;
      line-height: 18px;
      color: ${(props) => props.theme.t_b7b_60};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    }
    &:hover {
      color: ${(props) => (props.noHoverBlur ? `inherit` : props.theme.blue)};
    }
  }
`;
