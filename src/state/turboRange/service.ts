import { useCallback } from 'react';
import dayjs from 'dayjs';

import { TurboRangeHistoryType } from 'src/constants/consts';
import { formatUnits } from 'src/ethers/utils';
import digit, { isNumber } from 'src/utils/digit';
import { formatUsd } from 'src/utils/format';
import { minus, multiply, plus } from 'src/utils/numberUtils';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

import {
  convertTurboRangePosition,
  convertTurboRangeProduct,
  convertTurboRangeStrategyLeaderboardItem,
} from './utils';

export function getTurboRangeProducts({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}) {
  return axios({
    method: 'GET',
    url: '/order-book-api/turbo-range/products',
    params: {
      limit: pageSize,
      offset: (current - 1) * pageSize,
    },
  }).then((resp: any) => {
    const { items } = resp.data;
    return { list: items.map(convertTurboRangeProduct) };
  });
}

export function getTurboRangeStrategyLeaderboards() {
  return axios({
    method: 'GET',
    url: '/order-book-api/turbo-range/strategies/leaderboards',
    cacheTime: 1000 * 10,
  }).then((resp: any) => {
    const {
      boards = {},
      updated_at = 0,
      current_price_snapshot_at = 0,
    } = resp.data || {};

    return {
      updatedAt: updated_at * 1000,
      currentPriceSnapshotAt: current_price_snapshot_at * 1000,
      topApy: (boards.top_apy?.items || []).map(
        convertTurboRangeStrategyLeaderboardItem
      ),
      hotToday: (boards.hot_today?.items || []).map(
        convertTurboRangeStrategyLeaderboardItem
      ),
      bestReturns: (boards.best_returns?.items || []).map(
        convertTurboRangeStrategyLeaderboardItem
      ),
    };
  });
}

export const useGetAllTurboRangePositions = () => {
  const fetchTurboRangePositions = useGetTurboRangePositions();
  const dexAccount = useDexAccount();
  const pageSize = 100;

  const fetchPositions = useCallback(
    ({
      preList = [],
      hasNext,
      current = 1,
      total,
      status = 'OPEN',
    }: {
      preList: any[];
      hasNext: boolean;
      current: number;
      total: number;
      status?: 'OPEN' | 'CLOSED';
    }) => {
      return new Promise((resolve) => {
        if (!hasNext) {
          resolve({ list: preList, hasNext, current, total });
          return;
        }
        fetchTurboRangePositions({
          status,
          pageSize,
          offset: (current - 1) * pageSize,
        }).then((resp: any) => {
          const { list, total, hasNext } = resp;
          resolve(
            fetchPositions({
              total,
              hasNext,
              preList: preList.concat(list || []),
              current: current + 1,
            })
          );
        });
      });
    },
    [fetchTurboRangePositions]
  );

  return useCallback(
    ({ status = 'OPEN' }: { status?: 'OPEN' | 'CLOSED' }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({ list: [], total: 0, hasNext: false });
      }
      return fetchPositions({
        hasNext: true,
        current: 1,
        preList: [],
        total: 0,
        status,
      });
    },
    [dexAccount?.hasAccessToken, fetchPositions]
  );
};

export function useGetTurboRangePositions() {
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({
      pageSize = 100,
      offset = 0,
      status,
      intentId,
    }: {
      pageSize: number;
      offset: number;
      status?: 'OPEN' | 'CLOSED';
      intentId?: number;
    }) => {
      const headers = createHeaders();
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          total: 0,
          hasNext: false,
        });
      }
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/turboRange',
        cacheTime: window.turboRangeOprTime ? 1000 : 1000 * 60,
        headers,
        params: {
          limit: pageSize,
          offset,
          status,
          intent_id: intentId,
        },
      }).then((resp: any) => {
        const { positions, total } = resp.data;
        return {
          list: positions.map(convertTurboRangePosition),
          total,
          hasNext: total > offset + pageSize,
        };
      });
    },
    [createHeaders, dexAccount.hasAccessToken]
  );
}

