import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useSwapQuoteTokenBalance,
  useSwapTradeInfo,
  useSwapTypeInput,
} from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { isLessThan } from 'src/utils/numberUtils';

import IconBalance from '../Icons/balance';
import Loader from '../Loader';

export function QuoteBalance() {
  const { usdcToken } = useSwapTradeInfo();
  const quoteTokenBalance = useSwapQuoteTokenBalance();

  const intl = useIntl();
  const hasAccessToken = useHasAccessToken();
  const onUserInput = useSwapTypeInput();
  const { isTryingMax } = useSwapTradeInfo();

  const calc = useCallback(() => {
    onUserInput({
      fields: [
        { field: 'isMaxModel', val: true },
        { field: 'isTryingMax', val: Date.now() },
      ],
    });
  }, [onUserInput]);

  const quoteBalanceShow = digit.formatWithMaxLength8(
    quoteTokenBalance,
    usdcToken?.decimals,
    {
      precision: '#',
      groupSeparator: true,
      floor: true,
    }
  );

  const showMax = isLessThan(0, quoteTokenBalance);

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
        <div>{quoteBalanceShow || '0'}</div>
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
  min-height: 20px;
  .text-underline-dotted {
    cursor: pointer;
  }
  .max {
    cursor: pointer;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    border-radius: 2px;
    padding: 0 4px;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    height: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
`;
