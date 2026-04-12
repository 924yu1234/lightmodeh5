import { useEffect } from 'react';

import { registerWalletBridgeAction } from 'src/bridge/walletBridge';

import { usePostIntentSign } from '../intentService';

export default function Updater() {
  const postIntentSign = usePostIntentSign();

  useEffect(() => {
    return registerWalletBridgeAction('intent.postIntentSign', (payload) => {
      return postIntentSign(payload);
    });
  }, [postIntentSign]);
}
