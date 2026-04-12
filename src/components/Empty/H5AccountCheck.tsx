import React from 'react';
import styled from 'styled-components';

import { UIButton } from 'src/UI';

import useConnectWallet from 'src/state/dexAccount/opr/useConnectWallet';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
import { useDexAccount } from 'js/state/dexAccount/hooks';

export default function H5AccountCheck({
  children,
  className = '',
  btnClassName = '',
}: {
  children?: React.ReactElement;
  className?: string;
  btnClassName?: string;
}) {
  const intl = useIntl();
  const { account } = useDexAccount();
  const connectWallet = useConnectWallet();

  if (!account && !window._degate_app?.da_owner) {
    return (
      <StyledEmpty className={`${className} dg-empty h5-account-check-wrapper`}>
        <div className="empty-text">
          {intl.you_need_a_DeGate_account_to_continue}
        </div>
        <div className="empty-btn" onClick={() => connectWallet()}>
          <UIButton
            eventName="btn_sign_to_view"
            className={`dg-primary ${btnClassName}`}
          >
            {intl.sign_in}
          </UIButton>
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
    width: 100%;
    .dg-primary {
      min-width: 280px;
    }
  }
`;
