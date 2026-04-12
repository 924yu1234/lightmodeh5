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
import { logSendV2 } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { multiply } from 'src/utils/numberUtils';

import { useSendV2Data } from './sendDataProvider';

export default function SendV2Btn() {
  const { hide } = useModals(ModalKeys.sendV2);
  const { amount, token, tryResp, isTrying, recipient, outChain, doTry } =
    useSendV2Data();
  const [tokenInfo] = useTokensWithTokenInfo({ tokens: [token] });
  const value = tokenInfo?.price ? multiply(tokenInfo.price, amount) : '';
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const { createSendOrder } = useWalletOprs();
  const showModal = useShowModal();
  const checkTryBalance = useCheckTryBalance();
  const checkAndSubmit = useCallback(() => {
    if (!amount || !token || !tryResp) {
      return;
    }
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    logSendV2({
      event: 'send v2: submit',
      token: {
        chain: token?.chain,
        code: token?.code,
        symbol: token?.symbol,
      },
    });
    createSendOrder({
      token: token as Token,
      chain: outChain as Type_DAChains,
      recipient,
      amount,
      tokenValue: value as string,
      tryResp,
    })
      .then((res) => {
        hide();
        logSendV2({
          event: 'send v2: submit success',
          token: {
            chain: token?.chain,
            code: token?.code,
            symbol: token?.symbol,
          },
          amount,
        });
        showModal({
          modal: ModalKeys.sendOrderProgress,
          order: res.order,
          data: res.data,
          intent_id: res.intent_id,
        });
      })
      .catch((err) => {
        logSendV2({
          event: 'send v2: submit error',
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
    amount,
    token,
    tryResp,
    checkTryBalance,
    createSendOrder,
    showModal,
    recipient,
    doTry,
    outChain,
    hide,
    value,
  ]);
  return (
    <PrimaryBtn
      eventName="btn_send_confirm"
      className="send-btn"
      loading={isTrying || loading}
      onClick={checkAndSubmit}
      disabled={!!tryResp?.showTryAmountError}
    >
      {intl.Continue}
    </PrimaryBtn>
  );
}
