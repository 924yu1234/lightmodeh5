import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { useIntl } from 'src/locals';
import { useInfo } from 'src/state/application/hooks';
import { useGetCoinGeckoUrl } from 'src/state/swap/pair/hooks';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

export default function Kline({ poolAddress }: { poolAddress: string }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const intl = useIntl();
  const { baseToken } = useTurboRangeProduct(poolAddress);
  const { turboRangeDisabledKlines, turboRangeKlinesMap } = useInfo();
  const isTurboRangeDisabledKline = useMemo(() => {
    return (turboRangeDisabledKlines || []).includes(poolAddress || '');
  }, [turboRangeDisabledKlines, poolAddress]);

  const klineUrl = useMemo(() => {
    return (turboRangeKlinesMap || {})[poolAddress || ''];
  }, [turboRangeKlinesMap, poolAddress]);

  const { coinGeckoUrl: _coinGeckoUrl, iframeError: _iframeError } =
    useGetCoinGeckoUrl({
      chain: baseToken?.chain || '',
      pairAddress: poolAddress || '',
      disableKline: isTurboRangeDisabledKline,
    });

  let iframeError = _iframeError;
  let coinGeckoUrl = _coinGeckoUrl;
  if (klineUrl) {
    iframeError = false;
    coinGeckoUrl = `${klineUrl}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`;
  }

  return (
    <StyledChart className="chart-container">
      {iframeError && (
        <div className="iframe-error-message">
          {isTurboRangeDisabledKline
            ? intl.chart_is_currently_unavailable
            : intl.iframe_network_error_message}
        </div>
      )}
      {!iframeError && (
        <iframe
          src={`${coinGeckoUrl}`}
          title="coinGecko"
          style={{
            width: '100%',
            height: '100%',
            display: iframeLoaded ? 'block' : 'none',
          }}
          onLoad={() => {
            setIframeLoaded(true);
          }}
        />
      )}
      {!iframeLoaded && <Skeleton height="100%" width="100%" />}
      <div className="chart-bottom" />
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_181c27};
  .chart-spin {
    height: calc(100% - 70px);
    .spin-inner {
      height: calc(100% - 40px);
      iframe {
        height: 100%;
        width: 100%;
      }
    }
  }
  .chart-top {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 0 30px 15px;
    line-height: 28px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};

    .token-title {
      color: ${(props) => props.theme.t_fff_aa};
    }
    .token-price {
      color: ${({ theme }) => theme.t_fff};
    }
    .token-price-change {
      margin-top: 2px;
      color: ${({ theme }) => theme.t_fff};
    }
  }
  .iframe-error-message {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    color: ${({ theme }) => theme.t_b7b};
  }
  .chart-bottom {
    height: 40px;
    width: 100%;
    background: ${({ theme }) => theme.bg};
    margin-top: -40px;
    position: relative;
    z-index: 1;
  }
`;
