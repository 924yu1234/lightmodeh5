import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconStatusFailed from 'src/components/Icons/StatusFailed';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import Loader from 'src/components/Loader';
import { SwapOrderStatus } from 'src/constants/consts';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { SwapOrder } from 'src/state/swap/orders/convertSwapOrder';
import { ThemeType } from 'src/theme';

import ItemToken from './itemToken';

export default function OrderItem({
  order,
  style,
}: {
  order: SwapOrder;
  style: any;
}) {
  const showModal = useShowModal();

  const {
    status,
    create_time_display_mini,
    pay_display_max7,
    buy_display,
    receive_display_max7,
    pay_token,
    receive_token,
  } = order;

  return (
    <StyledItem
      className="orders-list-item"
      style={style}
      onClick={() => {
        showModal({
          modal: ModalKeys.swapOrderDetail,
          listData: order,
          orderId: order.id,
        });
      }}
    >
      <div className="item-status">
        <IconWrapper size={18}>
          <>
            {status === SwapOrderStatus.processing && <Loader />}
            {status === SwapOrderStatus.success && <IconStatusSuccess />}
            {status === SwapOrderStatus.quickSuccess && <IconStatusSuccess />}
            {status === SwapOrderStatus.failed && <IconStatusFailed />}
          </>
        </IconWrapper>
      </div>
      <div className="item-orders">
        {status !== SwapOrderStatus.success ? (
          <div className="item-order">
            {pay_display_max7} <ItemToken token={pay_token} />
            <span>➝</span>
            {buy_display} <ItemToken token={receive_token} />
          </div>
        ) : (
          <div className="item-order">
            {pay_display_max7} <ItemToken token={pay_token} />
            <span>➝</span>
            {receive_display_max7} <ItemToken token={receive_token} />
          </div>
        )}
        <div className="item-time">{create_time_display_mini}</div>
      </div>
    </StyledItem>
  );
}

OrderItem.propTypes = {
  order: PropTypes.object,
  style: PropTypes.object,
};

const StyledItem = styled.div`
  margin-bottom: 10px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  padding: 15px 15px 10px;
  min-height: 65px;
  background: ${(props) => props.theme.bg_05};
  border-radius: 8px;

  display: flex;
  align-items: flex-start;

  .item-status {
    margin-right: 5px;
  }

  .item-time {
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }

  .item-order {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
