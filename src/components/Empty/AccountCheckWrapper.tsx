import React from 'react';
import styled from 'styled-components';

import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useIsPrivy } from 'src/hooks/useWalletHooks';

import { useIntl } from 'js/locals';
import { useHasAccessToken, useWalletWeb3 } from 'js/providers/useWallet';
import {
  useRegister,
  useShowModalLogin,
  useSignToView,
} from 'js/state/application/hooks';
import { useDexAccount } from 'js/state/dexAccount/hooks';

export default function AccountCheckWrapper({
  children,
  className = '',
  showAccountTips = true,
  signToViewTipsType,
  source,
}: {
  children?: React.ReactElement;
  className?: string;
  showAccountTips?: boolean;
  signToViewTipsType?: 'balance' | 'history' | 'security_options' | 'common';
  source: Initialize_Source;
}) {
  const { account } = useWalletWeb3();
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const hasSyncDA = dexAccount?.hasSyncDA;
  const hasAccessToken = useHasAccessToken();
  const isPrivy = useIsPrivy();

  const signToView = useSignToView();
  const login = useShowModalLogin();
  const register = useRegister();

  if (!account && showAccountTips && !hasAccessToken) {
    return (
      <StyledEmpty
        className={`${className} account-check-wrapper`}
        onClick={() => {
          login();
        }}
      >
        <div className="empty-btn-content">{children}</div>
      </StyledEmpty>
    );
  }

  if (account && !hasSyncDA && showAccountTips && !isPrivy) {
    return (
      <StyledEmpty
        className={`${className} account-check-wrapper`}
        onClick={() => {
          register({ source });
        }}
      >
        <div className="empty-btn-content">{children}</div>
      </StyledEmpty>
    );
  }

  if (account && hasSyncDA && !hasAccessToken && showAccountTips) {
    let signTips: string;
    if (signToViewTipsType === 'balance') {
      signTips = isPrivy
        ? intl.login_to_view_balance
        : intl['orders.sign_to_view_balance'];
    } else if (signToViewTipsType === 'history') {
      signTips = isPrivy
        ? intl.login_to_view_history
        : intl['orders.sign_to_view_history'];
    } else {
      signTips = isPrivy ? intl.login_to_view : intl.sign_to_view;
    }
    return (
      <StyledEmpty
        className={`${className} account-check-wrapper`}
        onClick={() => {
          signToView({ tips: signTips });
        }}
      >
        <div className="empty-btn-content">{children}</div>
      </StyledEmpty>
    );
  }

  return children || null;
}

export const StyledEmpty = styled.div`
  .empty-btn-content {
    pointer-events: none;
  }
`;
