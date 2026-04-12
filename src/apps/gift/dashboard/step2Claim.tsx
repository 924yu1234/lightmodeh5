import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import message from 'src/utils/message';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import { TOKEN_SOL_ICON } from 'src/da';
import { useIntl } from 'src/locals';
import useWallet, {
  useHasAccessToken,
  useWalletOprs,
} from 'src/providers/useWallet';
import { useSignToView } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import { useClaimGift } from '../service';
import ErrorTips from './errorTips';

export default function Step2Claim({ giftInfo }: { giftInfo: any }) {
  const { deviceId } = useWallet();
  const { da_owner, keyNonce, hasFetchedDA } = useDexAccount();
  const { walletIdSign } = useWalletOprs();
  const [claimeSuccess, setClaimeSuccess] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showErrorTips, setShowErrorTips] = useState(false);
  const intl = useIntl();
  const hasAccessToken = useHasAccessToken();
  const signToView = useSignToView();
  const claimGift = useClaimGift();
  const navigate = useNavigate();
  const botAddress = { address: '' };

  // 220008 same device
  // 220007 same owner

  useEffect(() => {
    if (!hasAccessToken) {
      signToView({ tips: intl.sign_to_view });
    }
  }, [giftInfo, hasAccessToken, signToView, intl]);

  useEffect(() => {
    const time = Date.now();
    const signMessage = `${time}:${da_owner}`;
    if (isClaiming || hasClaimed) return;
    if (!keyNonce) return;
    if (!hasFetchedDA) return;
    if (!botAddress?.address) return;
    if (!hasAccessToken) {
      return;
    }
    setIsClaiming(true);
    setHasClaimed(true);
    walletIdSign(signMessage).then((resp) => {
      claimGift({
        deviceId,
        code: giftInfo?.code,
        botAddress: botAddress?.address,
        timestamp: time,
        signature: resp.signature,
      })
        .then(() => {
          setClaimeSuccess(true);
        })
        .catch((err) => {
          if (err?.code === 220007 || err?.code === 220008) {
            setClaimeSuccess(true);
          } else {
            setShowErrorTips(true);
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasAccessToken,
    hasFetchedDA,
    giftInfo?.code,
    deviceId,
    da_owner,
    isClaiming,
    walletIdSign,
    claimGift,
    keyNonce,
    botAddress?.address,
  ]);

  if (showErrorTips) {
    return <ErrorTips />;
  }

  return (
    <StyledGiftBox>
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
        {claimeSuccess && (
          <div className="box-tips">
            {intl.gift.has_been_sent_to_your_CopyTrade_account}
          </div>
        )}
      </div>
      {claimeSuccess && (
        <>
          <PrimaryBtn
            eventName="btn_gift_box_to_view_account"
            onClick={() => {
              navigate('/copy-trade/account?showAccount');
            }}
          >
            {intl.gift.View_My_Account}
          </PrimaryBtn>
          <GALinkWrapper
            eventName="btn_gift_box_to_view_account"
            className="link"
            onClick={() => {
              navigate(`/gift/detail/${giftInfo?.code}`);
            }}
          >
            {intl.gift.View_Gift_Box}
          </GALinkWrapper>
        </>
      )}
    </StyledGiftBox>
  );
}

const StyledGiftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .dg-primary {
    margin-top: 60px;
  }
  .link {
    margin-top: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 30px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;
