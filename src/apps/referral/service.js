import { useCallback } from 'react';

import { formatUnits } from 'src/ethers/utils';
import { useHasAccessToken } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import digit from 'src/utils/digit';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

function toMs(value) {
  const nextValue = Number(value || 0);
  if (!Number.isFinite(nextValue) || nextValue <= 0) {
    return 0;
  }
  return nextValue > 1e12 ? nextValue : nextValue * 1000;
}

export function checkReferralCode(code) {
  return axios({
    method: 'GET',
    url: '/order-book-api/checkReferralCode',
    params: {
      referral_code: code,
    },
  }).then((resp) => {
    const data = resp.data;
    return data || {};
  });
}

export function useFetchReferralSummary() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(() => {
    const headers = createHeaders();
    if (!dexAccount?.hasAccessToken) {
      return Promise.reject(new Error('No access token'));
    }
    return axios({
      method: 'GET',
      url: '/order-book-api/intent/referralProgram/summary',
      headers,
    })
      .then((resp) => {
        const data = resp.data;
        return data || {};
      })
      .catch((err) => handleCommonErr(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    handleCommonErr,
    createHeaders,
    dexAccount?.hasAccessToken,
    dexAccount?.account,
  ]);
}

export function useFetchReferralClaimable() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      method: 'GET',
      url: '/order-book-api/intent/referralProgram/claimableCommissions',
      headers,
    })
      .then((resp) => {
        const data = resp.data;
        return (data || []).map((d) => {
          const { claimable_volume, token } = d;
          const amount = formatUnits(`${claimable_volume}`, token.decimals);
          return {
            ...d,
            token: {
              ...token,
              id: token.token_id,
            },
            amount,
            amount_display: digit.formatWithDecimals(amount, d.token.decimals),
          };
        });
      })
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders]);
}

export function useFetchReferralDetails() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ pageSize, current }) => {
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/referralProgram/details',
        headers,
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
        },
      })
        .then((resp) => {
          const { list, total } = resp.data;
          return {
            list: (list || []).map((d) => {
              const token = d.token || d.commission_token || {};
              const amountVolume =
                d?.token?.volume ??
                d?.commission_volume ??
                d?.amount ??
                d?.commission_amount ??
                '0';
              const decimals = token?.decimals ?? d?.decimals ?? 6;
              let amount = '0';
              try {
                amount = formatUnits(`${amountVolume || '0'}`, decimals);
              } catch (error) {
                amount = `${amountVolume || '0'}`;
              }

              return {
                ...d,
                id: d.id || `${d.masked_referee || ''}_${d.rebated_at || ''}`,
                token: {
                  ...token,
                  id: token?.token_id || token?.id,
                },
                amount,
                amount_display:
                  d.amount_display ||
                  d.commission_amount_display ||
                  digit.formatWithDecimals(amount, decimals),
                masked_referee: d.masked_referee || d.referee,
                level: d.level || d.referral_level || 1,
                type:
                  d.type ||
                  d.business_type ||
                  d.transaction_type ||
                  d.transaction,
                activity: d.activity || d.activity_display,
                status: d.status || d.commission_status || 'credited',
                rebated_at: toMs(d.rebated_at || d.created_at || d.time),
              };
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

export function useFetchReferralMyInvites() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ pageSize, current }) => {
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/referralProgram/invites',
        headers,
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
        },
      })
        .then((resp) => {
          const { list, total } = resp.data;
          return {
            list: (list || []).map((d) => ({
              ...d,
              id: d.id || `${d.masked_referee || ''}_${d.joined_at || ''}`,
              joined_at: toMs(d.joined_at || d.created_at || d.time),
            })),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

export function useFetchReferralClaimHistory() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ pageSize, current }) => {
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/referralProgram/claim-history',
        headers,
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
        },
      })
        .then((resp) => {
          const { list, total } = resp.data;
          return {
            list: (list || []).map((d) => {
              let amount = d.amount;
              try {
                amount = formatUnits(`${d.amount || '0'}`, d.token.decimals);
              } catch (error) {
                amount = d.amount;
              }
              return {
                ...d,
                amount,
                amount_display: digit.formatWithDecimals(
                  amount,
                  d.token.decimals
                ),
              };
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

export const useTryClaimReferralRewards = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const hasAccessToken = useHasAccessToken();
  return useCallback(
    ({ tokenId, chain }) => {
      const headers = createHeaders();
      if (!hasAccessToken) {
        return Promise.resolve(null);
      }
      return axios({
        method: 'POST',
        url: `/order-book-api/intent/referralProgram/try-claim`,
        headers,
        data: {
          chain_token_id: tokenId,
          chain,
        },
      })
        .then((resp) => {
          return resp.data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders, hasAccessToken]
  );
};

export const usePostClaimReferralRewards = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const hasAccessToken = useHasAccessToken();
  return useCallback(
    ({ ecdsa_signature, time, chain_token_id, chain, gasToken }) => {
      const headers = createHeaders();
      if (!hasAccessToken) {
        return Promise.resolve(null);
      }
      return axios({
        method: 'POST',
        url: `/order-book-api/intent/referralProgram/claim`,
        headers,
        data: {
          timestamp: time,
          ecdsa_signature,
          chain_token_id,
          chain,
          gas_fee_token_id: gasToken.token_id,
          gas_fee_amount: gasToken.volume,
        },
      })
        .then((resp) => {
          const { numbers, total } = resp.data || {};
          return {
            list: numbers,
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders, hasAccessToken]
  );
};

export function useUpdateReferralCode() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({ referralCode }) => {
      const headers = createHeaders();
      if (!dexAccount?.hasAccessToken) {
        return Promise.reject(new Error('No access token'));
      }
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/referralProgram/bind-refrral',
        headers,
        data: {
          referral_code: referralCode,
        },
      })
        .then((resp) => {
          const data = resp.data;
          return data || {};
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders, dexAccount?.hasAccessToken]
  );
}
