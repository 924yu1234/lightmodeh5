import React from 'react';

import { PrimaryBtn } from 'src/UI';

import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';

import { useIntl } from 'js/locals';
import { useHasAccessToken, useWalletWeb3 } from 'js/providers/useWallet';
import {
  useRegister,
  useShowModalLogin,
  useSignToView,
} from 'js/state/application/hooks';
import {
  useDexAccount,
  useIsLoadingDexAccount,
} from 'js/state/dexAccount/hooks';

export default function BtnWrapper({
  children,
  className = '',
  source,
}: {
  children?: any;
  className?: string;
  source: Initialize_Source;
}) {
  const { account } = useWalletWeb3();
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const signToView = useSignToView();

  const login = useShowModalLogin();
  const register = useRegister();
  const loading = useIsLoadingDexAccount();
  const hasAccessToken = useHasAccessToken();

  if (!account) {
    return (
      <PrimaryBtn
        eventName="btn_connect_wallet"
        className={`dg-primary opr-btn ${className}`}
        onClick={() => {
          login();
        }}
      >
        {intl.connect_wallet}
      </PrimaryBtn>
    );
  }

  if (account && !loading && !dexAccount?.hasSyncDA) {
    return (
      <PrimaryBtn
        eventName="btn_create_account"
        className={`dg-primary opr-btn ${className}`}
        onClick={() => {
          register({ source });
        }}
      >
        {intl.create_account}
      </PrimaryBtn>
    );
  }

  if (dexAccount?.hasSyncDA && !dexAccount.hasUnlocked && !hasAccessToken) {
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

  return children;
}
