import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import OndoDetailProvider from 'src/apps/ondo/detail/dataProvider';
import HoldersAndTvl from 'src/apps/ondo/detail/holdersAndTvl';
import Info from 'src/apps/ondo/detail/info';
import News from 'src/apps/ondo/detail/news';
import Token from 'src/apps/ondo/detail/token';
import TradingView from 'src/apps/ondo/detail/tradingView';
import Volume from 'src/apps/ondo/detail/volume';
import { useShowH5Header } from 'src/h5/utils';
import Header from 'src/mobiles/components/header';
import { useThemeParams } from 'src/theme';

import { StyledOndoDetail } from './style';

export default function OndoDetail() {
  const showH5Header = useShowH5Header();
  const { code } = useParams();

  const { viewWidth } = useThemeParams();

  const chartWidth = useMemo(() => {
    return viewWidth - 20;
  }, [viewWidth]);

  const chartHeight = useMemo(() => {
    return (chartWidth / 16) * 10;
  }, [chartWidth]);

  return (
    <OndoDetailProvider code={code ?? ''}>
      <StyledOndoDetail>
        {showH5Header && <Header title="" backUrl="/stocks/ondo" />}
        <div className="detail-inner">
          <Token />
          <Info />
          <News />
          <div style={{ marginTop: '15px' }}>
            <TradingView width={chartWidth} height={500} />
          </div>
          <div className="charts-container">
            <HoldersAndTvl width={chartWidth} height={chartHeight} />
            <Volume width={chartWidth} height={chartHeight} code={code ?? ''} />
          </div>
        </div>
      </StyledOndoDetail>
    </OndoDetailProvider>
  );
}
