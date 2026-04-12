import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useShowAccount } from 'src/hooks/useShowAccount';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals, useRegister } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import {
  useDexAccount,
  useIsLoadingDexAccount,
} from 'js/state/dexAccount/hooks';

import WalletIcon from '../walletIcon';

export default function AccountChangeTips() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.tips_accountChange);
  const { account } = useDexAccount();
  const dexAccount = useDexAccount();
  const register = useRegister();
  const hasSyncDA = dexAccount?.hasSyncDA;
  const hasUnlocked = dexAccount?.hasUnlocked;
  const loading = useIsLoadingDexAccount();

  useEffect(() => {
    if (hasUnlocked || !account || (!loading && hasSyncDA)) {
      hide();
    }
  }, [hasUnlocked, hide, account, hasSyncDA, loading]);
  const showAccount = useShowAccount();

  const str = useMemo(() => {
    if (!account) return '';
    return showAccount;
  }, [account, showAccount]);

  if (loading) return null;

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledAccountChangeTips>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl['account.switch_account_tips']}</div>
        <div className="account">
          <WalletIcon />
          {str}
        </div>
        <div className="box">
          <div className="box-title">{intl.please_create_account_first}</div>
          <PrimaryBtn
            eventName="btn_account_change_tips_create_account"
            onClick={() => {
              hide();
              register({ source: 'modal_accountChange' });
            }}
            loading={loading}
          >
            {intl.create_account}
          </PrimaryBtn>
        </div>
      </StyledAccountChangeTips>
    </Modal>
  );
}

AccountChangeTips.propTypes = {};

const StyledAccountChangeTips = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .icon-popup-warning {
    margin: 0 auto 10px;
    display: block;
  }

  .title {
    ${(props) => props.theme.fontBold};
    color: ${(props) => props.theme.modalText};
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }

  .account {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 16px;
    line-height: 20px;
    margin: 15px 0 30px;
    text-align: center;
    display: flex;
    align-items: center;
    .wallet-icon {
      margin-right: 5px;
    }
  }

  .box {
    width: 100%;
    padding: 17px 10px 20px;
    background: ${(props) => props.theme.bg_10};
    border-radius: 5px;
    .box-title {
      ${(props) => props.theme.fontRegular};
      color: ${(props) => props.theme.modalText};
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  .dg-primary {
    width: 100%;
  }
`;
