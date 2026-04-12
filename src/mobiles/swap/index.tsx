import React, { useEffect } from 'react';

import useSwapPageUrlFormat from 'src/components/RegisterPair/useSwapPageUrlFormat';
import BannerMessage from 'src/components/ServerMessages/banner';
import EstimateProvider from 'src/state/intent/estimateProvider';
import useCheckRegion from 'src/state/regionCheck/hooks';
import SwapOrdersUpdater from 'src/state/swap/orders/updater';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import SwapPairUpdater from 'src/state/swap/pair/updater';
import SwapTradeUpdater from 'src/state/swap/trade/updater';

import Spin from 'js/components/Spin';
import TradePageMaintenance from 'js/components/tradePageMaintenance';
import { useInfo } from 'js/state/application/hooks';

import GlobalFooter from '../components/GlobalFooter';
import SwapPairMoreInfo from '../components/swapPairMoreInfo';
import Orders from './orders';
import PlaceOrder from './placeOrder';
import { StyledSwap } from './style';
import Top from './top';

export default function Swap() {
  const pair = useCurrentSwapPair();
  const info = useInfo();
  const { done } = useSwapPageUrlFormat({ pair, page: 'swap' });
  const checkRegion = useCheckRegion();

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  if (!done) {
    return <Spin spinning style={{ margin: '20% 49%' }} />;
  }

  return (
    <EstimateProvider>
      <StyledSwap>
        <Top />
        <div className="page-inner" id="mobileSwapScroll">
          <BannerMessage />
          <div className="order-warpper">
            <SwapPairMoreInfo />
            <PlaceOrder />
          </div>
          <Orders />
        </div>
        <SwapPairUpdater page="swap" />
        {info?.serviceStatus?.stopSwap && <TradePageMaintenance />}
        <GlobalFooter />
        <SwapOrdersUpdater />
        <SwapTradeUpdater />
      </StyledSwap>
    </EstimateProvider>
  );
}
