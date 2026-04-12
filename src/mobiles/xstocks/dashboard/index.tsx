/* eslint-disable simple-import-sort/imports */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { useThemeParams } from 'src/theme';
import Holders from 'src/apps/xstocks/dashboard/holders';
import Volume from 'src/apps/xstocks/dashboard/volume';
import Trades from 'src/apps/xstocks/dashboard/trades';
import Heatmap from 'src/apps/xstocks/dashboard/heatmap';
import Header from 'src/mobiles/components/header';
import { useIntl } from 'src/locals';
import { useShowH5Header } from 'src/h5/utils';
import Summary from 'src/apps/xstocks/dashboard/summary';
import TotalAum from 'src/apps/xstocks/dashboard/totalAum';
import StocksTop from 'src/mobiles/stocks/top';
import Portfolio from './XStocksPortfolio';

export default function XStocks() {
  const showH5Header = useShowH5Header();

  const intl = useIntl();
  const { viewWidth } = useThemeParams();

  const chartWidth = useMemo(() => {
    const leftWidth = viewWidth - 20;
    return leftWidth;
  }, [viewWidth]);

  const chartHeight = useMemo(() => {
    return (chartWidth / 16) * 12;
  }, [chartWidth]);

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Wrapper className={isFullScreen ? 'full-screen' : ''}>
      {showH5Header && !isFullScreen && (
        <Header title={intl.Stocks} backUrl="/home" />
      )}

      <div className="page-inner" id="xStocksDashboardPageInner">
        <StocksTop />
        <Portfolio />
        <Summary />
        <TotalAum
          width={chartWidth}
          height={chartHeight}
          setIsFullScreen={setIsFullScreen}
        />
        <Holders
          width={chartWidth}
          height={chartHeight}
          setIsFullScreen={setIsFullScreen}
        />
        <Trades
          width={chartWidth}
          height={chartHeight}
          setIsFullScreen={setIsFullScreen}
        />
        <Volume
          width={chartWidth}
          height={chartHeight}
          setIsFullScreen={setIsFullScreen}
        />
        <Heatmap width={chartWidth} height={chartHeight} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background: ${(props) => props.theme.bg};
  position: relative;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 0 10px;
    padding-bottom: ${(props) => (!props.theme.showH5Header ? 0 : 26)}px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 3;
  }

  &.full-screen {
    padding: 0;
    .page-inner {
      height: ${(props) => props.theme.windowHeight}px;
    }
  }
`;
