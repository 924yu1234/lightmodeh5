import { useEffect, useMemo, useState } from 'react';

import { SendStatus } from 'src/constants/consts';
import { useFetchIntentSendHistory } from 'src/state/dexAccount/services/sendHistory';

export default function useWithdrawDataRefresh({ item }: { item: any }) {
  const [data, setData] = useState<any>(item);

  useEffect(() => {
    setData(item);
  }, [item]);

  const [index, setIndex] = useState(0);
  const fetchHistory = useFetchIntentSendHistory();
  const withdraw_id = item?.withdraw_id || item?.withdrawal_id;

  useEffect(() => {
    if (data?.status !== SendStatus.processing && data?.status) {
      return () => {};
    }
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, data]);

  useEffect(() => {
    if (data?.status !== SendStatus.processing && data?.status) {
      return;
    }
    if (!withdraw_id) return;
    fetchHistory({
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
  }, [fetchHistory, withdraw_id, index]);

  return useMemo(() => {
    return {
      ...item,
      ...data,
    };
  }, [data, item]);
}
