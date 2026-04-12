import { useCallback } from 'react';
import dayjs from 'dayjs';

import { SwapOrderStatus } from 'src/constants/consts';
import { Default_Claim_Token } from 'src/da';
import { formatUnits } from 'src/ethers/utils';
import digit, { isNumber } from 'src/utils/digit';
import { minus, plus } from 'src/utils/numberUtils';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
export function getIntentEarnList() {
  return axios({
    method: 'GET',
    url: '/order-book-api/earn/vaults',
    params: {
      limit: 100,
      offset: 0,
    },
  }).then((resp: any) => {
    const { vaults } = resp.data;
    return vaults.map(convertEarnVault);
  });
}

export function getIntentEarnDetail(params: any) {
  return axios({
    method: 'POST',
    url: '/intent-omni/intent/get_financial_products',
    data: {
      options: params.options,
      walletAddress: params.walletAddress,
    },
    cacheTime: params.cacheTime || (window.earnOprTime ? 1000 : 1000 * 60),
  }).then((resp: any) => {
    return resp.data.map(convertEarnVaultDetail);
  });
}

const convertEarnVaultDetail = (vaultDetail: any) => {
  const myDepositAmount = isNumber(vaultDetail.myDeposit)
    ? formatUnits(vaultDetail.myDeposit, vaultDetail?.decimals)
    : 0;
  return {
    ...vaultDetail,
    myDepositAmount,
  };
};

