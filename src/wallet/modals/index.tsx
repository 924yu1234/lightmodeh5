/**
 * Wallet Modals Registry
 *
 * All wallet confirmation modals rendered here.
 * Add this component to src/containers/modals.js.
 */
import React from 'react';

import useAutoLock from 'src/wallet/hooks/useAutoLock';

import AutoLockedTips from './AutoLockedTips';
import EarnConfirmModal from './EarnConfirm';
import ReceiveModal from './Receive';
import SigningProgressModal from './SigningProgress';
import SwapConfirmModal from './SwapConfirm';
import TurboRangeConfirmModal from './TurboRangeConfirm';
import UpcomingLockTips from './UpcomingLockTips';
import ViewAddressModal from './ViewAddress';

export default function WalletModals() {
  // Initialize auto-lock timer
  useAutoLock();

  return (
    <>
      <TurboRangeConfirmModal />
      <SwapConfirmModal />
      <EarnConfirmModal />
      <SigningProgressModal />
      <AutoLockedTips />
      <UpcomingLockTips />
      <ViewAddressModal />
      <ReceiveModal />
    </>
  );
}
