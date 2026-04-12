/* eslint-disable simple-import-sort/imports */
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useThemeParams } from 'src/theme';
import { useSetTitle } from 'src/providers/useWallet';
import { useIntl } from 'src/locals';
import Trades from './trades';
import Summary from './summary';
import Volume from './volume';
import TotalAum from './totalAum';
import Holders from './holders';
import Heatmap from './heatmap';

export default function OndoDashboard() {
  const { viewWidth } = useThemeParams();
  const setDocumentTitle = useSetTitle();
  const intl = useIntl();

  useEffect(() => {
    setDocumentTitle(intl.stocks.stocks_doc_title);
    return () => {
      setDocumentTitle('');
    };
  }, [intl.stocks.stocks_doc_title, setDocumentTitle]);

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

  return (
    <Wrapper>
      <Summary />
      <div className="chart-container">
        <div className="chart-item">
          <TotalAum width={chartWidth} height={chartHeight} />
        </div>
        <div className="chart-item">
          <Holders width={chartWidth} height={chartHeight} />
        </div>
        <div className="chart-item">
          <Volume width={chartWidth} height={chartHeight} />
        </div>
        <div className="chart-item">
          <Trades width={chartWidth} height={chartHeight} />
        </div>
        <div className="chart-item heatmap-item">
          <Heatmap width={heatmapWidth} height={heatmapHeight} />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .chart-container {
    flex: 1;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;

    .chart-item {
      flex: 0 0 calc(50% - 10px); // 每行2个，减去gap的一半
      max-width: calc(50% - 10px);
    }

    .heatmap-item {
      flex: 0 0 100%;
      max-width: 100%;
      width: 100%;
    }
  }
`;
