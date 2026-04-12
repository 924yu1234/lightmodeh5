import React from 'react';
import data from 'imgs/coding.json';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';

export default function ChartUnavailable() {
  const intl = useIntl();
  return (
    <StyledChartUnavailable>
      <div className="svg">
        <Lottie animationData={data} loop />
      </div>
      <div className="error-message">{intl.chart_is_currently_unavailable}</div>
    </StyledChartUnavailable>
  );
}

const StyledChartUnavailable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .svg div {
    width: 40px;
    height: 40px;
  }
  .error-message {
    margin-top: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.t_b7b};
  }
`;
