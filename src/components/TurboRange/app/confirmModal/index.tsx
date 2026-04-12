import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import IntentValidityChecker from 'src/components/IntentValidityChecker';
import BottomModal from 'src/components/Modals/bottomModal';
import TokenIcon from 'src/components/Token/icon';
import {
  IntentTryItemResp,
  TurboRangeOrderParams,
} from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { UserCancel, useWalletOprs } from 'src/providers/useWallet';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import ProductName from '../../productName';
import TurboRangeTag from '../../turboRangeTag';
import ClaimView from './claim';
import DepositView from './deposit';
import DualDepositView from './dualDeposit';
import DualIncreaseInvestmentView from './dualIncreaseInvestment';
import IncreaseInvestmentView from './increaseInvestment';
import WithdrawView from './withdraw';

export default function APPCreateTurboRangeOrderModal() {
  const intl = useIntl();
  const { order, resolve, hide, visible } = useModals(
    ModalKeys.APP_CREATE_TURBO_RANGE_ORDER
  );
  const { callAppPromise } = useWalletOprs();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const { product, type } = order as TurboRangeOrderParams;

  const tryResp = useMemo(() => {
    if (order.type === 'deposit') return order?.depositOrderParams?.tryResp;
    if (order.type === 'dualDeposit')
      return order?.dualDepositOrderParams?.tryResp;
    if (order.type === 'withdraw') return order?.withdrawOrderParams?.tryResp;
    if (order.type === 'claim') return order?.claimOrderParams?.tryResp;
    if (order.type === 'increaseInvestment')
      return order?.increaseInvestmentOrderParams?.tryResp;
    if (order.type === 'dualIncreaseInvestment')
      return order?.dualIncreaseInvestmentOrderParams?.tryResp;
    return {};
  }, [order]);

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
    resolve(Promise.reject({ code: UserCancel }));
  };

  return (
    <BottomModal onClose={closeModal} opened={!!visible}>
      <IntentValidityChecker
        tryResp={tryResp as IntentTryItemResp}
        updateExpired={(expired) => setExpired(expired)}
      />
      <StyledOrder className="modal-wrapper">
        <div className="modal-title">
          <Close onClick={closeModal} />
        </div>
        <div className="modal-content">
          <TokenIcon token={product.baseToken} size={32} hideChainIcon />
          <div className="token-symbol">
            <ProductName poolAddress={product.poolAddress} />
          </div>
          <TurboRangeTag />
          {type === 'deposit' && <DepositView order={order} />}
          {type === 'dualDeposit' && <DualDepositView order={order} />}
          {type === 'withdraw' && <WithdrawView order={order} />}
          {type === 'claim' && <ClaimView order={order} />}
          {type === 'increaseInvestment' && (
            <IncreaseInvestmentView order={order} />
          )}
          {type === 'dualIncreaseInvestment' && (
            <DualIncreaseInvestmentView order={order} />
          )}
          {expired ? (
            <PrimaryBtn
              eventName="btn_create_turbo_range_order_expired"
              onClick={closeModal}
              loading={loading}
            >
              {intl.Close}
            </PrimaryBtn>
          ) : (
            <PrimaryBtn
              eventName="btn_create_earn_order_confirm"
              onClick={doSign}
              loading={loading}
            >
              {intl.Confirm}
            </PrimaryBtn>
          )}
        </div>
      </StyledOrder>
    </BottomModal>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal-title {
    margin-bottom: 20px;
  }

  .dg-primary {
    margin-top: 15px;
    width: 100%;
  }

  .token-symbol {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 20px;
    line-height: 20px;
    margin: 10px 0 10px;
  }
  .turbo-range-tag {
    margin-bottom: 40px;
  }
`;
