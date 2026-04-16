import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import IconDisconnect from 'src/components/Icons/disconnect';
import IconSync from 'src/components/Icons/sync';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { useGaEvent, useWalletOprs } from 'src/providers/useWallet';
import useSyncToApp from 'src/state/dexAccount/opr/useSyncToApp';
import useViewAddress from 'src/state/dexAccount/opr/useViewAddress';
import { clearWalletSnapshot } from 'src/wallet/config';

import IconAccountAsset from 'js/components/Icons/accountAsset';
import IconAccountOrder from 'js/components/Icons/accountOrder';
import IconAccountUser from 'js/components/Icons/accountUser';
import IconAccountView from 'js/components/Icons/accountView';
import IconWalletSwitch from 'js/components/Icons/walletSwtich';
import { useIntl, useSetLocale } from 'js/locals';
import {
  useRegister,
  useShowModalLogin,
  useToggleMenu,
} from 'js/state/application/hooks';
import {
  useDexAccount,
  useShowSyncAppFeature,
} from 'js/state/dexAccount/hooks';

export default function DrawMenu() {
  const intl = useIntl();
  const showLogin = useShowModalLogin();
  const dexAccount = useDexAccount();

  useWalletOprs();
  const register = useRegister();
  const viewAddress = useViewAddress();
  const toggleMenu = useToggleMenu();
  const hasSyncDA = dexAccount?.hasSyncDA;
  const showCreateBtn = !hasSyncDA;
  const { languagePath } = useSetLocale();
  const isPrivy = useIsPrivy();
  const showSyncApp = useShowSyncAppFeature();
  const gaEvent = useGaEvent();

  const switchWallet = () => {
    gaEvent('wallet_connect', {
      eventName: 'switch_wallet',
      account: dexAccount?.account,
    });
    showLogin({ switchWallet: true });
  };

  const doDisconnect = () => {
    gaEvent('wallet_connect', {
      eventName: 'disconnect',
      account: dexAccount?.account,
    });
    clearWalletSnapshot();
    window.location.reload();
  };

  const syncToApp = useSyncToApp();

  return (
    <StyledMenus>
      {showCreateBtn && !isPrivy && (
        <>
          <StyledMenuItem onClick={register} className="line">
            <IconAccountUser size={18} />
            {intl.create_account}
          </StyledMenuItem>
        </>
      )}
      {hasSyncDA && (
        <>
          <Link to={`/${languagePath}/account/balance`}>
            <StyledMenuItem onClick={() => toggleMenu(false)}>
              <IconAccountAsset size={18} />
              <div className="item-text">{intl['menu.menu_balance']}</div>
            </StyledMenuItem>
          </Link>
          <Link to={`/${languagePath}/account/history`}>
            <StyledMenuItem
              className="item line"
              onClick={() => toggleMenu(false)}
            >
              <IconAccountOrder size={18} />
              <div className="item-text">{intl['menu.menu_history']}</div>
            </StyledMenuItem>
          </Link>
        </>
      )}
      {hasSyncDA && (
        <StyledMenuItem onClick={viewAddress}>
          <IconAccountView size={18} />
          {intl.view_address}
        </StyledMenuItem>
      )}
      <StyledMenuItem onClick={switchWallet}>
        <IconWalletSwitch size={18} />
        <div className="item-text">{intl.switch_address}</div>
      </StyledMenuItem>
      {showSyncApp && (
        <StyledMenuItem onClick={syncToApp}>
          <IconSync size={18} />
          <div className="item-text">{intl.sync_to_DeGate_app}</div>
        </StyledMenuItem>
      )}
      <StyledMenuItem onClick={doDisconnect}>
        <IconDisconnect size={18} />
        <div className="item-text">{intl.disconnect}</div>
      </StyledMenuItem>
    </StyledMenus>
  );
}

DrawMenu.propTypes = {};

export const StyledMenus = styled.div`
  width: 100%;
  background: ${(props) => props.theme.modalBg};
  float: right;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  & > a {
    width: 100%;
  }
`;

const StyledMenuItem = styled.div`
  padding: 0 18px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 50px;
  min-width: 155px;
  color: ${(props) => props.theme.t_b7b};
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  line-height: 24px;
  &.line {
    border-bottom: 1px solid rgba(58, 66, 89, 0.5);
  }
  .dg-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    color: ${(props) => props.theme.t_b7b};
    &:hover {
      color: ${(props) => props.theme.t_b7b};
    }
  }
  &:hover {
    background: ${(props) => props.theme.bgMenuHover};
  }
`;
