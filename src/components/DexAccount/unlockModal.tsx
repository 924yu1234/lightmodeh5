import React, { useCallback, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import { Checkbox as DeCheckbox, GhostBtn, Modal, PrimaryBtn } from 'src/UI';

import useWallet, { useWalletOprs } from 'src/providers/useWallet';

import WalletTips from 'js/components/WalletTips';
import useCreateWalletErrorTips from 'js/hooks/useCreateWalletErrorTips';
import { useIntl } from 'js/locals';
import {
  useCheckLocalTime,
  useModals,
  useRegister,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import {
  useDexAccount,
  useIsLoadingDexAccount,
  useRefreshDexAccount,
} from 'js/state/dexAccount/hooks';
import useUnlock from 'js/state/dexAccount/opr/useUnlock';
import { AccountStatus } from 'js/state/dexAccount/reducer';
import { logUnlock } from 'js/utils/log/dexAccount';
import message from 'js/utils/message';

import Close from '../Icons/close';
import LedgerAppVersionTips from './LedgerAppVersionTips';

export default function UnlockModal() {
  const { visible, hide } = useModals(ModalKeys.unlock);
  const [checked, setChecked] = useState(false);
  const { updateHideQuickTradingTips } = useWalletOprs();
  const { isHideQuickTradingTips } = useWallet();

  // const isHide = useIsHideEnableQuickTradingTipsForever();
  // const hideTipsForever = useHideEnableQuickTradingTipsForever();

  const checkLocalTime = useCheckLocalTime();

  const [isUnlocking, setIsUnlocking] = useState(false);
  const dexAccount = useDexAccount();

  const refreshDexAccount = useRefreshDexAccount();

  const intl = useIntl();
  const createErrorTips = useCreateWalletErrorTips();
  const register = useRegister();

  const unlock = useUnlock();
  const loading = useIsLoadingDexAccount();

  const doHide = () => {
    hide();
  };

  const doUnLock = useCallback(() => {
    if (!checkLocalTime()) return;
    // redirect to registerModal
    setIsUnlocking(true);

    if (checked) {
      updateHideQuickTradingTips(true);
    }

    if (dexAccount?.state !== AccountStatus.REGISTERED) {
      refreshDexAccount();
      message.error(intl.common_err);
      hide();
      return;
    }
    logUnlock({
      method: 'pending',
      account: dexAccount.account,
      keyNonce: dexAccount?.keyNonce,
    });
    unlock(dexAccount?.keyNonce, 'unlock')
      .then((resp) => {
        logUnlock({
          method: 'success',
          account: dexAccount.account,
          keyNonce: dexAccount?.keyNonce,
          publicKeyX: resp?.publicKeyX,
          publicKeyY: resp?.publicKeyY,
        });
        message.success(intl.free_mode_on);
        hide();
        setIsUnlocking(false);
      })
      .catch((err) => {
        logUnlock({
          method: 'error',
          account: dexAccount.account,
          keyNonce: dexAccount?.keyNonce,
          error: { code: err.code, message: err.message },
        });
        const tips = createErrorTips(err);
        if (tips) {
          message.error(tips);
        }
        hide();
        setIsUnlocking(false);
      });
  }, [
    intl,
    createErrorTips,
    unlock,
    dexAccount.account,
    refreshDexAccount,
    dexAccount?.keyNonce,
    hide,
    checkLocalTime,
    dexAccount?.state,
    checked,
    updateHideQuickTradingTips,
  ]);

  useLayoutEffect(() => {
    if (!dexAccount.hasSyncDA) {
      hide();
      register({ source: 'modal_unlock' });
      return;
    }
    if (loading) return;
    if (visible && isHideQuickTradingTips && !isUnlocking) {
      doUnLock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (isUnlocking) {
    return (
      <WalletTips
        title={undefined}
        desc={intl.turn_on_signature_free_mode}
        hide={hide}
        top={<LedgerAppVersionTips />}
      />
    );
  }

  const text = intl.signature_free_mode_tips;
  return (
    <Modal title={null} onClose={doHide} opened={visible}>
      <StyledUnlockModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl.signatre_free_mode}</div>
        <div className="desc">{text}</div>

        <DeCheckbox
          height={34}
          checked={checked}
          showHoverBg
          onChange={(e) => setChecked(e.target.checked)}
          label={intl.tips_hide_forever}
        />
        <div className="modal-btns">
          <PrimaryBtn
            eventName="btn_unlock_modal_unlock"
            onClick={doUnLock}
            loading={loading}
          >
            {intl.turn_on}
          </PrimaryBtn>
          <GhostBtn
            eventName="btn_unlock_modal_cancel"
            className="modal-cancel"
            onClick={doHide}
          >
            {intl.Cancel}
          </GhostBtn>
        </div>
      </StyledUnlockModal>
    </Modal>
  );
}

const StyledUnlockModal = styled.div`
  width: 100%;
  padding: 0 20px 20px;
  ${(props) => props.theme.fontRegular};
  .modal-title {
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 10px;
    color: ${(props) => props.theme.modalTitle};
    line-height: 24px;
    font-size: 14px;
    text-align: center;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 14px;
    line-height: 20px;
    min-height: 20px;
    width: 100%;
    margin-bottom: 20px;
  }
  .mantine-Checkbox-root {
    margin-left: -7px;
  }
  .modal-btns {
    margin-top: 15px;
    width: 100%;
  }
`;
