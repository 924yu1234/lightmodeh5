import React, { useMemo } from 'react';
import styled from 'styled-components';

import SwapArrivalTime from 'src/components/SwapPair/arrivalTime';
import SwapEstNetworkFee from 'src/components/SwapPair/networkFee';
import SwapSlippage from 'src/components/SwapSettings/slippage';
import TokenIcon from 'src/components/Token/icon';
import { OrderDirs } from 'src/constants/interface';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { useSwapOrderDir, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { formatTokenSymbol } from 'src/utils/format';

import { useIntl } from 'js/locals';
import { multiply } from 'js/utils/numberUtils';

export default function SwapInfo() {
  const intl = useIntl();
  const orderDir = useSwapOrderDir();
  const isBuy = orderDir === OrderDirs.BUY;

  const { baseAmount, quoteAmount } = useSwapTradeInfo();
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const { price } = useSwapTokenInfo(baseToken?.id);

  const baseValue = useMemo(() => {
    if (!price || !baseAmount || !quoteAmount) return '';
    return `$${digit.format(multiply(price, baseAmount), '0,0.##')}`;
  }, [price, baseAmount, quoteAmount]);

  let receiveToken = quoteToken;
  let receiveValue = quoteAmount;

  const isShowBase = isBuy;

  if (isShowBase) {
    receiveToken = baseToken;
    receiveValue = baseAmount;
    if (!quoteAmount) return null;
  } else {
    if (!baseAmount) return null;
    receiveValue = digit.formatWithDecimals(quoteAmount, quoteToken?.decimals, {
      floor: true,
    });
  }

  if (receiveValue === '0') {
    receiveValue = '';
  }

  return (
    <StyledSwapReceive className="receive" isShowBase={isShowBase}>
      <div className="receive-info">
        <div className="receive-title">{intl.est_receive}</div>
        <div className="receive-value">
          <div className="receive-token">
            <TokenIcon token={receiveToken} size={20} />
            {receiveValue || '--'} {formatTokenSymbol(receiveToken?.symbol)}
          </div>
          {isBuy && <div className="receive-usd">{baseValue}</div>}
        </div>
      </div>
      <SwapSlippage inInfo />
      <SwapEstNetworkFee />
      <SwapArrivalTime />
    </StyledSwapReceive>
  );
}

export const StyledSwapReceive = styled.div<{ isShowBase: boolean }>`
  margin-top: 20px;
  .slippage,
  .est-network-fee,
  .arrival-time {
    margin-top: 10px;
  }
  .receive-info {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    display: flex;
    align-items: flex-start;
    min-height: ${(props) => (props.isShowBase ? '38px' : '20px')};
    .receive-title {
      font-size: 14px;
      color: ${(props) => props.theme.t_b7b_80};
      line-height: 18px;
    }
    .receive-value {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      line-height: 18px;
      .receive-usd {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      }
      .receive-token {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
`;
