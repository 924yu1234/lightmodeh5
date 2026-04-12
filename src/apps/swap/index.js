import React, { useEffect } from 'react';

import useSwapPageUrlFormat from 'src/components/RegisterPair/useSwapPageUrlFormat';
import useWindowSize from 'src/hooks/useWindowSize';
import EstimateProvider from 'src/state/intent/estimateProvider';
import { useCheckAndShowUserInterview } from 'src/state/notification/hooks';
import useCheckRegion from 'src/state/regionCheck/hooks';
import SwapOrdersUpdater from 'src/state/swap/orders/updater';
import SwapTradeUpdater from 'src/state/swap/trade/updater';

import Spin from 'js/components/Spin';
import TradePageMaintenance from 'js/components/tradePageMaintenance';
import { useInfo } from 'js/state/application/hooks';
import { useCurrentSwapPair } from 'js/state/swap/pair/hooks';
import SwapPairUpdater from 'js/state/swap/pair/updater';

import { StyledView } from './style';
import Chart from './views/chart';
import Orders from './views/orders';
import PlaceOrder from './views/placeOrder';
import Top from './views/top';

export default function Swap() {
  const pair = useCurrentSwapPair();
  const info = useInfo();
  const { done } = useSwapPageUrlFormat({ pair, page: 'swap' });
  const checkAndShow = useCheckAndShowUserInterview();
  const maintenance = info?.serviceStatus?.stopSwap ? (
    <TradePageMaintenance />
  ) : null;
  const checkRegion = useCheckRegion();

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  const { width } = useWindowSize();
  const showFullView = width >= 1920;

  let className = 'MiniView';

  if (showFullView) {
    className = 'FullView';
  }

  useEffect(() => {
    checkAndShow();
  }, [checkAndShow]);

  if (!done) {
    return <Spin spinning style={{ margin: '20% 49%' }} />;
  }

  const PlaceOrderView = (
    <div className="trade-right box-shadow">
      <PlaceOrder />
    </div>
  );

  const OrdersView = (
    <div className="my-order box-shadow">
      <Orders />
    </div>
  );

  const dexTools = (
    <div className="chart-container">
      <div className="area-top box-shadow">
        <Top pair={pair} />
      </div>
      <Chart />
    </div>
  );

  return (
    <EstimateProvider>
      <StyledView className={className}>
        <SwapPairUpdater page="swap" />
        <SwapOrdersUpdater />
        <SwapTradeUpdater />
        {PlaceOrderView}
        {dexTools}
        {OrdersView}
        {maintenance}
      </StyledView>
    </EstimateProvider>
  );
}
