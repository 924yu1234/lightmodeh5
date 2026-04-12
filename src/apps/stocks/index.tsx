import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { useThemeParams } from 'src/theme';

import OndoDataProvider from '../ondo/dashboard/dataProvider';
import OndoPortfolio from '../ondo/dashboard/portfolio';
import XStocksDataProvider from '../xstocks/dashboard/dataProvider';
import XStocksPortfolio from '../xstocks/dashboard/portfolio';
import StocksTabs from './tabs';

export default function Stocks() {
  const tab = useUserFlag('stocks_tab');
  const changeTab = useChangeFlag('stocks_tab');
  useEffect(() => {
    if (location.pathname.includes('ondo')) {
      changeTab('ondo');
    } else if (location.pathname.includes('xstocks')) {
      changeTab('xstocks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { viewWidth } = useThemeParams();
  const chartWidth = useMemo(() => {
    const leftWidth = viewWidth - 280 - 50;
    return (leftWidth - 20) / 2; // 2列布局，减去gap
  }, [viewWidth]);

  const chartHeight = useMemo(() => {
    return (chartWidth / 16) * 10;
  }, [chartWidth]);

  const heatmapWidth = useMemo(() => {
    return viewWidth - 280 - 50;
  }, [viewWidth]);

  const heatmapHeight = useMemo(() => {
    return Math.min(Math.max((heatmapWidth / 16) * 9, 300), 500);
  }, [heatmapWidth]);

  const maxHeight = chartHeight * 2 + 40 + heatmapHeight + 20 + 100;

  return (
    <XStocksDataProvider>
      <OndoDataProvider>
        <StyledStocks>
          <div className="left">
            <StocksTabs />
          </div>
          <div className="portfolios">
            <div style={{ display: tab === 'xstocks' ? 'block' : 'none' }}>
              <XStocksPortfolio maxHeight={maxHeight} />
            </div>
            <div style={{ display: tab === 'ondo' ? 'block' : 'none' }}>
              <OndoPortfolio maxHeight={maxHeight} />
            </div>
          </div>
        </StyledStocks>
      </OndoDataProvider>
    </XStocksDataProvider>
  );
}

const StyledStocks = styled.div`
  padding: 15px 20px 20px;

  display: flex;
  gap: 10px;
  .left {
    flex: 1;
  }
  .portfolios {
    width: 280px;
  }
`;
