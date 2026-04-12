import React, { useState } from 'react';

import { PrimaryBtn } from 'src/UI';

import BtnWrapper from 'src/components/BtnWrapper';
import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import useCreateEarnOrder from 'src/state/dexAccount/opr/useCreateEarnOrder';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { isNumber } from 'src/utils/digit';
import { logEarn } from 'src/utils/log/swap';

import { useVaultWithdraw } from './dataProvider';

export default function EarnWithdrawBtn() {
  const intl = useIntl();
  const {
    showAvailableError,
    amount,
    vault,
    setAmount,
    isTrying,
    tryResp,
    doTry,
  } = useVaultWithdraw();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);
  const showModal = useShowModal();

  const createEarnOrder = useCreateEarnOrder();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const checkTryBalance = useCheckTryBalance();

  const withdraw = () => {
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    gaEvent('create_earn_withdraw_order', {
      method: 'pending',
      vault: {
        id: vault.id,
        description: undefined,
      },
      amount,
    });
    logEarn({
      event: 'earn withdraw pending',
      vault: {
        id: vault.id,
      },
      amount,
    });

    createEarnOrder({
      vault,
      type: 'withdraw',
      amount,
      tryResp,
    })
      .then((res: any) => {
        setAmount('');
        showModal({
          modal: ModalKeys.earnOrderProgress,
          order: { ...res.order, status: SwapOrderStatus.processing },
          intent_id: res.intent_id,
          tryResp,
          vault,
        });
        gaEvent('create_earn_withdraw_order', {
          method: 'success',
          vault: {
            id: vault.id,
            description: undefined,
          },
          amount,
        });
        logEarn({
          event: 'earn withdraw success',
          vault: {
            id: vault.id,
            description: undefined,
          },
          amount,
        });
      })
      .catch((err) => {
        gaEvent('create_earn_withdraw_order', {
          method: 'error',
          vault: {
            id: vault.id,
          },
          amount,
          error: err,
        });
        logEarn({
          event: 'earn withdraw error',
          vault: {
            id: vault.id,
          },
          amount,
          err,
        });
        if (err?.error?.code === INTENT_EXPIRED) {
          return;
        }
        if (err?.order) {
          showModal({
            modal: ModalKeys.earnOrderProgress,
            order: { ...err.order, status: SwapOrderStatus.failed },
          });
        }

        // message.error(intl.common_err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <BtnWrapper source="earn">
      <PrimaryBtn
        eventName="btn_earn_withdraw"
        loading={loading || isFetchingDetail || isTrying}
        disabled={
          showAvailableError || !isNumber(amount) || Number(amount) <= 0
        }
        onClick={withdraw}
      >
        {intl.Withdraw}
      </PrimaryBtn>
    </BtnWrapper>
  );
}
