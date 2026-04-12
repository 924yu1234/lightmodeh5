import { useCallback } from 'react';

import { useGaEvent, useWalletOprs } from 'src/providers/useWallet';

import { useDexAccount } from '../hooks';

export default function useViewAddress() {
  const { viewAddress } = useWalletOprs();
  const gaEvent = useGaEvent();
  const dexAccount = useDexAccount();
  return useCallback(() => {
    gaEvent('wallet_connect', {
      eventName: 'view_address',
      account: dexAccount?.account,
    });
    viewAddress();
  }, [dexAccount?.account, gaEvent, viewAddress]);
}
