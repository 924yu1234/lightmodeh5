import React from 'react';

import { PrimaryBtn } from 'src/UI';

import { OrderDirs } from 'src/constants/interface';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import {
  useDexAccount,
  useIsLoadingDexAccount,
} from 'src/state/dexAccount/hooks';
import { useSwapOrderDir } from 'src/state/swap/trade/hooks';

import { useIntl } from 'js/locals';
import {
  useAllowQuickTrading,
  useHasAccessToken,
  useWalletWeb3,
} from 'js/providers/useWallet';
import {
  useRegister,
  useShowModalLogin,
  useSignToView,
} from 'js/state/application/hooks';

import EnableQuickTradingBtn from './EnableQuickTradingBtn';

export default function SwapBtnWrapper({
  children,
  className = '',
  disabled,
}: {
  children: React.ReactElement;
  className?: string;
  disabled?: boolean;
}) {
  const { account } = useWalletWeb3();
  const intl = useIntl();

  const orderDir = useSwapOrderDir();
  const loading = useIsLoadingDexAccount();
  const login = useShowModalLogin();
  const signToView = useSignToView();
  const hasAccessToken = useHasAccessToken();
  const allowQuickTrading = useAllowQuickTrading();
  const dexAccount = useDexAccount();
  const register = useRegister();
  const isPrivy = useIsPrivy();

  if (!account && !loading) {
    return (
      <PrimaryBtn
        eventName="btn_wallet_connect"
        className={`dg-primary opr-btn ${className}`}
        onClick={() => {
          login();
        }}
      >
        {intl.connect_wallet}
      </PrimaryBtn>
    );
  }

  if (account && !loading && !dexAccount?.hasSyncDA && !isPrivy) {
    return (
      <PrimaryBtn
        eventName="btn_create_account"
        className={`dg-primary opr-btn ${className}`}
        onClick={() => {
          register();
        }}
      >
        {intl.create_account}
      </PrimaryBtn>
    );
  }

  if (!hasAccessToken) {
    return (
      <PrimaryBtn
        eventName="btn_view_balance"
        className={`dg-primary opr-btn ${className}`}
        onClick={() => {
          signToView({ tips: intl.view_balance });
        }}
      >
        {intl.view_balance}
      </PrimaryBtn>
    );
  }

  if (allowQuickTrading && !dexAccount.hasUnlocked) {
    return (
      <EnableQuickTradingBtn
        className={
          className + orderDir === OrderDirs.BUY ? ' buy-btn' : ' sell-btn'
        }
        iconSize={46}
        disabled={disabled}
      >
        {children}
      </EnableQuickTradingBtn>
    );
  }

  return children;
}
