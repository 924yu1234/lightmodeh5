import React from 'react';
import styled from 'styled-components';

import ChartUnavailable from 'src/components/chartUnavaliable';

export default function TradingView({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element | null {
  return (
    <StyledChart style={{ width, height }}>
      <ChartUnavailable />
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 100%;
  height: 600px;
  background: rgba(58, 66, 89, 0.7);
  .chart-spin {
    height: 100%;
  }
  .spin-inner {
    height: 100%;
  }
`;
