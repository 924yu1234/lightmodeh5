import React, { useState } from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { useSetLocale } from 'src/locals';
import { COIN_GECKO_MAP } from 'src/locals/intlUtils';
import { DEXTOOLS_CHAIN_MAP } from 'src/state/swap/pair/hooks';

import { useXStockDetail } from './dataProvider';

export default function TradingView({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element | null {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { pair } = useXStockDetail();
  const baseToken = pair.baseToken;
  const { locale } = useSetLocale();
  const lang = (COIN_GECKO_MAP as any)[locale] ?? 'en';
  const chain =
    (DEXTOOLS_CHAIN_MAP as any)[baseToken?.chain as ''] ??
    baseToken?.chain?.toLowerCase();
  const pairAddress = pair.pool_address;

  let coinGeckoUrl = '';
  if (chain && pairAddress) {
    coinGeckoUrl = `https://www.geckoterminal.com/${lang}/${chain}/pools/${pairAddress}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`;
  }

  return (
    <StyledChart style={{ width, height }}>
      <iframe
        src={`${coinGeckoUrl}`}
        title="coinGecko"
        style={{ width, height, display: iframeLoaded ? 'block' : 'none' }}
        onLoad={() => {
          setIframeLoaded(true);
        }}
      />
      {!iframeLoaded && <Skeleton height="100%" width="100%" />}
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 100%;
  height: 600px;
  .chart-spin {
    height: 100%;
  }
  .spin-inner {
    height: 100%;
  }
`;
