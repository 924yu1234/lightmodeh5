import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import XStockDetailProvider from 'src/apps/xstocks/detail/dataProvider';
import HoldersAndTvl from 'src/apps/xstocks/detail/holdersAndTvl';
import Info from 'src/apps/xstocks/detail/info';
import News from 'src/apps/xstocks/detail/news';
import Opptunity from 'src/apps/xstocks/detail/opptunity';
import Token from 'src/apps/xstocks/detail/token';
import TradingView from 'src/apps/xstocks/detail/tradingView';
import VolumeAndLiquidity from 'src/apps/xstocks/detail/volumeAndLiquidity';
import { useShowH5Header } from 'src/h5/utils';
import Header from 'src/mobiles/components/header';
import { useThemeParams } from 'src/theme';

import { StyledXStocksDetail } from './style';

export default function XStocksDetail() {
  const { code } = useParams();
  const showH5Header = useShowH5Header();

  const { viewWidth } = useThemeParams();

  const chartWidth = useMemo(() => {
    return viewWidth - 20;
  }, [viewWidth]);

  const chartHeight = useMemo(() => {
    return (chartWidth / 16) * 10;
  }, [chartWidth]);

  return (
    <XStockDetailProvider code={code ?? ''}>
      <StyledXStocksDetail>
        {showH5Header && <Header title="" backUrl="/stocks/xstocks" />}
        <div className="detail-inner">
          <Token />
          <Info />
          <Opptunity />
          <News />
          <div style={{ marginTop: '15px' }}>
            <TradingView width={chartWidth} height={500} />
          </div>
          <div className="charts-container">
            <HoldersAndTvl width={chartWidth} height={chartHeight} />
            <VolumeAndLiquidity width={chartWidth} height={chartHeight} />
          </div>
        </div>
      </StyledXStocksDetail>
    </XStockDetailProvider>
  );
}
