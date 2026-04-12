import React, { useCallback } from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import SelectUsdc from 'src/components/SelectUsdc';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useIsLoadingTurboRangeProducts } from 'src/state/turboRange/hooks';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useDualIncrease } from './dataProvider';

export default function QuoteAmount() {
  const intl = useIntl();
  const {
    quoteAmount,
    setQuoteAmount,
    setIsQuoteMaxModel,
    setIsTryingQuoteMax,
    quoteBalance,
    usdcToken,
    setUsdcToken,
    overQuoteBalance,
    overMax,
    tryResp,
    product,
    doTry,
    gasToken,
    isTryingQuoteMax,
    isQuoteMaxModel,
    setIsTryingBaseMax,
    setIsBaseMaxModel,
    belowQuoteMin,
  } = useDualIncrease();

  const loadingProducts = useIsLoadingTurboRangeProducts();

  const setMax = useCallback(
    (e: any) => {
      if (belowQuoteMin) {
        setQuoteAmount('');
      }
      e?.stopPropagation?.();
      e?.preventDefault?.();
      setIsQuoteMaxModel(Date.now());
      setIsTryingQuoteMax(true);
      // reset base max model
      setIsBaseMaxModel(0);
      setIsTryingBaseMax(false);
    },
    [
      belowQuoteMin,
      setQuoteAmount,
      setIsQuoteMaxModel,
      setIsTryingQuoteMax,
      setIsBaseMaxModel,
      setIsTryingBaseMax,
    ]
  );

  return (
    <StyledAmount>
      <InputLimitDecimals
        decimals={usdcToken?.decimals}
        placeholder="0"
        className={`amount ${
          overQuoteBalance || overMax || !!tryResp?.showTryQuoteAmountError
            ? 'err-border'
            : ''
        }`}
        value={quoteAmount}
        onChange={(e: any) => {
          setIsTryingQuoteMax(false);
          setIsBaseMaxModel(0);
          setIsTryingBaseMax(false);
          setIsQuoteMaxModel(0);
          setQuoteAmount(enterNumberCheck(e.target.value));
        }}
        onBlur={(e: any) => {
          if (!isNumber(e.target.value)) {
            setIsTryingQuoteMax(false);
            setIsQuoteMaxModel(0);
            setQuoteAmount('');
          }
          doTry(gasToken);
        }}
        inputMode="decimal"
        rightSection={
          <StyledSuffix>
            {Number(quoteBalance) > 0 && (
              <>
                {isTryingQuoteMax && isQuoteMaxModel ? (
                  <Loader />
                ) : (
                  <div className="max-btn" onClick={setMax}>
                    {intl.btn_max}
                  </div>
                )}
              </>
            )}
            <SelectUsdc
              loading={loadingProducts}
              usdc={usdcToken}
              initChainWhileNoBalances={
                product?.baseToken?.chain as Type_DAChains
              }
              selectUsdc={(usdc: Token) => {
                setIsQuoteMaxModel(0);
                setUsdcToken(usdc);
              }}
            />
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
  margin-top: 10px;

  .mantine-Input-input {
    height: 50px;
  }
`;
