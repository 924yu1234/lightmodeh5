import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import {
  BridgeUsdcOrderParams,
  IntentTryItemResp,
} from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useTimeStr_DdayHhourMminuteSsecond } from 'src/hooks/useTimeStr';
import { useIntl } from 'src/locals';
import { UserCancel, useWalletOprs } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import EstNetworkFeeInConfirm from '../EstNetworkFee/inConfirm';
import IntentValidityChecker from '../IntentValidityChecker';
import BottomModal from '../Modals/bottomModal';

export default function BridgeUsdcConfirmModal() {
  const intl = useIntl();
  const { visible, hide, order, resolve } = useModals(
    ModalKeys.APP_CREATE_BRIDGE_USDC_ORDER
  );
  const { fromToken, toToken, amount, tryResp } = (order ||
    {}) as BridgeUsdcOrderParams;
  const hideModal = () => {
    hide();
  };
  const { callAppPromise } = useWalletOprs();
  const chainInfoMap = useChainInfosMap();

  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);

  const doSign = useCallback(async () => {
    setLoading(true);
    callAppPromise('createCompactIntent', tryResp)
      .then((resp) => {
        setLoading(false);
        hide();
        resolve({
          order,
          intent_id: resp.intent.intent_id,
        });
      })
      .catch((err) => {
        setLoading(false);
        resolve(Promise.reject(err));
      });
  }, [tryResp, order, callAppPromise, hide, resolve]);

  const closeModal = () => {
    hide();
    if (resolve) {
      resolve(Promise.reject({ code: UserCancel }));
    }
  };
  const estimateTime = (tryResp as any)?.estimate_time || 0;
  const getTimeStr = useTimeStr_DdayHhourMminuteSsecond();

  return (
    <BottomModal onClose={closeModal} opened={visible} zIndex={201}>
      <IntentValidityChecker
        tryResp={tryResp as IntentTryItemResp}
        updateExpired={(expired) => setExpired(expired)}
      />
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.Bridge}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content">
          <div className="amount">{amount}</div>
          <div className="amount-symbol">{fromToken?.symbol}</div>
          <div className="item-info">
            <div className="item-info-title">{intl.From}</div>
            <div className="item-info-value">
              {chainInfoMap[fromToken?.chain as Type_DAChains]?.name}
            </div>
          </div>
          <div className="item-info">
            <div className="item-info-title">{intl.To}</div>
            <div className="item-info-value">
              {chainInfoMap[toToken?.chain as Type_DAChains]?.name}
            </div>
          </div>
          <div className="item-info">
            <div className="item-info-title">{intl.est_time}</div>
            <div className="item-info-value">
              {intl.around}
              {getTimeStr(estimateTime)}
            </div>
          </div>
          <div className="item-info" style={{ marginBottom: 'auto' }}>
            <div className="item-info-title">{intl.est_network_fee}</div>
            <div className="item-info-value">
              <EstNetworkFeeInConfirm tryResp={tryResp} />
            </div>
          </div>
          {expired ? (
            <div className="btns">
              <PrimaryBtn
                eventName="btn_bridge_usdc_order_expired"
                onClick={closeModal}
                loading={loading}
              >
                {intl.Close}
              </PrimaryBtn>
            </div>
          ) : (
            <div className="btns">
              <GhostBtn
                eventName="btn_bridge_usdc_confirm_cancel"
                onClick={closeModal}
              >
                {intl.Cancel}
              </GhostBtn>
              <PrimaryBtn
                eventName="btn_bridge_usdc_confirm_confirm"
                onClick={doSign}
                loading={loading}
              >
                {intl.Confirm}
              </PrimaryBtn>
            </div>
          )}
        </div>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  color: white;

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .amount {
      margin-top: 10px;
      font-size: 36px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      line-height: 40px;
    }
    .amount-symbol {
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      line-height: 26px;
      margin-bottom: 40px;
    }
    .item-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      width: 100%;
      .item-info-title {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
      .total-value {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
    }
    .btns {
      margin-top: 30px;
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: center;
      .dg-ghost,
      .dg-primary {
        flex: 1;
      }
    }
  }
`;
