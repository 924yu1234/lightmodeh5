import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { isPage } from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useIsDAChainGasToken } from 'src/state/swap/tokens/hook';
import { ThemeType, useThemeParams } from 'src/theme';
import { formatTokenCode, formatTokenSymbol } from 'src/utils/format';

import PairLogo from 'js/components/Pair/logo';
import useChoosePair, { getUrlPath } from 'js/hooks/choosePair';

import LinkWrapper from '../LinkWrapper';

export default function SwapPairMarket({
  pair = {},
  page = '',
  iconSize = 32,
  hideCode = false,
  disableNavigate = false,
  hideIcon = false,
  volDisplay = '',
  onClick,
  style,
}: {
  pair: any;
  page?: string;
  iconSize?: number;
  hideCode?: boolean;
  disableNavigate?: boolean;
  hideIcon?: boolean;
  volDisplay?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const { baseToken, quoteToken, pairId } = pair;

  const choosePair = useChoosePair();
  const { isMobile } = useThemeParams();
  const intl = useIntl();
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
    if (onClick) {
      onClick();
      return;
    }
    document.getElementById('appContainer')?.scrollTo(0, 0);
    choosePair({ baseToken, quoteToken, pairId }, page);
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
      style={style}
    >
      <LinkWrapper url={_disableNavigate ? '' : url}>
        {!hideIcon && <PairLogo baseToken={baseToken} size={iconSize} />}
        <div className="names">
          <div className="pair-info-market">
            <span className="pair-info-market-base">
              {formatTokenSymbol(baseToken?.symbol)}
            </span>
          </div>
          {!hideCode && codeDisplay ? (
            <div className="token-code">{codeDisplay}</div>
          ) : (
            !!volDisplay && (
              <div className="pair-vol">
                {intl.vol} {volDisplay}
              </div>
            )
          )}
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
      .icon-mobileMining {
        margin-left: 5px;
      }
    }
    .token-code {
      font-size: 12px;
      line-height: 14px;
      color: ${(props) => props.theme.t_b7b};
    }
    .pair-vol {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b}90;
      line-height: 18px;
    }
    &:hover {
      color: ${(props) => (props.noHoverBlur ? `inherit` : props.theme.blue)};
    }
  }
`;
