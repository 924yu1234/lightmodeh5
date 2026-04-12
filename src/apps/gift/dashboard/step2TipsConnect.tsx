import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { TOKEN_SOL_ICON } from 'src/da';
import { useIntl } from 'src/locals';
import { useWalletWeb3 } from 'src/providers/useWallet';
import { useRegister, useShowModalLogin } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function TipsConnect({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();

  const { account } = useWalletWeb3();

  const login = useShowModalLogin();
  const register = useRegister();

  if (!account) {
    return (
      <StyledTipsConnect>
        <div className="box">
          <div className="box-title">{intl.gift.Cash_Gift_for_CopyTrade}</div>
          <div className="box-volume">
            {giftInfo?.tokenSymbol === 'SOL' && (
              <img
                src={TOKEN_SOL_ICON}
                alt={giftInfo?.tokenSymbol}
                className="token-icon"
              />
            )}
            {giftInfo?.amountPerClaim} {giftInfo?.tokenSymbol}
          </div>
        </div>
        <div className="tips">{intl.gift.Connect_wallet_to_claim}</div>
        <PrimaryBtn
          eventName="gift_box_btn_connect_wallet"
          onClick={() => {
            login();
          }}
        >
          {intl.connect_wallet}
        </PrimaryBtn>
      </StyledTipsConnect>
    );
  }

  return (
    <StyledTipsConnect>
      <div className="box">
        <div className="box-title">{intl.gift.Cash_Gift_for_CopyTrade}</div>
        <div className="box-volume">
          {giftInfo?.tokenSymbol === 'SOL' && (
            <img
              src={TOKEN_SOL_ICON}
              alt={giftInfo?.tokenSymbol}
              className="token-icon"
            />
          )}
          {giftInfo?.amountPerClaim} {giftInfo?.tokenSymbol}
        </div>
      </div>
      <div className="tips">
        {intl.gift.claim_your_gift_please_create_a_DeGate_account}
      </div>
      <PrimaryBtn
        eventName="gift_box_btn_create_account"
        onClick={() => {
          register({ source: 'gift_box' });
        }}
      >
        {intl.create_account}
      </PrimaryBtn>
    </StyledTipsConnect>
  );
}

const StyledTipsConnect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 25px;
  }
  .dg-primary {
    margin-top: 10px;
    min-width: 230px;
  }
`;
