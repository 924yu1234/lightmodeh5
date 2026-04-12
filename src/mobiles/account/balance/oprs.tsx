import React from 'react';
import styled from 'styled-components';

import ReceiveGuide from 'src/components/ExternalWalletGuide/ReceiveGuide';
import IconOprBuy from 'src/components/Icons/oprBuy';
import IconOprHistory from 'src/components/Icons/oprHistory';
import IconOprReceive from 'src/components/Icons/oprReceive';
import IconOprSend from 'src/components/Icons/oprSend';
import IconReferral from 'src/components/Icons/referral';
import { useGaEvent } from 'src/providers/useWallet';
import { useOprBuyWithCashLink } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import useSend from 'src/state/dexAccount/opr/useSend';
import WindowOpen from 'src/utils/windowOpen';

import useCustomNavigate from 'js/hooks/useCustomNavigate';
import { useIntl } from 'js/locals';

export default function AssetsOprs() {
  const intl = useIntl();
  const receive = useReceive();
  const send = useSend();
  const navigate = useCustomNavigate();
  const { hasAccessToken, ownerReferralCode } = useDexAccount();
  const oprBuyWithCashLink = useOprBuyWithCashLink();
  const gaEvent = useGaEvent();
  const showReferral = !!hasAccessToken && !!ownerReferralCode;

  return (
    <StyledOprs className="top-oprs">
      <ReceiveGuide>
        <div className="top-item">
          <IconOprReceive
            className="item-icon"
            onClick={() => {
              gaEvent?.('web_button_click', {
                buttonName: 'btn_balance_receive',
              });
              receive();
            }}
          />
          <div className="item-label">{intl.Receive}</div>
        </div>
      </ReceiveGuide>
      <div className="top-item">
        <IconOprSend
          className="item-icon"
          onClick={() => {
            gaEvent?.('web_button_click', { buttonName: 'btn_balance_send' });
            send({ token: undefined });
          }}
        />
        <div className="item-label">{intl.Send}</div>
      </div>

      {oprBuyWithCashLink && (
        <div className="top-item">
          <IconOprBuy
            className="item-icon"
            onClick={() => {
              gaEvent?.('web_button_click', {
                buttonName: 'btn_balance_cash_buy',
              });
              WindowOpen(oprBuyWithCashLink);
            }}
          />
          <div className="item-label">{intl.Cash_Buy}</div>
        </div>
      )}

      <div className="top-item">
        <IconOprHistory
          className="item-icon"
          onClick={() => {
            gaEvent?.('web_button_click', {
              buttonName: 'btn_balance_history',
            });
            navigate('/account/history');
          }}
        />
        <div className="item-label">{intl.history}</div>
      </div>

      {showReferral && (
        <div className="top-item">
          <IconReferral
            className="item-icon"
            size={28}
            onClick={() => {
              gaEvent?.('web_button_click', {
                buttonName: 'btn_balance_referral',
              });
              navigate('/referral');
            }}
          />
          <div className="item-label">{intl.referral}</div>
        </div>
      )}
    </StyledOprs>
  );
}

export const StyledOprs = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  padding: 0 10px 24px;
  width: 100%;
  margin-top: 30px;
  border-bottom: 4px solid #030303;

  .guide-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 0 0 25%;
    max-width: 25%;
    box-sizing: border-box;
    min-width: 0;
    height: 70px;
  }

  .top-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 0 0 25%;
    max-width: 25%;
    box-sizing: border-box;
    min-width: 0;
    height: 70px;
    padding: 7px 4px;
    border-radius: 8px;
    @media (hover: hover) {
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
    }
    .item-label {
      ${(props) => props.theme.fontRegular};
      color: ${(props) => props.theme.t_f4f};
      font-size: 14px;
      line-height: 20px;
      margin-top: 6px;
      max-width: 60px;
      white-space: nowrap;
    }
    .item-icon {
      height: 28px;
      color: ${({ theme }) => theme.blue};
    }
  }
`;
