import React, { useCallback, useLayoutEffect } from 'react';

import { SIGN_TO_VIEW_SIGNATURE_ERR } from 'src/constants/apiErr';
import useCreateWalletErrorTips from 'src/hooks/useCreateWalletErrorTips';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { useSignToViewEcdsa } from 'src/state/dexAccount/opr/useSignToView';

import WalletTips from 'js/components/WalletTips';
import { useIntl } from 'js/locals';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import {
  useDexAccount,
  useIsLoadingDexAccount,
} from 'js/state/dexAccount/hooks';
import { logSignToView } from 'js/utils/log/dexAccount';
import message from 'js/utils/message';

import LedgerAppVersionTips from './LedgerAppVersionTips';

export default function SignToViewModal() {
  const { visible, hide, tips } = useModals(ModalKeys.signToView);

  const dexAccount = useDexAccount();

  const intl = useIntl();

  const signToView = useSignToViewEcdsa();
  const loading = useIsLoadingDexAccount();
  const showModal = useShowModal();
  const createWalletError = useCreateWalletErrorTips();
  const isPrivy = useIsPrivy();

  const doUnLock = useCallback(() => {
    logSignToView({
      method: 'pending ',
      account: dexAccount.account,
    });
    signToView()
      .then(() => {
        logSignToView({
          method: 'success',
          account: dexAccount.account,
        });
        message.success(intl.sign_to_view_success);
        hide();
      })
      .catch((err) => {
        logSignToView({
          method: 'error',
          account: dexAccount.account,
          error: { code: err.code, message: err.message },
        });
        hide();
        if (err?.code === SIGN_TO_VIEW_SIGNATURE_ERR) {
          showModal({ modal: ModalKeys.tips_signToViewTimeError });
          return;
        }
        message.error(createWalletError(err));
      });
  }, [
    dexAccount.account,
    intl,
    createWalletError,
    showModal,
    signToView,
    hide,
  ]);

  useLayoutEffect(() => {
    if (loading) return;
    if (visible) {
      doUnLock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!visible || isPrivy) return null;

  return (
    <WalletTips
      title=""
      desc={tips || intl.sign_to_view}
      hide={hide}
      top={<LedgerAppVersionTips />}
    />
  );
}
