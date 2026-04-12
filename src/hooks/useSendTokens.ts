import { useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';

import { useFungibleUsdc } from 'src/state/swap/balances/hooks';
import digit from 'src/utils/digit';
import { formatUsd } from 'src/utils/format';
import { multiply } from 'src/utils/numberUtils';

import { useBalances, useBalancesInList } from './useAssets';

export function useSwapSendTokens() {
  const balances = useBalances();

  return useMemo(() => {
    // TODO 显示默认列表
    if (balances.length === 0) {
      return [];
    }

    const _tokens = balances
      .map((token: any) => {
        const tokenPrice = token?.price ?? '';
        const available = token?.available;
        const value = multiply(tokenPrice, available, { toNumber: true }) || 0;
        let valueDisplay = '0';
        if (Number(value) > 0) {
          if (Number(value) < 0.01) {
            valueDisplay = '<0.01';
          } else {
            valueDisplay = digit.format(value, '0.##', { floor: true });
          }
        }
        return {
          ...token,
          value,
          valueDisplay,
          availableValue: value,
          availableValueDisplay: valueDisplay,
        };
      })
      .filter((token: any) => token.available > 0);
    const _list = orderByFn(_tokens, ['value', 'symbol'], ['desc', 'asc']);
    return _list;
  }, [balances]);
}

export function useSwapSendV2Tokens() {
  const balances = useBalancesInList();
  const fungibleUsdc = useFungibleUsdc();

  return useMemo(() => {
    if (balances.length === 0) {
      return [fungibleUsdc];
    }

    const _tokens = balances
      .map((token: any) => {
        const tokenPrice = token?.price ?? '';
        const available = token?.available;
        const value = multiply(tokenPrice, available, { toNumber: true }) || 0;
        return {
          ...token,
          value,
          valueDisplay: formatUsd(value),
          availableValue: value,
          availableValueDisplay: formatUsd(value),
        };
      })
      .filter((token: any) => token.available > 0);
    let _list = orderByFn(_tokens, ['value', 'symbol'], ['desc', 'asc']);
    if (fungibleUsdc.availableNumber > 0) {
      _list = [fungibleUsdc].concat(_list);
    }
    return _list;
  }, [balances, fungibleUsdc]);
}
