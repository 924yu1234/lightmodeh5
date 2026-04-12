import { useEffect, useMemo, useRef, useState } from 'react';
import { useDocumentVisibility } from '@mantine/hooks';
import { useDebounce } from 'ahooks';

import { OrderDirs } from 'src/constants/interface';
import { useLogSwapInput } from 'src/hooks/useEventTrack/utils/useLogSwap';
import { useSwapEstimate } from 'src/state/intent/estimateProvider';
import { useSwapTickerVal } from 'src/state/swap/pair/hooks';
import {
  useEstimateParams,
  useSwapTradeInfo,
  useSwapTypeInput,
} from 'src/state/swap/trade/hooks';
import { isLessOrEqualThan } from 'src/utils/numberUtils';

export default function IntentSwapUpdater() {
  const { orderDir, estimating, isTryingMax } = useSwapTradeInfo();
  const typeInput = useSwapTypeInput();
  const takerFee = useSwapTickerVal('takerFee');
  const params = useEstimateParams();
  const debounceParams = useDebounce(params, { wait: 500 });
  const documentState = useDocumentVisibility();
  // const refreshIndex = useRefresh(5000);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const logSwapInput = useLogSwapInput();

  const { result, estimate } = useSwapEstimate();

  const needEstimate = useMemo(() => {
    return documentState === 'visible';
  }, [documentState]);

  const storedValue = result[params.key];

  useEffect(() => {
    if (!needEstimate) return;
    if (!params?.sellVolume || isLessOrEqualThan(params?.sellVolume, 0)) {
      typeInput({
        fields: [
          {
            field: 'estimating',
            val: false,
          },
        ],
      });
      return;
    }
    const now = Date.now();
    // 1秒内缓存直接显示
    if (
      storedValue &&
      storedValue.receiveAmount &&
      now - storedValue.estimateTime < 1000
    ) {
      if (params?.isMaxModel && storedValue) {
        const { tokenOutAmount } = storedValue || {};
        logSwapInput('2', {
          chain: params?.sellToken?.chain,
          code: params?.sellToken?.code,
          symbol: params?.sellToken?.symbol,
          available: params?.sellMaxBalance,
          max: params?.sellAmount,
          tokenOutAmount,
        });
        typeInput({
          fields: [
            {
              field: orderDir === OrderDirs.BUY ? 'quoteAmount' : 'baseAmount',
              val: tokenOutAmount,
            },
            {
              field: 'isTryingMax',
              val: 0,
            },
          ],
        });
      }
      typeInput({
        fields: [
          {
            field: orderDir === OrderDirs.BUY ? 'baseAmount' : 'quoteAmount',
            val: storedValue.receiveAmount,
          },
          {
            field: 'estimating',
            val: false,
          },
          {
            field: 'tryResp',
            val: storedValue,
          },
        ],
      });
    } else {
      typeInput({
        fields: [
          {
            field: 'estimating',
            val: true,
          },
        ],
      });
    }
  }, [
    params,
    storedValue,
    typeInput,
    takerFee,
    orderDir,
    estimating,
    needEstimate,
    logSwapInput,
  ]);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const tryStartTime = useRef<number>(0);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    tryStartTime.current = Date.now();
    estimate(debounceParams)
      .then(() => {
        if (debounceParams?.isMaxModel) {
          typeInput({
            fields: [{ field: 'isTryingMax', val: 0 }],
          });
        }
        const tryDuration = Date.now() - tryStartTime.current;
        const nextInterval = Math.max(5000 - tryDuration, 0);

        timer.current = setTimeout(() => {
          setRefreshIndex((pre) => pre + 1);
        }, nextInterval);
      })
      .catch(() => {
        if (debounceParams?.isMaxModel) {
          typeInput({
            fields: [{ field: 'isTryingMax', val: 0 }],
          });
        }
        const tryDuration = Date.now() - tryStartTime.current;
        const nextInterval = Math.max(5000 - tryDuration, 0);

        timer.current = setTimeout(() => {
          setRefreshIndex((pre) => pre + 1);
        }, nextInterval);
      });
  }, [debounceParams, estimate, refreshIndex, isTryingMax, typeInput]);

  return null;
}
