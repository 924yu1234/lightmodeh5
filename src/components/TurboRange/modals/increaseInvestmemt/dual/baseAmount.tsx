import React, { useCallback } from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import BaseToken from 'src/components/TurboRange/baseToken';
import { useIntl } from 'src/locals';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useDualIncrease } from './dataProvider';

export default function BaseAmount() {
  const intl = useIntl();
  const {
    baseAmount,
    setBaseAmount,
    setIsBaseMaxModel,
    isTryingBaseMax,
    setIsTryingBaseMax,
    isBaseMaxModel,
    baseTokenIsGasToken,
    setIsQuoteMaxModel,
    setIsTryingQuoteMax,
    baseBalance,
    overBaseBalance,
    product,
    doTry,
    gasToken,
    tryResp,
  } = useDualIncrease();

  const setMax = useCallback(
    (e: any) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      if (baseTokenIsGasToken) {
        setIsQuoteMaxModel(0);
        setIsTryingQuoteMax(false);
        setIsBaseMaxModel(Date.now());
        setIsTryingBaseMax(true);
        return;
      }
      setIsBaseMaxModel(0);
      setIsTryingBaseMax(false);
      setBaseAmount(baseBalance || '0');
    },
    [
      setBaseAmount,
      baseBalance,
      setIsBaseMaxModel,
      setIsTryingBaseMax,
      baseTokenIsGasToken,
      setIsQuoteMaxModel,
      setIsTryingQuoteMax,
    ]
  );

  return (
    <StyledAmount>
      <InputLimitDecimals
        decimals={product.baseToken?.decimals}
        placeholder="0"
        className={`amount ${
          overBaseBalance || !!tryResp?.showTryBaseAmountError
            ? 'err-border'
            : ''
        }`}
        value={baseAmount}
        onChange={(e: any) => {
          setIsBaseMaxModel(0);
          setIsTryingBaseMax(false);
          setBaseAmount(enterNumberCheck(e.target.value));
        }}
        onBlur={(e: any) => {
          if (!isNumber(e.target.value)) {
            setIsBaseMaxModel(0);
            setIsTryingBaseMax(false);
            setBaseAmount('');
          }
          doTry(gasToken);
        }}
        inputMode="decimal"
        rightSection={
          <StyledSuffix>
            {Number(baseBalance) > 0 && (
              <>
                {isTryingBaseMax && isBaseMaxModel ? (
                  <Loader />
                ) : (
                  <div className="max-btn" onClick={setMax}>
                    {intl.btn_max}
                  </div>
                )}
              </>
            )}
            <BaseToken baseToken={product.baseToken} />
          </StyledSuffix>
        }
      />
    </StyledAmount>
  );
}

const StyledSuffix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledAmount = styled.div`
  .mantine-Input-input {
    height: 50px;
    border-radius: 8px;
    background: ${({ theme }) => theme.bg_white_10};
  }
`;
