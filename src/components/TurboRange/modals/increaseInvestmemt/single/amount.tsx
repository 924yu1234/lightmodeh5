import React, { useCallback } from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import Loader from 'src/components/Loader';
import SelectUsdc from 'src/components/SelectUsdc';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { useIsLoadingTurboRangeProducts } from 'src/state/turboRange/hooks';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useIncrease } from './dataProvider';

export default function Amount() {
  const intl = useIntl();
  const {
    amount,
    setAmount,
    usdcToken,
    setUsdcToken,
    overBalance,
    overMax,
    tryResp,
    product,
    setIsMaxModel,
    setIsTryingMax,
    isTryingMax,
  } = useIncrease();

  const usdcBalance = useUsdcBalance({ token: usdcToken });
  const loadingProducts = useIsLoadingTurboRangeProducts();
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
          overBalance || overMax || !!tryResp?.showTryAmountError
            ? 'err-border'
            : ''
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
            {usdcBalance?.available > 0 && (
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
            <SelectUsdc
              loading={loadingProducts}
              usdc={usdcToken}
              initChainWhileNoBalances={
                product?.baseToken?.chain as Type_DAChains
              }
              selectUsdc={(usdc: Token) => {
                setIsMaxModel(0);
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
  margin-top: 4px;
  .item-title {
    margin-bottom: 8px;
  }
  .mantine-Input-input {
    height: 50px;
    border-radius: 8px;
    font-size: 16px;
  }
`;
