import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useUpdateFromHotPairs } from '../tokenInfo/hooks';
import { useSwapPairsForTypes } from './hooks';
import { updateStocksPairs } from './reducer';

export default function SwapPairsUpdater() {
  const dispatch = useDispatch();
  const updateFromPairs = useUpdateFromHotPairs();
  const { list } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 100,
    orderBy: 'index',
    orderDir: 'asc',
  });

  useEffect(() => {
    if (list.length > 0) {
      dispatch(updateStocksPairs({ pairs: list }));
      updateFromPairs({ pairs: list });
    }
  }, [list, dispatch, updateFromPairs]);

  return null;
}
