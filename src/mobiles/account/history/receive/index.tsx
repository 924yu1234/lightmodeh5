/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { useUserFlag } from 'src/state/user/hooks';

import MReceiveHistoryList from './list';
import { useFetchEnableReceiveChains } from './service';
import ReceiveTips from './tips';

export default function MReceiveHistory({ height }: { height: number }) {
  const [enableReceiveChains, setEnableReceiveChains] = useState<string[]>([
    'SOLANA',
  ]);
  const fetchEnableReceiveChains = useFetchEnableReceiveChains();
  const chain = useUserFlag('receive_history_filter_chain');

  useEffect(() => {
    fetchEnableReceiveChains().then((resp) => {
      setEnableReceiveChains(resp.map((d: any) => d?.toLowerCase()));
    });
  }, [fetchEnableReceiveChains]);

  if (!enableReceiveChains.includes(chain?.toLowerCase())) {
    return <ReceiveTips />;
  }
  return <MReceiveHistoryList height={height} />;
}
