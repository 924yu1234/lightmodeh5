/**
 * Wallet Operations (UED mock version)
 *
 * Instead of calling wallet bridge, shows confirm modals.
 * Used by useWalletOperations when in UED mode.
 */
import { useCallback } from 'react';

import { Operations } from 'src/constants/interface/operations';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

/**
 * Creates mock wallet operations that show confirm modals
 * instead of calling the wallet bridge.
 */
export function useWalletModalOperations(): Partial<Operations> {
  const showModal = useShowModal();

  const createTurboRangeOrder = useCallback(
    (order: any) => {
      return new Promise((resolve, reject) => {
        showModal({
          modal: ModalKeys.WALLET_TURBO_RANGE_CONFIRM,
          order,
          resPromise: { resolve, reject },
        });
      });
    },
    [showModal]
  );

  const createSwapOrder = useCallback(
    (order: any) => {
      return new Promise((resolve, reject) => {
        showModal({
          modal: ModalKeys.WALLET_SWAP_CONFIRM,
          order,
          resPromise: { resolve, reject },
        });
      });
    },
    [showModal]
  );

  const createEarnOrder = useCallback(
    (order: any) => {
      return new Promise((resolve, reject) => {
        showModal({
          modal: ModalKeys.WALLET_EARN_CONFIRM,
          order,
          resPromise: { resolve, reject },
        });
      });
    },
    [showModal]
  );

  const createSendOrder = useCallback(
    (order: any) => {
      return new Promise((resolve, reject) => {
        showModal({
          modal: ModalKeys.WALLET_SEND_CONFIRM,
          order,
          resPromise: { resolve, reject },
        });
      });
    },
    [showModal]
  );

  return {
    createTurboRangeOrder,
    createSwapOrder,
    createEarnOrder,
    createSendOrder,
  } as any;
}
