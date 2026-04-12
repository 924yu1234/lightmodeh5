import { useEffect, useMemo, useState } from 'react';

import { SwapOrderStatus } from 'src/constants/consts';
import { useFetchEarnHistory } from 'src/state/intent/earn/service';

export function useEarnOrderProgress({
  order,
  intent_id,
}: {
  order: any;
  intent_id: number;
}) {
  const [data, setData] = useState<any>(order);
  useEffect(() => {
    setData(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.intent_id]);

  const [index, setIndex] = useState(0);

  const fetchHistory = useFetchEarnHistory();

  useEffect(() => {
    if (data?.status && data?.status !== SwapOrderStatus.processing) {
      return () => {};
    }
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, data, order]);

  useEffect(() => {
    if (data?.status !== SwapOrderStatus.processing && data?.status) {
      return;
    }
    if (!intent_id || !fetchHistory) return;

    fetchHistory({
      pageSize: 10,
      current: 1,
      intent_id,
    }).then((resp) => {
      const res = resp.list.find((d: any) => d.intent_id === intent_id);
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHistory, intent_id, index]);

  return useMemo(() => {
    return data;
  }, [data]);
}
