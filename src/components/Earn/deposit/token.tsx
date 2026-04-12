import React, { useCallback } from 'react';
import styled from 'styled-components';

import MaxAvaiableTip from 'src/components/EstNetworkFee/maxAvaiableTip';
import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import SelectUsdc from 'src/components/SelectUsdc';
import TokenSymbol from 'src/components/Token/symbol';
import { Token } from 'src/constants/interface';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { enterNumberCheck } from 'src/utils/numberUtils';

import { useIntl } from 'js/locals';

import { useVaultDeposit } from './dataProvider';
import DepositAvailable from './depositAvailable';

export default function EarnDepositToken() {
  const intl = useIntl();
  const {
    isUsdc,
    token,
    amount,
    setAmount,
    showBalanceError,
    balanceTotal,
    usdcToken,
    setUsdcToken,
    tryResp,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  } = useVaultDeposit();

  const setMax = useCallback(
    (e: any) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      setIsMaxModel(Date.now());
      setIsTryingMax(true);
    },
    [setIsMaxModel, setIsTryingMax]
  );

  return (
    <StyledAmount className="amount">
      <div className="item-title">{intl.amount}</div>
      <InputLimitDecimals
        decimals={usdcToken?.decimals}
        placeholder="0"
        className={`amount ${
          showBalanceError || !!tryResp?.showTryAmountError ? 'err-border' : ''
        }`}
        value={amount}
        onChange={(e: any) => {
          setIsMaxModel(0);
          setAmount(enterNumberCheck(e.target.value));
        }}
        onBlur={(e: any) => {
          if (!isNumber(e.target.value)) {
            setAmount('');
          }
        }}
        inputMode="decimal"
        rightSection={
          <StyledSuffix>
            {Number(balanceTotal) > 0 && (
              <>
                {isTryingMax ? (
                  <Loader />
                ) : (
                  <div className="max-btn" onClick={setMax}>
                    {intl.btn_max}
                  </div>
                )}
              </>
            )}
            {isUsdc ? (
              <SelectUsdc
                usdc={usdcToken}
                selectUsdc={(usdc: Token) => {
                  setIsMaxModel(0);
                  setUsdcToken(usdc);
                }}
              />
            ) : (
              <TokenSymbol token={token} hideCode iconSize={24} />
            )}
          </StyledSuffix>
        }
      />
      <MaxAvaiableTip tryResp={tryResp} onHandleMax={(num) => setAmount(num)} />
      <DepositAvailable />
    </StyledAmount>
  );
}

const StyledAmount = styled.div`
  width: 100%;
  .item-title {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .mantine-Input-input {
    height: 50px;
  }
  .max-available-tip {
    margin-top: 7px;
  }
`;

const StyledSuffix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
