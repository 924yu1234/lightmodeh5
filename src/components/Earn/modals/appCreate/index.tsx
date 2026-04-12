import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import IntentValidityChecker from 'src/components/IntentValidityChecker';
import { IntentTryItemResp } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useGaEvent, UserCancel, useWalletOprs } from 'src/providers/useWallet';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';
import { logEarn } from 'src/utils/log/swap';

import ClaimView from './claim';
import DepositAndWithdrawView from './depositAndwithdraw';

export default function AppCreateEarnOrderModal() {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const { order, resolve, hide, tryResp, visible } = useModals(
    ModalKeys.APP_CREATE_EARN_ORDER
  );
  const { callAppPromise } = useWalletOprs();
  const { type } = order;
  const gaEvent = useGaEvent();

  const doSign = useCallback(async () => {
    setLoading(true);
    gaEvent('create_earn_order_app', {
      method: 'pending',
      id: order?.id ?? '',
    });
    logEarn({
      event: 'app earn order pending',
      id: order?.id ?? '',
    });
    callAppPromise('createCompactIntent', tryResp)
      .then((res) => {
        const intent_id = res.intent.intent_id;
        hide();
        logEarn({
          event: 'app earn order success',
          id: order?.id ?? '',
        });
        gaEvent('create_earn_order_app', {
          method: 'success',
          id: order?.id ?? '',
        });
        resolve({
          order,
          intent_id,
        });
      })
      .catch((err) => {
        logEarn({
          event: 'app earn order error',
          id: order?.id ?? '',
          err: err?.error || err,
        });
        gaEvent('create_earn_order_app', {
          method: 'error',
          id: order?.id ?? '',
          error: err?.error || err,
        });
        resolve(Promise.reject({ error: err, order }));
      })
      .finally(() => {
        hide();
        setLoading(false);
      });
  }, [tryResp, callAppPromise, resolve, order, hide, gaEvent]);

  const closeModal = () => {
    resolve(Promise.reject({ code: UserCancel }));
    hide();
  };

  return (
    <Modal title={null} onClose={closeModal} opened={!!visible}>
      <IntentValidityChecker
        tryResp={tryResp as IntentTryItemResp}
        updateExpired={(expired) => setExpired(expired)}
      />
      <StyledOrder>
        <div className="modal-title">
          {type === 'claim' && intl.claim_rewards}
          <Close onClick={closeModal} />
        </div>
        {(type === 'deposit' || type === 'withdraw') && (
          <DepositAndWithdrawView order={order} tryResp={tryResp} />
        )}
        {type === 'claim' && <ClaimView order={order} tryResp={tryResp} />}
        {expired ? (
          <PrimaryBtn
            eventName="btn_create_earn_order_expired"
            onClick={closeModal}
            loading={loading}
          >
            {intl.Close}
          </PrimaryBtn>
        ) : (
          <PrimaryBtn
            eventName="btn_earn_app_create_confirm"
            onClick={doSign}
            loading={loading}
          >
            {intl.Confirm}
          </PrimaryBtn>
        )}
      </StyledOrder>
    </Modal>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .type {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 20px;
    margin-bottom: 6px;
  }
  .amount {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 3px;
  }

  .protocol {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 30px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    .label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      &.gas-fee {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }

  .modal-title {
    margin-bottom: 32px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;
