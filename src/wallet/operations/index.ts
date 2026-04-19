/**
 * Wallet Operations (UED mock version)
 *
 * Instead of calling wallet bridge, shows confirm modals.
 * Used by useWalletOperations when in UED mode.
 */
import { useCallback } from 'react';

import { CommonToken } from 'src/constants/interface';
import { Operations } from 'src/constants/interface/operations';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { clearWalletSnapshot } from 'src/wallet/config';

/**
 * Creates mock wallet operations that show confirm modals
 * instead of calling the wallet bridge.
 */
export function useWalletModalOperations(): Partial<Operations> {
  const showModal = useShowModal();

  const viewAddress = useCallback(() => {
    showModal({ modal: ModalKeys.WALLET_VIEW_ADDRESS });
  }, [showModal]);

  const receive = useCallback(
    (token?: CommonToken) => {
      return new Promise((resolve, reject) => {
        showModal({
          modal: ModalKeys.WALLET_RECEIVE,
          token,
          resPromise: { resolve, reject },
        });
      });
    },
    [showModal]
  );

  const disconnect = useCallback(() => {
    clearWalletSnapshot();
    window.location.reload();
  }, []);

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
    viewAddress,
    receive,
    disconnect,
    createTurboRangeOrder,
    createSwapOrder,
    createEarnOrder,
    createSendOrder,
  } as any;
}
