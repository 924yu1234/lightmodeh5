import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useHasAccessToken } from 'src/providers/useWallet';
import { useSwapBalances } from 'src/state/swap/balances/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import {
  useSwapSellMaxBalance,
  useSwapTradeInfo,
  useSwapTypeInput,
} from 'src/state/swap/trade/hooks';
import useSwapTradeTypeInput from 'src/state/swap/trade/useTypeInput';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { isLessThan } from 'src/utils/numberUtils';
import { tokenIsBtc, tokenIsSol } from 'src/utils/token';

import IconBalance from '../Icons/balance';
import Loader from '../Loader';

export default function BaseBalance() {
  const { baseToken } = useCurrentSwapPair();
  const intl = useIntl();

  const hasAccessToken = useHasAccessToken();
  const [baseBalance] = useSwapBalances({ tokens: [baseToken] });
  const onUserInput = useSwapTypeInput();
  const { handleTypeBaseAmount } = useSwapTradeTypeInput();

  const showMax = isLessThan(0, baseBalance?.available);

  const isSol = tokenIsSol(baseToken);
  const isBtc = tokenIsBtc(baseToken);

  const sellMaxBalance = useSwapSellMaxBalance();
  const { isTryingMax } = useSwapTradeInfo();

  const showMaxValue = useMemo(() => {
    if (isSol) {
      return baseBalance?.available;
    }
    if (isBtc) {
      return baseBalance?.available;
    }
    return sellMaxBalance;
  }, [isSol, isBtc, sellMaxBalance, baseBalance?.available]);

  const calc = useCallback(() => {
    if (isBtc) {
      handleTypeBaseAmount({ target: { value: sellMaxBalance } });
      return;
    }
    onUserInput({
      fields: [
        { field: 'isMaxModel', val: true },
        { field: 'isTryingMax', val: Date.now() },
      ],
    });
  }, [onUserInput, handleTypeBaseAmount, sellMaxBalance, isBtc]);

  const availableDisplay = useMemo(() => {
    return digit.formatWithDecimalsLess8(showMaxValue, baseToken?.decimals, {
      floor: true,
    });
  }, [showMaxValue, baseToken?.decimals]);

  return (
    <StyledBalance
      className={`quote-balance ${showMax ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (showMax) {
          calc();
        }
      }}
    >
      <IconBalance />
      {hasAccessToken ? (
        <div>{availableDisplay || '0'}</div>
      ) : (
        <div className="balance-num">--</div>
      )}
      {showMax && (
        <>
          {isTryingMax ? (
            <Loader />
          ) : (
            <div className="max" onClick={calc}>
              {intl.btn_max}
            </div>
          )}
        </>
      )}
    </StyledBalance>
  );
}

const StyledBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  .max {
    cursor: pointer;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    border-radius: 2px;
    padding: 0 4px;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
    height: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
`;
