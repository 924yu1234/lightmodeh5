import React, { useMemo } from 'react';
import styled from 'styled-components';

import Loader from 'src/components/Loader';
import { OrderDirs } from 'src/constants/interface';

import { SwapOrderStatus } from 'js/constants/consts';
import { useIntl } from 'js/locals';

export const Day1 = '1_day';
export const Week1 = '1_week';
export const Month1 = '1_month';
export const Month3 = '3_months';

export const useSwapDataMap = () => {
  const intl = useIntl();
  return useMemo(() => {
    return {
      orderDirMap: {
        [OrderDirs.BUY]: (
          <div className="color-buy">{intl['orders.side_buy']}</div>
        ),
        [OrderDirs.SELL]: (
          <div className="color-sell">{intl['orders.side_sell']}</div>
        ),
      },
      statusEleMap: {
        [SwapOrderStatus.processing]: (
          <StyledProcessing>
            <Loader />
            {intl.status_processing}
          </StyledProcessing>
        ),
        [SwapOrderStatus.success]: intl.status_success,
        [SwapOrderStatus.quickSuccess]: intl.status_success,
        [SwapOrderStatus.failed]: intl.status_fail,
        [SwapOrderStatus.quickSuccess]: intl.status_success,
      },
      statusMap: {
        [SwapOrderStatus.processing]: intl.status_processing,
        [SwapOrderStatus.success]: intl.status_success,
        [SwapOrderStatus.quickSuccess]: intl.status_success,
        [SwapOrderStatus.failed]: intl.status_fail,
      },
    };
  }, [intl]);
};

const StyledProcessing = styled.div`
  display: flex;
  align-items: center;
  .loader {
    margin-right: 5px;
  }
`;
