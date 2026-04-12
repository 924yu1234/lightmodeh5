import { useCallback } from 'react';

import { useIsPrivy } from 'src/hooks/useWalletHooks';

import { useIntl } from 'js/locals';
import { useHasAccessToken, useWalletWeb3 } from 'js/providers/useWallet';
import {
  useRegister,
  useShowModalLogin,
  useSignToView,
} from 'js/state/application/hooks';
import { useDexAccount } from 'js/state/dexAccount/hooks';

export default function useCheckHasAccessToken() {
  const { account } = useWalletWeb3();
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const hasSyncDA = dexAccount?.hasSyncDA;
  const hasAccessToken = useHasAccessToken();
  const isPrivy = useIsPrivy();

  const signToView = useSignToView();
  const login = useShowModalLogin();
  const register = useRegister();

  return useCallback(() => {
    if (!account) {
      login();
      return false;
    }
    if (account && !hasSyncDA && !isPrivy) {
      register();
      return false;
    }
    if (account && hasSyncDA && !hasAccessToken) {
      signToView({ tips: intl.login_to_view });
      return false;
    }
    return true;
  }, [
    account,
    hasSyncDA,
    isPrivy,
    hasAccessToken,
    login,
    register,
    signToView,
    intl,
  ]);
}
