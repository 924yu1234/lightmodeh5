import React from 'react';
import styled from 'styled-components';

import IconHistoryOprSwap from 'src/components/Icons/historyOprSwap';
import Loader from 'src/components/Loader';
import { SwapOrderStatus } from 'src/constants/consts';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { SwapOrder } from 'src/state/swap/orders/convertSwapOrder';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function OrderItem({
  order,
  showTime,
  isFrstDay,
}: {
  order: SwapOrder;
  showTime: string;
  isFrstDay: boolean;
}) {
  const intl = useIntl();
  const showModal = useShowModal();
  const {
    status,
    pay_display_max7,
    buy_display,
    receive_display_max7,
    pay_token,
    receive_token,
  } = order;

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div
        className="history-item-inner"
        onClick={() => {
          showModal({
            modal: ModalKeys.swapOrderDetail,
            listData: order,
            orderId: order.id,
          });
        }}
      >
        {order.status === SwapOrderStatus?.processing ? (
          <Loader size={28} />
        ) : (
          <IconHistoryOprSwap size={28} />
        )}
        <div className="item-text">
          {intl.Swap}
          {status === SwapOrderStatus.failed && (
            <div className="tag-failed">{intl.Failed}</div>
          )}
        </div>

        <div className="amount">
          <div className="amount-receive">
            +
            {receive_display_max7 === '--' ? buy_display : receive_display_max7}{' '}
            {receive_token?.symbol}
          </div>
          <div className="amount-pay">
            -{pay_display_max7} {pay_token?.symbol}
          </div>
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  .history-item-inner {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 30px;
    height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
  .icon-tab-swap {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }
  .item-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_f4f};
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tag-failed {
    background: ${({ theme }) => theme.bg_white_07};
    border-radius: 2px;
    padding: 0 10px;
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    height: 20px;
    line-height: 20px;
  }

  .amount {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    text-align: right;
    .amount-receive {
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    .amount-pay {
      font-size: 11px;
      line-height: 11px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
