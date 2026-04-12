import { useCallback } from 'react';

import { useH5ClaimRaffleRewards } from 'src/h5/useH5ClaimRaffleRewards';
import useCreateWalletErrorTips from 'src/hooks/useCreateWalletErrorTips';
import { logRequest } from 'src/utils/log';

import { useIsAppH5, useWalletOprs } from 'js/providers/useWallet';

import { usePostClaimReferralRewards } from './service';

export function useClaimReferralRewards() {
  const { signClaimRaffleRewards } = useWalletOprs();
  const createWalletError = useCreateWalletErrorTips();
  const postClaimReferralRewards = usePostClaimReferralRewards();
  const h5ClaimRaffleRewards = useH5ClaimRaffleRewards();
  const isAppH5 = useIsAppH5();

  return useCallback(
    ({
      claimableTokenId,
      claimableTokenChain,
      gasToken,
    }: {
      claimableTokenId: number;
      claimableTokenChain: string;
      gasToken: any;
    }) => {
      const claimFn = isAppH5 ? h5ClaimRaffleRewards : signClaimRaffleRewards;
      return claimFn()
        .then((resp) => {
          return postClaimReferralRewards({
            ecdsa_signature: resp.signature as string,
            time: resp.time,
            chain_token_id: claimableTokenId,
            chain: claimableTokenChain,
            gasToken,
          })
            .then((resp: any) => {
              logRequest({
                log_success: 'claim referral rewards success',
                method: 'useClaimReferralRewards',
                time: resp.time,
              });
              return resp;
            })
            .catch((err) => {
              logRequest({
                log_errror: 'claim referral rewards error',
                method: 'useClaimReferralRewards',
                time: resp.time,
              });
              return Promise.reject(err);
            });
        })
        .catch((err) => {
          return Promise.reject({
            ...err,
            message: createWalletError(err),
            code: err?.code,
          });
        });
    },
    [
      createWalletError,
      postClaimReferralRewards,
      signClaimRaffleRewards,
      h5ClaimRaffleRewards,
      isAppH5,
    ]
  );
}
