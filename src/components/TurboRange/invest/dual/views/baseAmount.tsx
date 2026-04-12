import React, { useCallback } from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import BaseToken from 'src/components/TurboRange/baseToken';
import { useIntl } from 'src/locals';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useApyContext } from '../../apyProvider';
import { useDualInvest } from '../dataProvider';

export default function BaseAmount() {
  const intl = useIntl();
  const { product } = useApyContext();
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
    doTry,
    gasToken,
    tryResp,
  } = useDualInvest();

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
      baseTokenIsGasToken,
      setIsBaseMaxModel,
      setIsTryingBaseMax,
      setIsQuoteMaxModel,
      setIsTryingQuoteMax,
    ]
  );

  return (
    <StyledAmount className="base-amount">
      <div className="item-title">{intl.amount}</div>
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
            <BaseToken baseToken={product?.baseToken} />
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
  margin-top: 0;

  .item-title {
    margin-bottom: 7px;
    font-weight: 500;
  }
  .mantine-Input-input {
    height: 50px;
    border-radius: 8px;
  }
`;
