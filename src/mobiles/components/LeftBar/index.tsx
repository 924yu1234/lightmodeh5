import React, { useCallback } from 'react';
import logo_dark from 'imgs/logo_dark.svg';

import { Drawer, PrimaryBtn } from 'src/UI';

import useViewAddress from 'src/state/dexAccount/opr/useViewAddress';

import Close from 'js/components/Icons/close';
import RightOutlined from 'js/components/Icons/RightOutlined';
import { useIntl } from 'js/locals';
import {
  useGaEvent,
  useWalletOprs,
  useWalletWeb3,
} from 'js/providers/useWallet';
import {
  useHideModals,
  useModals,
  useRegister,
  useShowModalLogin,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import Account from './account';
import { GlobalLeftbar, StyledLeftbar } from './style';

export default function LeftBar() {
  const { visible } = useModals(ModalKeys.m_leftBar);
  const hide = useHideModals(ModalKeys.m_leftBar);
  const intl = useIntl();
  const { disconnect } = useWalletOprs();
  const viewAddress = useViewAddress();

  const { account } = useWalletWeb3();
  const dexAccount = useDexAccount();
  const hasSyncDA = dexAccount?.hasSyncDA;

  const showLogin = useShowModalLogin();
  const register = useRegister();
  const gaEvent = useGaEvent();

  const view = useCallback(() => {
    hide();
    viewAddress();
  }, [viewAddress, hide]);

  const switchWallet = () => {
    gaEvent('wallet_connect', {
      eventName: 'switch_wallet',
      account: dexAccount?.account,
    });
    showLogin();
  };

  const doDisconnect = () => {
    gaEvent('wallet_connect', {
      eventName: 'disconnect',
      account: dexAccount?.account,
    });
    if (disconnect) disconnect();
  };

  return (
    <>
      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={hide}
        position="left"
        className="m-left-bar"
      >
        <StyledLeftbar>
          <Close size={16} onClick={hide} />

          <div className="logos">
            <img src={logo_dark} className="logo" alt="globalHeader-logo" />
          </div>
          {!account ? (
            <>
              <PrimaryBtn
                eventName="btn_left_bar_connect_wallet"
                onClick={() => {
                  showLogin();
                }}
              >
                {intl.connect_wallet}
              </PrimaryBtn>
            </>
          ) : (
            <>
              <Account />
              {!hasSyncDA ? (
                <PrimaryBtn
                  eventName="btn_left_bar_create_account"
                  onClick={() => {
                    register({ source: 'm_leftBar' });
                  }}
                >
                  {intl.create_account}
                </PrimaryBtn>
              ) : (
                <>
                  <div className="menu-item" onClick={view}>
                    {/* TODO icon */}
                    {/* <IconSecurity size={20} /> */}
                    {intl.view_address}
                    <RightOutlined />
                  </div>
                </>
              )}
            </>
          )}

          {!!account && (
            <div className="bottom-btns">
              <div className="btn btn-switch" onClick={switchWallet}>
                {intl.switch_address}
              </div>
              <div className="btn btn-disconnect" onClick={doDisconnect}>
                {intl.disconnect_m}
              </div>
            </div>
          )}
        </StyledLeftbar>
      </Drawer>
      <GlobalLeftbar />
    </>
  );
}
