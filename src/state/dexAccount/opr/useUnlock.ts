import { useCallback } from 'react';

import { EventType } from 'src/hooks/useEventTrack/service';

import useEventTrack from 'js/hooks/useEventTrack';
import { useWalletOprs } from 'js/providers/useWallet';
import { useCheckLocalTime, useInfo } from 'js/state/application/hooks';
import { logWalletError } from 'js/utils/log';

import { useDexAccount } from '../hooks';

export default function useUnlock() {
  const { unlock } = useWalletOprs();
  const checkLocalTime = useCheckLocalTime();

  const { exchangeAddress } = useInfo();
  const dexAccount = useDexAccount();
  const eventTrack = useEventTrack();
  return useCallback(
    (keyNonce: number, type: 'unlock' | 'register') => {
      if (!checkLocalTime()) return Promise.reject('');
      return unlock({
        keyNonce,
        exchangeAddress,
        type,
      })
        .then((resp) => {
          eventTrack({ type: EventType.LoginMessage, data: null });
          if (
            dexAccount.publicKeyX &&
            dexAccount.publicKeyX !== resp.publicKeyX
          ) {
            logWalletError({
              log_error: 'wallet error',
              message: "keyNonce don't match publicKey",
              account: dexAccount.account,
            });
          }
          return resp;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      unlock,
      checkLocalTime,
      exchangeAddress,
      dexAccount.publicKeyX,
      dexAccount.account,
    ]
  );
}
