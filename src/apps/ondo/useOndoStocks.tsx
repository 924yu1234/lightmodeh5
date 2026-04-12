import { useEffect, useMemo, useState } from 'react';
import { orderBy as orderByFn } from 'lodash';

import { fetchOndoAssets } from './dashboard/service';

const cacheData = new Map<string, any>();
export function useOndoStocks() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRefreshIndex(Math.ceil(Date.now() / 15000));
    }, 15000);
  }, [refreshIndex]);

  useEffect(() => {
    const timestamp = Math.ceil(Date.now() / 15000);
    const cacheKey = `${timestamp}`;
    let promise: any;
    if (cacheData?.size > 10) {
      cacheData.clear();
    }
    if (cacheData.has(cacheKey)) {
      promise = cacheData.get(cacheKey);
    } else {
      promise = fetchOndoAssets();
      cacheData.set(cacheKey, promise);
    }
    promise
      .then((resp: any) => {
        setList(resp);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return useMemo(() => {
    const orderedList = orderByFn(list, 'totalHolders', 'desc');
    return {
      loading,
      list: orderedList,
      total: orderedList?.length || 0,
    };
  }, [loading, list]);
}