export function useGetTurboRangeDetail() {
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({
      positionAddress,
      checkInitRet,
    }: {
      positionAddress: string;
      checkInitRet?: boolean;
    }) => {
      const headers = createHeaders();
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({});
      }
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/turboRange/detail',
        cacheTime: 1000,
        headers,
        params: {
          position: positionAddress,
          check_init_ret: checkInitRet,
        },
      }).then((resp: any) => {
        return convertTurboRangePosition({
          ...resp.data,
          ...resp.data.position,
        });
      });
    },
    [createHeaders, dexAccount.hasAccessToken]
  );
}

export const useFetchTurboRangeHistory = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({
      current,
      pageSize,
      start,
      end,
      intent_id,
      status,
      position,
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
      status?: 'PROCESSING' | 'SUCCESS' | 'FAILED';
      position?: string;
    }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          total: 0,
        });
      }
      const headers = createHeaders();
      const apiParams = {
        limit: pageSize,
        offset: (current - 1) * pageSize,
        start,
        end,
        intent_id,
        status,
        position,
      };

      const url = `/order-book-api/turbo-range/history`;

      return axios({
        url,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || [])
              .filter((d: any) => !!d.type)
              .map((d: any) => {
                if (d.type === TurboRangeHistoryType.LP_WITHDRAW) {
                  return convertWithdrawTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_CLAIM) {
                  return convertRewardTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_ADD_DEPOSIT) {
                  return convertInvestTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_DEPOSIT) {
                  return convertInvestTurboRangeHistory(d);
                }
                return {};
              }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const useFetchTurboRangePositionHistory = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({ position }: { position?: string }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          total: 0,
        });
      }
      const headers = createHeaders();
      const apiParams = {
        position,
      };

      const url = `/order-book-api/turbo-range/position/history`;

      return axios({
        url,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || [])
              .filter((d: any) => !!d.type)
              .map((d: any) => {
                if (d.type === TurboRangeHistoryType.LP_WITHDRAW) {
                  return convertWithdrawTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_CLAIM) {
                  return convertRewardTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_ADD_DEPOSIT) {
                  return convertInvestTurboRangeHistory(d);
                }
                if (d.type === TurboRangeHistoryType.LP_DEPOSIT) {
                  return convertInvestTurboRangeHistory(d);
                }
                return {};
              }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

const convertInvestTurboRangeHistory = (d: any) => {
  const token = d.token;
  const amount = isNumber(token.amount)
    ? formatUnits(token?.amount, token.decimals)
    : '--';

  let investValue = '0';
  let depositTokens = d.deposit_tokens || [];
  depositTokens = depositTokens
    .map((t: any) => {
      const amount = isNumber(t.amount)
        ? formatUnits(t?.amount, t.decimals)
        : '--';
      investValue = plus(
        investValue,
        multiply(amount, t.price, { toNumber: true })
      ) as string;
      return {
        ...t,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '--',
        amount_display_less8: digit.formatWithDecimalsLess8(
          amount,
          token.decimals,
          { groupSeparator: true }
        ),
      };
    })
    .filter((t: any) => t.amount > 0);

  let capital_updates_tokens = d.capital_updates_tokens || [];
  capital_updates_tokens = capital_updates_tokens.map((t: any) => {
    const amount = isNumber(t.amount)
      ? formatUnits(t?.amount, t.decimals)
      : '--';
    return {
      ...t,
      amount,
      amount_display: digit.formatInGroupSeparator(amount) || '--',
    };
  });
  let retValue = '0';
  let returnTokens = d.return_tokens || [];
  returnTokens = returnTokens
    .filter((t: any) => !!t.amount)
    .map((t: any) => {
      const amount = isNumber(t.amount)
        ? formatUnits(t?.amount, t.decimals)
        : '--';
      retValue = plus(
        retValue,
        multiply(amount, t.price, { toNumber: true })
      ) as string;
      return {
        ...t,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '--',
      };
    });

  const pool = d.pool_name?.split('-')?.[0];
  const principalValue = minus(investValue, retValue) as string;
  return {
    ...d,
    principalValue,
    principalValue_display: formatUsd(principalValue),
    retValue,
    retValue_display: formatUsd(retValue),
    errorCode: d.error_code,
    poolAddress: d.pool_address,
    depositTokens, // 用户付出
    capitalTokens: capital_updates_tokens, // 用户实际投入到LP
    returnTokens, // 退回
    amount,
    amount_display: digit.formatInGroupSeparator(amount) || '--',
    token,
    pool,
    tokens: depositTokens,
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};

const convertWithdrawTurboRangeHistory = (d: any) => {
  const pool = d.pool_name?.split('-')?.[0];
  let withdrawn_value = '0';
  let withdraw_tokens = d.withdraw_tokens || [];
  withdraw_tokens = withdraw_tokens.map((token: any) => {
    const amount = isNumber(token.amount)
      ? formatUnits(token?.amount, token.decimals)
      : '--';

    let tokenPrice = token.price;
    if (token?.symbol === 'USDC' && d.tokens?.length === 1) {
      tokenPrice = 1;
    }

    withdrawn_value = plus(
      withdrawn_value,
      multiply(amount, tokenPrice, { toNumber: true })
    ) as string;
    return {
      ...token,
      amount,
      amount_display: digit.formatInGroupSeparator(amount) || '',
      amount_display_less8: digit.formatWithDecimalsLess8(
        amount,
        token.decimals,
        { groupSeparator: true }
      ),
    };
  });
  let rewards_value = '0';
  let rewards = d.claimed_tokens || [];
  rewards = (rewards?.length > 0 ? rewards : d.rewards || []).map(
    (token: any) => {
      const amount = isNumber(token.amount)
        ? formatUnits(token?.amount, token.decimals)
        : '--';
      let tokenPrice = token.price;
      if (token?.symbol === 'USDC' && d.rewards?.length === 1) {
        tokenPrice = 1;
      }
      rewards_value = plus(
        rewards_value,
        multiply(amount, tokenPrice, { toNumber: true })
      ) as string;
      return {
        ...token,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '',
      };
    }
  );
  return {
    ...d,
    poolAddress: d.pool_address,
    errorCode: d.error_code,
    pool,
    tokens: withdraw_tokens, // 用户实际提现数量
    withdrawn_value,
    withdrawn_value_display: formatUsd(withdrawn_value),
    rewards_value,
    rewards_value_display: formatUsd(rewards_value),
    rewards,
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};

const convertRewardTurboRangeHistory = (d: any) => {
  const pool = d.pool_name?.split('-')?.[0];

  let rewards_value = '0';
  let tokens = d.claimed_tokens || [];
  tokens = (tokens?.length > 0 ? tokens : d.tokens || []).map((token: any) => {
    const amount = isNumber(token.amount)
      ? formatUnits(token?.amount, token.decimals)
      : '--';
    let tokenPrice = token.price;
    if (token?.symbol === 'USDC' && d.tokens?.length === 1) {
      tokenPrice = 1;
    }
    rewards_value = plus(
      rewards_value,
      multiply(amount, tokenPrice, { toNumber: true })
    ) as string;
    return {
      ...token,
      amount,
      amount_display: digit.formatInGroupSeparator(amount) || '',
      amount_display_less8: digit.formatWithDecimalsLess8(
        amount,
        token.decimals,
        { groupSeparator: true }
      ),
    };
  });

  return {
    ...d,
    errorCode: d.error_code,
    poolAddress: d.pool_address,
    pool,
    tokens,
    rewards_value,
    rewards_value_display: formatUsd(rewards_value),
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};
