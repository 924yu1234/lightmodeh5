import { useCallback } from 'react';

import { CommonToken } from 'src/constants/interface';
import { useAppNavigateAdd } from 'src/h5/navigateApp';
import useCheckRegion from 'src/state/regionCheck/hooks';

import useCreateWalletErrorTips from 'js/hooks/useCreateWalletErrorTips';
import { useIsAppH5, useWalletOprs } from 'js/providers/useWallet';
import message from 'js/utils/message';

export default function useReceive() {
  const { receive } = useWalletOprs();
  const createErrorTips = useCreateWalletErrorTips();
  const checkRegion = useCheckRegion();
  const isAppH5 = useIsAppH5();
  const addApp = useAppNavigateAdd();

  return useCallback(
    async ({ token }: { token?: CommonToken } = {}) => {
      if (!checkRegion()) return Promise.reject({});
      if (isAppH5) {
        addApp({ token });
        return Promise.resolve();
      }
      return receive(token).catch((error) => {
        const tips = createErrorTips(error);
        if (tips) message.error(tips);
      });
    },
    [receive, createErrorTips, checkRegion, addApp, isAppH5]
  );
}
