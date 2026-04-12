/* eslint-disable simple-import-sort/imports */
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { useThemeParams } from 'src/theme';
import Holders from 'src/apps/ondo/dashboard/holders';
import Heatmap from 'src/apps/ondo/dashboard/heatmap';
import Header from 'src/mobiles/components/header';
import { useIntl } from 'src/locals';
import Summary from 'src/apps/ondo/dashboard/summary';
import TotalAum from 'src/apps/ondo/dashboard/totalAum';
import StocksTop from 'src/mobiles/stocks/top';
import { useShowH5Header } from 'src/h5/utils';
import Trades from 'src/apps/ondo/dashboard/trades';
import Volume from 'src/apps/ondo/dashboard/volume';
import Portfolio from './OndoPortfolio';

export default function Ondo() {
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
    <Wrapper
      isApp={!showH5Header}
      className={isFullScreen ? 'full-screen' : ''}
    >
      {showH5Header && !isFullScreen && (
        <Header title={intl.Stocks} backUrl="/home" />
      )}
      <div className="page-inner" id="ondoDashboardPageInner">
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

const Wrapper = styled.div<{ isApp: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background: ${(props) => props.theme.bg};
  position: relative;
  padding-top: ${(props) => (props.isApp ? 0 : 52)}px;

  .page-inner {
    height: ${(props) => props.theme.windowHeight - (props.isApp ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 0 10px;
    padding-bottom: ${(props) => (props.isApp ? 0 : 26)}px;
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
