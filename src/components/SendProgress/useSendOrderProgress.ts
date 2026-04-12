import { useEffect, useState } from 'react';

import { SendStatus } from 'src/constants/consts';
import { useFetchIntentSendHistory } from 'src/state/dexAccount/services/sendHistory';

export default function useSendOrderProgress({
  order,
  withdraw_id,
}: {
  order: any;
  withdraw_id: number;
}) {
  const [data, setData] = useState<any>(order);
  const [index, setIndex] = useState(0);

  const fetchSendHistory = useFetchIntentSendHistory();

  useEffect(() => {
    if (data?.status && data?.status !== SendStatus.processing) {
      return () => {};
    }
    if (!withdraw_id) return () => {};
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, data, order, withdraw_id]);

  useEffect(() => {
    if (data?.status !== SendStatus.processing && data?.status) {
      return;
    }
    if (!withdraw_id || !fetchSendHistory) return;

    fetchSendHistory({
      pageSize: 10,
      current: 1,
      start: undefined,
      end: undefined,
      withdraw_id,
    }).then((resp) => {
      const res = resp.list.find((d: any) => d.withdraw_id === withdraw_id);
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSendHistory, withdraw_id, index]);

  if (!withdraw_id) return null;

  return data;
}
