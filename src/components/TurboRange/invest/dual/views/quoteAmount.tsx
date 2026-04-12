import React, { useCallback } from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import SelectUsdc from 'src/components/SelectUsdc';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import ModalKeys from 'src/state/application/modalKeys';
import { useIsLoadingTurboRangeProducts } from 'src/state/turboRange/hooks';
import { useThemeParams } from 'src/theme';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useApyContext } from '../../apyProvider';
import { useDualInvest } from '../dataProvider';

export default function QuoteAmount() {
  const intl = useIntl();
  const { product } = useApyContext();
  const {
    quoteAmount,
    setQuoteAmount,
    setIsQuoteMaxModel,
    isQuoteMaxModel,
    quoteBalance,
    usdcToken,
    setUsdcToken,
    overQuoteBalance,
    overMax,
    tryResp,
    doTry,
    gasToken,
    isTryingQuoteMax,
    setIsTryingQuoteMax,
    setIsBaseMaxModel,
    setIsTryingBaseMax,
    belowQuoteMin,
  } = useDualInvest();

  const { isMobile } = useThemeParams();
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
    <StyledAmount className="quote-amount">
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
              modalKey={
                isMobile ? ModalKeys.chooseUsdc : ModalKeys.chooseUsdcWEB
              }
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

  .item-title {
    margin-bottom: 7px;
    font-weight: 500;
  }
  .mantine-Input-input {
    height: 50px;
    border-radius: 8px;
  }
`;
