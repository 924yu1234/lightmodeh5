import React, { useMemo, useState } from 'react';

import Empty from 'src/components/Empty';
import { useBalancesWithTopTokens } from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import {
  useCurrentSwapPair,
  useSwapQuoteTokens,
} from 'src/state/swap/pair/hooks';

import InfiniteList from '../InfiniteList';
import BalanceTabItem from './item';

export default function MBalanceTab({
  scrollableTarget,
}: {
  scrollableTarget: string;
}) {
  const [current, setCurrent] = useState(1);
  const intl = useIntl();
  const quoteTokens = useSwapQuoteTokens();
  const { baseToken } = useCurrentSwapPair();
  const topTokens = useMemo(() => {
    return [baseToken, ...quoteTokens].filter((d) => d?.code);
  }, [baseToken, quoteTokens]);
  const list = useBalancesWithTopTokens({
    topTokens,
  });

  const pageSize = 20;
  const total = list.length;
  const showList = list.slice(0, current * pageSize);
  const hasNext = total > current * pageSize;

  if (list?.length === 0) {
    return (
      <Empty source="trade_openOrders">
        <div className="empty-text">{intl.no_data}</div>
      </Empty>
    );
  }

  return (
    <InfiniteList
      dataLength={showList.length}
      next={() => {
        setCurrent(current + 1);
      }}
      pullDownToRefresh={false}
      hasMore={hasNext}
      scrollableTarget={scrollableTarget}
      refreshFunction={() => {}}
      hideNoMore
    >
      {showList.map((balance: any) => {
        return <BalanceTabItem balance={balance} key={balance?.id} />;
      })}
    </InfiniteList>
  );
}
