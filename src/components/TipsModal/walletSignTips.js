import React from 'react';

import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import WalletTips from '../WalletTips';

export default function TipsWalletSign() {
  const { visible, hide, title, desc } = useModals(ModalKeys.tips_walletSign);

  if (!visible) return null;
  return <WalletTips title={title} desc={desc} showWalletTips hide={hide} />;
}
