/**
 * Mock Signing Progress
 *
 * Shows trade-fe's existing WalletTips modal, waits 1.5s, auto-closes and resolves.
 */
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hideModal } from 'src/state/application/actions';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

const MOCK_SIGN_DELAY = 1500;

export default function SigningProgressModal() {
  const { visible, hide, ...options } = useModals(
    ModalKeys.WALLET_SIGNING_PROGRESS
  ) as any;
  const showModal = useShowModal();
  const dispatch = useDispatch();

  const doMockSign = useCallback(async () => {
    // Show the existing WalletTips signing modal
    showModal({
      modal: ModalKeys.tips_walletSign,
      desc: 'Confirming transaction...',
    });

    await new Promise<void>((r) => {
      setTimeout(r, MOCK_SIGN_DELAY);
    });

    // Close WalletTips
    dispatch(hideModal({ modal: ModalKeys.tips_walletSign } as any));

    // Resolve with mock result
    if (options?.resPromise?.resolve) {
      options.resPromise.resolve(
        options.mockResult || { intent_id: `mock-${Date.now()}` }
      );
    }
    hide();
  }, [dispatch, hide, options, showModal]);

  useEffect(() => {
    if (visible) {
      doMockSign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return null;
}
