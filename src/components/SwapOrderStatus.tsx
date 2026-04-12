import React from 'react';
import styled from 'styled-components';

import { SwapOrder } from 'src/state/swap/orders/convertSwapOrder';
import { useGetSwapOrderError } from 'src/state/swap/orders/hooks';
import { useSwapDataMap } from 'src/state/swap/orders/utils';

import DeTooltip from './DeTooltip';

export default function SwapOrderStatusEle({
  status,
  errorCode,
  showIcon = true,
  showFailReason = true,
}: {
  status: string;
  errorCode?: string;
  showIcon?: boolean;
  showFailReason?: boolean;
}) {
  const { statusMap, statusEleMap } = useSwapDataMap();
  const str = (showIcon ? statusMap[status] : statusEleMap[status]) || status;
  const getSwapOrderError = useGetSwapOrderError();
  const failReason = getSwapOrderError({ errorCode } as SwapOrder);

  return (
    <StyledTxStatus className={`spot_order_status ${status}`}>
      {showIcon && <i className="spot_order_status_icon" />}
      <span className="spot_order_status_txt">{str}</span>
      {showFailReason && failReason && (
        <DeTooltip title={<div>{failReason}</div>} />
      )}
    </StyledTxStatus>
  );
}

const StyledTxStatus = styled.div`
  display: flex;
  align-items: center;
  .spot_order_status_icon {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.blue1};
    margin-right: 6px;
  }
  &.FAILED,
  &.PROCESSING {
    i {
      background-color: ${(props) => props.theme.gray};
    }
  }
  &.COMPLETED {
    i {
      background-color: ${(props) => props.theme.green};
    }
  }
`;
