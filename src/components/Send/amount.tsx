import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useSwapBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import { formatTokenSymbol } from 'src/utils/format';
import { enterNumberCheck, isLessOrEqualThan } from 'src/utils/numberUtils';
import { tokenIsBtc } from 'src/utils/token';

import MaxAvaiableTip from '../EstNetworkFee/maxAvaiableTip';
import IconBalance from '../Icons/balance';
import InputLimitDecimals from '../Input/InputLimitDecimals';
import Loader from '../Loader';
import { useSendData, useSendMaxAmount } from './sendDataProvider';

export default function SendAmount() {
  const intl = useIntl();

  const {
    amount,
    showError,
    tryErrorCode,
    token: token_,
    paramsValid,
    setAmount,
    tryResp,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
    recipient,
    outChain,
  } = useSendData();
  const token = useSwapBalance({ token: token_ });

  const { overMax, tokenTips, recipientError, tokenErr } = paramsValid;

  const amountErr = !isNumber(amount) || isLessOrEqualThan(amount, 0);

  const maxDecimals = token?.decimals as number;
  const maxAmount = useSendMaxAmount({ token });
  const isBtc = tokenIsBtc(token);

  const doMax = useCallback(
    (e: any) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      if (isBtc) {
        setAmount(maxAmount);
        return;
      }
      if (!recipient || !outChain || recipientError || tokenErr) {
        setAmount(maxAmount);
      } else {
        setIsMaxModel(Date.now());
        setIsTryingMax(true);
      }
    },
    [
      outChain,
      maxAmount,
      setAmount,
      recipientError,
      tokenErr,
      setIsMaxModel,
      setIsTryingMax,
      recipient,
      isBtc,
    ]
  );

  return (
    <StyledWithdraw>
      <div className="send-item">
        <InputLimitDecimals
          inputMode="decimal"
          placeholder="0"
          className={`amount ${
            !!tokenTips ||
            overMax ||
            (showError && amountErr) ||
            !!tryResp?.showTryAmountError
              ? 'err-border'
              : ''
          }`}
          rightSection={token ? formatTokenSymbol(token?.symbol) : null}
          value={amount}
          onChange={(e: any) => {
            setIsMaxModel(0);
            const val = enterNumberCheck(e.target.value);
            setAmount(val);
          }}
          decimals={token?.decimals}
          onBlur={(e: any) => {
            const val = enterNumberCheck(e.target.value);
            if (!isNumber(val)) {
              setAmount('');
              return;
            }
            setAmount(
              digit.formatWithDecimals(val, maxDecimals, { floor: true })
            );
          }}
        />
      </div>
      {!tokenTips && (
        <MaxAvaiableTip
          tryResp={tryResp}
          onHandleMax={(num) => setAmount(num)}
        />
      )}
      {tokenTips && <div className="error_tips">{tokenTips}</div>}
      {overMax && !tokenTips && (
        <div className="error_tips">{intl.degate_insufficient_balance}</div>
      )}
      {showError && amountErr && (
        <div className="error_tips">{intl.required}</div>
      )}
      {tryErrorCode === 140019 && (
        <div className="error_tips">{intl.Invalid_SOL_rent}</div>
      )}
      {!!token?.code && (
        <div className="balance">
          <IconBalance />
          <span
            className="balance-value cursor-pointer"
            onClick={(e) => {
              if (Number(token?.available) > 0) {
                doMax(e);
              }
            }}
          >
            {token?.availableDisplay} {formatTokenSymbol(token?.symbol)}
          </span>
          {Number(token?.available) > 0 && (
            <>
              {isTryingMax ? (
                <Loader />
              ) : (
                <div className="max-btn" onClick={doMax}>
                  {intl.btn_max}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </StyledWithdraw>
  );
}

const StyledWithdraw = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .mantine-Input-input {
    padding: 0 16px;
    height: 50px;
  }

  .max-available-tip {
    margin-top: 5px;
  }

  .balance {
    margin-top: 10px;
    color: ${({ theme }: { theme: ThemeType }) => theme.modalText};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    white-space: nowrap;
    align-items: center;
    display: flex;
    line-height: 24px;
    gap: 5px;
  }
`;