export const useFetchEarnDepositHistory = () => {
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
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
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
      };

      return axios({
        url: `/order-book-api/user/earn/deposit`,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || []).map((d: any) => {
              const token = d.token;
              const amount = isNumber(token.amount)
                ? formatUnits(token?.amount, token.decimals)
                : '--';
              let bridgedAmount = '0';
              const isUsdc = token.symbol === 'USDC';
              let usdc_tokens = (d.usdc_tokens || []).map((t: any) => {
                const amount = isNumber(t.amount)
                  ? formatUnits(t?.amount, t.decimals)
                  : '--';
                bridgedAmount = plus(bridgedAmount, amount) as string;
                return {
                  ...t,
                  amount,
                  amount_display: digit.formatInGroupSeparator(amount) || '--',
                };
              });

              const currentChainAmount = minus(amount, bridgedAmount);
              if (isUsdc && Number(currentChainAmount) > 0) {
                usdc_tokens = [
                  {
                    ...token,
                    amount: currentChainAmount,
                    amount_display:
                      digit.formatInGroupSeparator(currentChainAmount) || '--',
                  },
                ].concat(usdc_tokens);
              }

              return {
                ...d,
                usdc_tokens,
                isUsdc,
                amount,
                amount_display: digit.formatInGroupSeparator(amount) || '--',
                token,
                create_time_display: dayjs(d.timestamp * 1000).format(
                  'YYYY-MM-DD HH:mm:ss'
                ),
              };
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const useFetchEarnWithdrawHistory = () => {
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
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
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
      };

      return axios({
        url: `/order-book-api/user/earn/withdraw`,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || []).map((d: any) => {
              const token = d.token;
              const amount = isNumber(token.amount)
                ? formatUnits(token?.amount, token.decimals)
                : '--';
              return {
                ...d,
                amount,
                amount_display: digit.formatInGroupSeparator(amount) || '--',
                token,
                create_time_display: dayjs(d.timestamp * 1000).format(
                  'YYYY-MM-DD HH:mm:ss'
                ),
              };
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const useFetchEarnClaimHistory = () => {
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
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
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
      };

      return axios({
        url: `/order-book-api/user/earn/rewards`,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || []).map((d: any) => {
              let tokens = d.tokens || [];
              if (
                d.status === SwapOrderStatus.failed ||
                d.status === SwapOrderStatus.processing
              ) {
                tokens = [Default_Claim_Token[d.protocol]];
              }

              return {
                ...d,
                tokens: tokens.map((token: any) => {
                  const amount = isNumber(token.amount)
                    ? formatUnits(token?.amount, token.decimals)
                    : '--';
                  return {
                    ...token,
                    amount,
                    amount_display: digit.formatInGroupSeparator(amount) || '',
                  };
                }),
                create_time_display: dayjs(d.timestamp * 1000).format(
                  'YYYY-MM-DD HH:mm:ss'
                ),
              };
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

const convertEarnVault = (vault: any) => {
  return {
    id: vault.vault_id,
    protocol: vault.protocol,
    name: vault.vault_name || '-',
    shortName: vault.short_name || '-',
    website: vault.vault_website,
    chain: vault.chain,
    token: vault.token,
    address: vault.vault_address,
    descriptions: vault.descriptions,
  };
};

export function formatTvl(number: number) {
  if (!isNumber(number)) return '';
  if (number > 1000_000_000) {
    return `${digit.format(number / 1000_000_000, '0.00')}B`;
  }
  if (number > 1000_000) {
    return `${digit.format(number / 1000_000, '0.00')}M`;
  }
  if (number > 1000) {
    return `${digit.format(number / 1000, '0.00')}K`;
  }
  return digit.format(number, '0.00');
}

export const useFetchEarnHistory = () => {
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
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
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
      };

      return axios({
        url: `/order-book-api/user/earn/history`,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || []).map((d: any) => {
              if (d.type === 'deposit') {
                return convertDepositEarnHistory(d);
              }
              if (d.type === 'withdraw') {
                return convertWithdrawEarnHistory(d);
              }
              if (d.type === 'reward') {
                return convertRewardEarnHistory(d);
              }
              return d;
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

const convertDepositEarnHistory = (d: any) => {
  const token = d.token;
  const amount = isNumber(token.amount)
    ? formatUnits(token?.amount, token.decimals)
    : '--';
  let bridgedAmount = '0';
  const isUsdc = token.symbol === 'USDC';
  let usdc_tokens = (d.usdc_tokens || []).map((t: any) => {
    const amount = isNumber(t.amount)
      ? formatUnits(t?.amount, t.decimals)
      : '--';
    bridgedAmount = plus(bridgedAmount, amount) as string;
    return {
      ...t,
      amount,
      amount_display: digit.formatInGroupSeparator(amount) || '--',
    };
  });

  const currentChainAmount = minus(amount, bridgedAmount);
  if (isUsdc && Number(currentChainAmount) > 0) {
    usdc_tokens = [
      {
        ...token,
        amount: currentChainAmount,
        amount_display:
          digit.formatInGroupSeparator(currentChainAmount) || '--',
      },
    ].concat(usdc_tokens);
  }

  return {
    ...d,
    usdc_tokens,
    isUsdc,
    amount,
    amount_display: digit.formatInGroupSeparator(amount) || '--',
    token,
    tokens: [
      {
        ...token,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '--',
        amount_display_less8: digit.formatWithDecimalsLess8(
          amount,
          token.decimals,
          { groupSeparator: true }
        ),
      },
    ],
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};

const convertWithdrawEarnHistory = (d: any) => {
  const token = d.token;
  const amount = isNumber(token.amount)
    ? formatUnits(token?.amount, token.decimals)
    : '--';
  return {
    ...d,
    amount,
    amount_display: digit.formatInGroupSeparator(amount) || '--',
    token,
    tokens: [
      {
        ...token,
        amount,
        amount_display: digit.formatInGroupSeparator(amount) || '--',
        amount_display_less8: digit.formatWithDecimalsLess8(
          amount,
          token.decimals,
          { groupSeparator: true }
        ),
      },
    ],
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};

const convertRewardEarnHistory = (d: any) => {
  let tokens = d.tokens || [];
  if (
    d.status === SwapOrderStatus.failed ||
    d.status === SwapOrderStatus.processing
  ) {
    tokens = [Default_Claim_Token[d.protocol]];
  }

  return {
    ...d,
    tokens: tokens.map((token: any) => {
      const amount = isNumber(token.amount)
        ? formatUnits(token?.amount, token.decimals)
        : '--';
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
    }),
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};
