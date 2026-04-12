import React, { useState } from 'react';

import { BuyBtn, SellBtn, Skeleton } from 'src/UI';

import ChartUnavailable from 'src/components/chartUnavaliable';
import useSwapPageUrlFormat from 'src/components/RegisterPair/useSwapPageUrlFormat';
import Spin from 'src/components/Spin';
import { OrderDirs } from 'src/constants/interface';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';
import { useCoinGeckoUrl, useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import SwapPairUpdater from 'src/state/swap/pair/updater';
import { useChangeSwapOrderDir } from 'src/state/swap/trade/hooks';

import SwapPairMoreInfo from '../components/swapPairMoreInfo';
import { StyledChart } from './style';
import Top from './top';

export default function SwapInfo() {
  const { coinGeckoUrl, iframeError, disableKline } = useCoinGeckoUrl();
  const intl = useIntl();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isApp = useIsAppH5();
  const pair = useCurrentSwapPair();

  const { done } = useSwapPageUrlFormat({ pair, page: 'swap' });
  const navigate = useCustomNavigate();

  const changeOrderDir = useChangeSwapOrderDir();

  if (!done) {
    return <Spin spinning style={{ margin: '20% 49%' }} />;
  }

  // swapInfo固定使用APP头部
  return (
    <StyledChart isApp={isApp}>
      <SwapPairUpdater page="swap/info" />
      {!isApp && (
        <>
          <Top />
        </>
      )}
      <div className="page-inner">
        {!isApp && <SwapPairMoreInfo />}
        <div className="iframe-container">
          {iframeError && (
            <>
              {disableKline ? (
                <ChartUnavailable />
              ) : (
                <div className="iframe-error-message">
                  {intl.iframe_network_error_message}
                </div>
              )}
            </>
          )}
          {!iframeError && (
            <iframe
              src={coinGeckoUrl}
              title="coinGecko"
              style={{
                width: '100%',
                display: iframeLoaded ? 'block' : 'none',
              }}
              onLoad={() => {
                setIframeLoaded(true);
              }}
            />
          )}
          {!iframeLoaded && !disableKline && (
            <Skeleton height="100%" width="100%" />
          )}
        </div>
      </div>
      {!isApp && (
        <div className="btns">
          <BuyBtn
            eventName="btn_swap_info_buy"
            onClick={() => {
              changeOrderDir(OrderDirs.BUY);
              navigate('/swap');
            }}
          >
            {intl.BUY}
          </BuyBtn>
          <SellBtn
            eventName="btn_swap_info_sell"
            onClick={() => {
              changeOrderDir(OrderDirs.SELL);
              navigate('/swap');
            }}
          >
            {intl.SELL}
          </SellBtn>
        </div>
      )}
    </StyledChart>
  );
}
