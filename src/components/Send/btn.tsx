import React, { useCallback, useState } from 'react';

import { PrimaryBtn } from 'src/UI';

import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { UserCancel, useWalletOprs } from 'src/providers/useWallet';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { useTokensWithTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { logSend } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { multiply } from 'src/utils/numberUtils';

import { useSendData } from './sendDataProvider';

export default function SendBtn() {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const { hide } = useModals(ModalKeys.send);
  const {
    amount,
    paramsValid,
    isTrying,
    token,
    setShowError,
    tryResp,
    recipient,
    doTry,
    outChain,
  } = useSendData();
  const [tokenInfo] = useTokensWithTokenInfo({ tokens: token ? [token] : [] });
  const value = tokenInfo?.price ? multiply(tokenInfo.price, amount) : '';
  const { createSendOrder } = useWalletOprs();
  const showModal = useShowModal();
  const checkTryBalance = useCheckTryBalance();

  const checkAndSubmit = useCallback(() => {
    const { disabled } = paramsValid;
    if (disabled) {
      setShowError(true);
      return;
    }
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    if (loading || !token || !amount) {
      logSend({
        event: 'send: check',
        loading,
        token: {
          chain: token?.chain,
          code: token?.code,
          symbol: token?.symbol,
        },
        amount,
      });
    }
    if (loading) {
      return;
    }
    setLoading(true);
    logSend({
      event: 'send: submit',
      token: {
        chain: token?.chain,
        code: token?.code,
        symbol: token?.symbol,
      },
      amount,
    });
    createSendOrder({
      token: token as Token,
      chain: outChain as Type_DAChains,
      recipient,
      amount,
      tryResp,
      tokenValue: value as string,
    })
      .then((res) => {
        hide();
        logSend({
          event: 'send: submit success',
          token: {
            chain: token?.chain,
            code: token?.code,
            symbol: token?.symbol,
          },
          amount,
        });
        setLoading(false);
        showModal({
          modal: ModalKeys.sendOrderProgress,
          order: res.order,
          data: res.data,
          intent_id: res.intent_id,
        });
      })
      .catch((err) => {
        logSend({
          event: 'send: submit error',
          token: {
            chain: token?.chain,
            code: token?.code,
            symbol: token?.symbol,
          },
          amount,
          error: err?.error || err,
        });
        setLoading(false);
        if (err?.error?.code === INTENT_EXPIRED) {
          return;
        }
        if (err?.code !== UserCancel) {
          message.error(intl.common_err);
        }
      });
  }, [
    intl,
    token,
    amount,
    loading,
    paramsValid,
    setShowError,
    outChain,
    recipient,
    tryResp,
    createSendOrder,
    showModal,
    checkTryBalance,
    doTry,
    hide,
    value,
  ]);

  return (
    <>
      <PrimaryBtn
        eventName="btn_send"
        loading={isTrying}
        onClick={checkAndSubmit}
        disabled={!!tryResp?.showTryAmountError}
      >
        {intl.Send}
      </PrimaryBtn>
    </>
  );
}
