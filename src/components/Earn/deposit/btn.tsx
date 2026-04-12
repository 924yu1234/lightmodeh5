import React, { useState } from 'react';

import { PrimaryBtn } from 'src/UI';

import BtnWrapper from 'src/components/BtnWrapper';
import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { SwapOrderStatus } from 'src/constants/consts';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import { useInfo, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useCheckDAs } from 'src/state/dexAccount/opr/useCheckDAs';
import useCreateEarnOrder from 'src/state/dexAccount/opr/useCreateEarnOrder';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { isNumber } from 'src/utils/digit';
import { logEarn } from 'src/utils/log/swap';
import message from 'src/utils/message';

import { useVaultDeposit } from './dataProvider';

export default function EarnDepositBtn() {
  const intl = useIntl();
  const {
    showBalanceError,
    solTips,
    amount,
    vault,
    dailyRewards,
    isTrying,
    setAmount,
    tryResp,
    doTry,
  } = useVaultDeposit();
  const createEarnOrder = useCreateEarnOrder();
  // const preCheckSolBalance = usePreCheckSolBalance();
  const [loading, setLoading] = useState(false);
  const showModal = useShowModal();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);
  const checkRegion = useCheckRegion();
  const checkDAs = useCheckDAs();
  const gaEvent = useGaEvent();
  const checkTryBalance = useCheckTryBalance();

  const { simpleEarnDisabledDepositDAs } = useInfo();

  const deposit = async () => {
    if (simpleEarnDisabledDepositDAs.includes(vault?.address)) {
      message.error(intl.simple_earn_disabled_deposit_tips);
      return;
    }
    if (!checkDAs(vault?.chain as Type_DAChains)) {
      logEarn({
        event: 'earn_deposit_check_das',
        vault: {
          id: vault.id,
          chain: vault?.chain,
        },
      });
      return;
    }
    if (!checkRegion()) {
      return;
    }
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    gaEvent('create_earn_deposit_order', {
      method: 'pending',
      vault: {
        id: vault.id,
      },
      amount,
    });

    logEarn({
      event: 'earn deposit pending',
      vault: {
        id: vault.id,
      },
      amount,
    });

    createEarnOrder({
      vault,
      type: 'deposit',
      amount,
      dailyRewards,
      tryResp,
    })
      .then((res: any) => {
        window.hasEarnDepositOrder = true;
        setAmount('');
        showModal({
          modal: ModalKeys.earnOrderProgress,
          order: { ...res.order, status: SwapOrderStatus.processing, tryResp },
          intent_id: res.intent_id,
          tryResp,
          vault,
        });
        logEarn({
          event: 'earn deposit success',
          vault: {
            id: vault.id,
          },
          amount,
        });
        gaEvent('create_earn_deposit_order', {
          method: 'success',
          vault: {
            id: vault.id,
          },
          amount,
        });
      })
      .catch((err) => {
        logEarn({
          event: 'earn deposit error',
          vault: {
            id: vault.id,
          },
          amount,
          err: err?.error || err,
        });
        gaEvent('create_earn_deposit_order', {
          method: 'error',
          vault: {
            id: vault.id,
          },
          amount,
          error: err?.error || err,
        });

        if (err?.error?.code === INTENT_EXPIRED) {
          return;
        }
        if (err?.order) {
          showModal({
            modal: ModalKeys.earnOrderProgress,
            order: { ...err.order, status: SwapOrderStatus.failed, tryResp },
            vault,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <BtnWrapper source="earn">
      <PrimaryBtn
        eventName="btn_earn_deposit"
        loading={loading || isFetchingDetail || isTrying}
        disabled={
          showBalanceError ||
          !isNumber(amount) ||
          Number(amount) <= 0 ||
          !!solTips ||
          !!tryResp?.showTryAmountError
        }
        onClick={deposit}
      >
        {intl.Deposit}
      </PrimaryBtn>
    </BtnWrapper>
  );
}
