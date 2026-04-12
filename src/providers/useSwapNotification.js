import { useCallback, useMemo, useState } from 'react';
import { hideNotification } from '@mantine/notifications';

import { SwapOrderStatus } from 'src/constants/consts';
import { logOrderNotification } from 'src/utils/log/trade';

import { useNotification } from './useNotification';

export function useShowSwapNotification() {
  const [, setPre] = useState([]);
  const { show } = useNotification();

  const hideAll = useCallback(() => {
    setPre((pre) => {
      pre.forEach((o) => hideNotification(o.id));
      return [];
    });
  }, []);
  // 最多显示最新3个下单
  const showSwapOrder = useCallback(
    ({ order }) => {
      setPre((prev) => {
        const PreList = prev.filter(
          (o) => o.status === SwapOrderStatus.processing
        );
        if (PreList?.length > 2) {
          PreList.slice(0, -2).forEach((o) => hideNotification(o.id));
        }
        return [...PreList, order];
      });
      logOrderNotification({
        method: 'show place swap order',
        order,
      });
      show({
        order,
        id: order.id,
        orderType: 'swap',
        updateOrder: (_order) => {
          setPre((prev) => prev.map((o) => (o.id === _order.id ? _order : o)));
        },
      });
    },
    [show]
  );

  return useMemo(() => {
    return { showSwapOrder, hideAll };
  }, [showSwapOrder, hideAll]);
}
