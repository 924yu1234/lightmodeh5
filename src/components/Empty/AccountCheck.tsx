import React from 'react';
import styled from 'styled-components';

import { GhostBtn } from 'src/UI';

import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
import { useHasAccessToken, useWalletWeb3 } from 'js/providers/useWallet';
import {
  useRegister,
  useShowModalLogin,
  useSignToView,
} from 'js/state/application/hooks';
import { useDexAccount } from 'js/state/dexAccount/hooks';

export default function AccountCheck({
  children,
  className = '',
  showAccountTips = true,
  signToViewTipsType,
  source,
  btnClassName = '',
}: {
  children?: React.ReactElement;
  className?: string;
  showAccountTips?: boolean;
  signToViewTipsType?: 'balance' | 'history' | 'security_options' | 'common';
  source: Initialize_Source;
  btnClassName?: string;
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
      <StyledEmpty className={`${className} dg-empty account-check-wrapper`}>
        <div
          className="empty-btn"
          onClick={() => {
            login();
          }}
        >
          <GhostBtn
            eventName="btn_connect_wallet"
            className={`dg-ghost ${btnClassName}`}
          >
            {intl.connect_wallet}
          </GhostBtn>
        </div>
      </StyledEmpty>
    );
  }

  if (account && !hasSyncDA && showAccountTips && !isPrivy) {
    return (
      <StyledEmpty className={`${className} dg-empty account-check-wrapper`}>
        <div className="empty-text">{intl.please_create_account_first}</div>
        <div
          className="empty-btn"
          onClick={() => {
            register({ source });
          }}
        >
          <GhostBtn
            eventName="btn_create_account"
            className={`dg-ghost ${btnClassName}`}
          >
            {intl.create_account}
          </GhostBtn>
        </div>
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
      <StyledEmpty className={`${className} dg-empty account-check-wrapper`}>
        <div
          className="empty-btn"
          onClick={() => {
            signToView({ tips: signTips });
          }}
        >
          {signToViewTipsType ? (
            <GhostBtn
              eventName="btn_sign_to_view"
              className={`dg-ghost ${btnClassName}`}
            >
              {signTips}
            </GhostBtn>
          ) : (
            `${isPrivy ? intl.login_to_view : intl.sign_to_view}`
          )}
        </div>
      </StyledEmpty>
    );
  }

  return children || null;
}

export const StyledEmpty = styled.div`
  padding: 55px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .empty-text {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  .empty-btn {
    color: ${(props) => props.theme.blue};
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    .dg-ghost {
      min-width: 160px;
    }
  }
`;
