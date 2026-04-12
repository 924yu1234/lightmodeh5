import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import IconFold from 'src/components/Icons/fold';
import IconLeftOutlined from 'src/components/Icons/LeftOutlined';
import IconUnfold from 'src/components/Icons/unfold';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useThemeParams } from 'src/theme';

import XStockDetailProvider from './dataProvider';
import HoldersAndTvl from './holdersAndTvl';
import Info from './info';
import News from './news';
import Portfolio from './portfolio';
import { StyledXStocksDetail } from './style';
import Token from './token';
import TradingView from './tradingView';
import Volume from './volume';

export default function OndoDetail() {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const { code } = useParams();
  const [showList, setShowList] = useState(true);

  const { viewWidth, windowHeight } = useThemeParams();
  const centerWidth = useMemo(
    () => viewWidth - 280 - 70 - (showList ? 300 : 20),
    [viewWidth, showList]
  );

  const chartWidth = useMemo(() => {
    const leftWidth = centerWidth;
    const width = viewWidth < 1280 ? leftWidth : (leftWidth - 20) / 2;
    return width;
  }, [centerWidth, viewWidth]);

  const chartHeight = useMemo(() => {
    return (chartWidth / 16) * 10;
  }, [chartWidth]);

  const tradingViewHeight = useMemo(() => {
    return Math.min(Math.max((centerWidth / 16) * 10, 300), 500);
  }, [centerWidth]);

  const contentRef = useRef<HTMLDivElement>(null);

  const maxHeight = useMemo(() => {
    const contentHeight = contentRef?.current?.clientHeight;
    if (!contentHeight) return windowHeight - 60 - 120 - 50;
    if (contentHeight > windowHeight) return contentHeight - 120;
    return windowHeight - 60 - 120 - 50;
  }, [contentRef, windowHeight]);

  return (
    <XStockDetailProvider code={code ?? ''}>
      <StyledXStocksDetail>
        <div className="detail-inner">
          <div className="go_back">
            <div
              className="go_back_inner"
              onClick={() => {
                navigate('/stocks/ondo');
              }}
            >
              <IconLeftOutlined size={12} />
              {intl.go_back}
            </div>
          </div>
          <div className="detail-content" ref={contentRef}>
            <div className="detail-content-left">
              <Token />
              <Info />
              <News />
            </div>
            <div className="detail-content-right">
              <TradingView width={centerWidth} height={tradingViewHeight} />
              <div className="charts-container">
                <div className="chart-item">
                  <HoldersAndTvl width={chartWidth} height={chartHeight} />
                </div>
                <div className="chart-item">
                  <Volume
                    width={chartWidth}
                    height={chartHeight}
                    code={code ?? ''}
                  />
                  {/* <VolumeAndLiquidity width={chartWidth} height={chartHeight} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`detail-content-portfolio ${showList ? 'open' : ''}`}>
          <div
            className="icon-container"
            onClick={() => setShowList(!showList)}
          >
            {showList ? <IconFold size={14} /> : <IconUnfold size={14} />}
          </div>
          {showList && <Portfolio maxHeight={maxHeight} />}
        </div>
      </StyledXStocksDetail>
    </XStockDetailProvider>
  );
}
