import React, { useEffect, useState } from 'react';

import SwapPairInfo from 'src/commonComponents/pairInfo/swapPairInfo';
import Spin from 'src/components/Spin';
import { getSwapPairTicker } from 'src/state/swap/pair/services/ticker';

export default function SwapPair({ pairId }: { pairId: number }) {
  const [pair, setPair] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSwapPairTicker({ pairId })
      .then((resp: any) => {
        setPair(resp);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [pairId]);

  const { baseToken } = (pair || {}) as any;

  return (
    <Spin spinning={loading}>
      <SwapPairInfo baseToken={baseToken} />
    </Spin>
  );
}
