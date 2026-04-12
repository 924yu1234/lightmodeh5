import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';

import { fetchConfigsByType } from '../application/service';
import { useRefreshSwapBalanceIndex } from '../swap/balances/hooks';
import {
  useRefreshTurboRangePostions,
  useRefreshTurboRangePostionsIndex,
  useSetTurboRangeState,
} from './hooks';
import {
  getTurboRangeProducts,
  getTurboRangeStrategyLeaderboards,
  useGetAllTurboRangePositions,
} from './service';
// import { getIntentEarnList } from './intentEarnService';

export default function TurboRangeUpdater() {
  const dispatch = useDispatch();
  const setTurboRangeState = useSetTurboRangeState();
  const { account } = useDexAccount();
  const refreshSwapBalanceIndex = useRefreshSwapBalanceIndex();
  const refreshIndex = useRefresh(15000);

  const getAllTurboRangePositions = useGetAllTurboRangePositions();
  const refreshPositionsIndex = useRefreshTurboRangePostionsIndex();
  const refreshTurboRangePostions = useRefreshTurboRangePostions();

  useEffect(() => {
    setTurboRangeState({
      loadingProducts: true,
      loadingStrategyLeaderboards: true,
    });
  }, [setTurboRangeState]);

  useEffect(() => {
    fetchConfigsByType('turboRanges').then((settings) => {
      const { list } = settings;
      const productsSettings = list.reduce((acc: any, curr: any) => {
        acc[curr.product] = curr;
        return acc;
      }, {});
      setTurboRangeState({ productsSettings });
    });
  }, [setTurboRangeState]);

  useEffect(() => {
    getTurboRangeProducts({ current: 1, pageSize: 100 }).then((resp: any) => {
      (resp.list || []).forEach((product: any) => {
        if (
          !isNumber(product.currentPrice) ||
          Number(product.currentPrice) <= 0
        ) {
          logTurboRange({
            event: 'turbo range product current price is 0',
            product: product.name,
            currentPrice: product.currentPrice,
          });
        }
      });
      setTurboRangeState({ products: resp.list, loadingProducts: false });
    });
  }, [dispatch, setTurboRangeState, refreshPositionsIndex, refreshIndex]);

  useEffect(() => {
    getTurboRangeStrategyLeaderboards()
      .then((resp: any) => {
        setTurboRangeState({
          strategyLeaderboards: resp,
          loadingStrategyLeaderboards: false,
        });
      })
      .catch(() => {
        setTurboRangeState({
          loadingStrategyLeaderboards: false,
        });
      });
  }, [setTurboRangeState, refreshIndex]);

  useEffect(() => {
    setTurboRangeState({
      loadingPositions: true,
    });
  }, [account, setTurboRangeState]);

  useEffect(() => {
    getAllTurboRangePositions({ status: 'OPEN' }).then((resp: any) => {
      setTurboRangeState({ positions: resp.list, loadingPositions: false });
    });
  }, [getAllTurboRangePositions, setTurboRangeState, refreshPositionsIndex]);

  useEffect(() => {
    if (window.hasTurboRangeOrder) {
      refreshTurboRangePostions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSwapBalanceIndex]);

  return null;
}
