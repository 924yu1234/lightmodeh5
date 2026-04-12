import React, { useEffect, useMemo } from 'react';
import { hideNotification } from '@mantine/notifications';
import styled from 'styled-components';

import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { SwapOrder } from 'src/state/swap/orders/convertSwapOrder';
import { ThemeType } from 'src/theme';

import IconStatusFailed from '../Icons/StatusFailed';
import IconStatusSuccess from '../Icons/StatusSuccess';

// quickSuccess时提示订单已成功
// success时余额解锁，不用提示
export default function NotificationSwapOrder({
  notificationId,
  order,
  updateOrder,
}: {
  notificationId: string;
  order: SwapOrder;
  updateOrder: (order: SwapOrder) => void;
}) {
  const intl = useIntl();
  const {
    buy_display,
    receive_display_max7,
    pay_display_max7,
    pay_token,
    receive_token,
    status,
    statusKey,
  } = order;

  const refreshSwapBalance = useRefreshSwapBalance();
  const { hasUnlocked } = useDexAccount();
  const showModal = useShowModal();

  const waitLock = !hasUnlocked && !order?.intent_id;

  useEffect(() => {
    if (order?.status === SwapOrderStatus.canceled) {
      hideNotification(notificationId);
    }
  }, [order?.status, notificationId]);

  useEffect(() => {
    if (order) updateOrder(order as SwapOrder);
    if (
      order?.status === SwapOrderStatus.quickSuccess ||
      order?.status === SwapOrderStatus.success
    ) {
      refreshSwapBalance();
    }
  }, [order, updateOrder, refreshSwapBalance]);

  useEffect(() => {
    const hide = () => {
      hideNotification(notificationId);
    };
    const item = document.getElementById(notificationId);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!item) return () => {};
    item.addEventListener('transitionEnd', hide);
    item.addEventListener('animationend', hide);
    return () => {
      item.removeEventListener('transitionEnd', hide);
      item.removeEventListener('animationend', hide);
    };
  }, [notificationId, statusKey]);

  const title = useMemo(() => {
    if (
      status === SwapOrderStatus.quickSuccess ||
      status === SwapOrderStatus.success
    ) {
      return intl.swap_order_filled;
    }
    if (status === SwapOrderStatus.failed) {
      return intl.swap_order_failed;
    }
    return intl.swap_order_placed;
  }, [status, intl]);

  useEffect(() => {
    if (order?.errorCode > 0) {
      showModal({
        modal: ModalKeys.tips_intent_error,
        errorCode: order?.errorCode,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.errorCode]);

  const desc = useMemo(() => {
    if (
      status === SwapOrderStatus.quickSuccess ||
      status === SwapOrderStatus.success
    ) {
      return `${pay_display_max7} ${pay_token?.symbol} ➝ ${receive_display_max7} ${receive_token?.symbol}`;
    }
    return `${pay_display_max7} ${pay_token?.symbol} ➝ ${buy_display} ${receive_token?.symbol} (${intl.est})`;
  }, [
    status,
    intl,
    buy_display,
    receive_display_max7,
    pay_display_max7,
    pay_token,
    receive_token,
  ]);

  if (!status || waitLock) return null;

  return (
    <StyledNotificationBody className="notification-body dg-notification-body">
      <div className="message-content">
        <div className="title">
          {status === SwapOrderStatus.quickSuccess && <IconStatusSuccess />}
          {status === SwapOrderStatus.success && <IconStatusSuccess />}
          {status === SwapOrderStatus.failed && <IconStatusFailed />}
          {title}
        </div>
        <div className="msg">{desc}</div>
      </div>
      <div className="progress" key={statusKey}>
        <div className="progress-inner" id={notificationId}></div>
      </div>
    </StyledNotificationBody>
  );
}

const StyledNotificationBody = styled.div`
  min-height: 80px;
  .message-content {
    padding: 19px 10px 17px 24px;
    display: flex;
    flex-direction: column;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    line-height: 18px;

    .title {
      display: flex;
      align-items: center;
      min-height: 18px;
      .dg-icon,
      .loader {
        margin-right: 5px;
      }
      margin-bottom: 4px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .msg {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
  }

  @keyframes move {
    0% {
      width: 99%;
    }

    100% {
      width: 0;
    }
  }
  &:hover .progress .progress-inner {
    animation-play-state: paused;
  }
  .progress {
    width: 100%;
    border-radius: 0 0 10px 10px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    .progress-inner {
      background: ${({ theme }: { theme: ThemeType }) => theme.blue};
      height: 5px;
      animation: move 5s linear;
      animation-fill-mode: forwards;
      border-radius: 0 0 0 10px;
    }
  }
`;
