import { useCallback } from 'react';

import useCreateWalletErrorTips from 'src/hooks/useCreateWalletErrorTips';
import { logRequest } from 'src/utils/log';

import { useWalletOprs } from 'js/providers/useWallet';

import { useDexAccount } from '../hooks';
import { fetchAccessToken } from '../service';

export function useSignToViewEcdsa() {
  const { signAccessTokenWithEcdsa, updateAccessToken } = useWalletOprs();
  const dexAccount = useDexAccount();
  const createWalletError = useCreateWalletErrorTips();

  return useCallback(() => {
    return signAccessTokenWithEcdsa()
      .then((resp) => {
        return fetchAccessToken({
          ecdsa_signature: resp.signature,
          wallet_id: resp.walletId,
          time: resp.time,
        })
          .then((tokenResp: any) => {
            return updateAccessToken(
              tokenResp.token as string,
              dexAccount.account,
              `${resp.walletId}_0` // owner
            );
          })
          .catch((err) => {
            logRequest({
              log_errror: 'access token error',
              method: 'useSignToViewEcdsa',
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
  }, [
    createWalletError,
    signAccessTokenWithEcdsa,
    updateAccessToken,
    dexAccount?.account,
  ]);
}
