import { useCallback } from 'react';

import useCreateWalletErrorTips from 'src/hooks/useCreateWalletErrorTips';
import useEventTrack from 'src/hooks/useEventTrack';
import {
  useLogWalletAction,
  useLogWalletCompleted,
  useLogWalletStart,
} from 'src/hooks/useEventTrack/utils/useLogWallet';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useChangeUserInterviewConditions } from 'src/state/notification/hooks';
import { logAPPH5 } from 'src/utils/log';
import { logger } from 'src/utils/logger';

import useWallet, { useIsAppH5, useWalletOprs } from 'js/providers/useWallet';

export default function useConnectWallet() {
  const { connectWallet, callAppPromise } = useWalletOprs();
  const logWalletStart = useLogWalletStart();
  const logWalletAction = useLogWalletAction();
  const eventTrack = useEventTrack();
  const logWalletCompleted = useLogWalletCompleted();
  const createWalletError = useCreateWalletErrorTips();
  const changeUserInterviewConditions = useChangeUserInterviewConditions();
  const showModal = useShowModal();
  const isAppH5 = useIsAppH5();
  const { updateWallet } = useWallet();
  return useCallback(
    ({ switchWallet }: { switchWallet?: boolean } = {}) => {
      logWalletStart(switchWallet ? 'switch_address' : 'connect_wallet');
      if (isAppH5) {
        return callAppPromise('connectWallet', {})
          .then((resp) => {
            // 触发重新注入逻辑
            updateWallet(resp);
            logAPPH5({
              event: 'connectWallet success',
              account: resp.account,
            });
            return resp;
          })
          .catch((err) => {
            logAPPH5({
              event: 'connectWallet error',
              error: err,
            });
          });
      }
      // 链接钱包过程中不触发updater的初始化
      window.isConnectingWallet = true;
      return connectWallet({
        logWallet: {
          logWalletAction: logWalletAction as any,
          logWalletCompleted: logWalletCompleted as any,
          eventTrack: eventTrack as any,
        },
      })
        .then((resp) => {
          if (resp?.isPrivy) {
            showModal({ modal: ModalKeys.privy_initialize, signResp: resp });
          }
          changeUserInterviewConditions({ loginSuccess: true });
          return resp;
        })
        .catch((err) => {
          const error = createWalletError(err);
          logger.error(error);
        });
    },
    [
      changeUserInterviewConditions,
      connectWallet,
      createWalletError,
      logWalletStart,
      logWalletCompleted,
      logWalletAction,
      showModal,
      eventTrack,
      isAppH5,
      callAppPromise,
      updateWallet,
    ]
  );
}
