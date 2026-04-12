import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import AddFundsGuide from 'src/components/ExternalWalletGuide/AddFundsGuide';
import Spin from 'src/components/Spin';
import SwapDataWarning from 'src/components/SwapDataWarning';
import { OrderDirs } from 'src/constants/interface';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useCurrentSwapPair,
  useSwapPairTickerLoading,
} from 'src/state/swap/pair/hooks';
import { useSwapOrderDir, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';

import SwapInfo from './info';
import IntentOrderBtn from './intentBtn';
import OrderDir from './orderDir';
import SwapPayBase from './payBase';
import SwapPayQuote from './payQuote';

export default function SwapTrade() {
  const tickerLoading = useSwapPairTickerLoading();
  const orderDir = useSwapOrderDir();
  const { usdcToken } = useSwapTradeInfo();
  const { baseToken } = useCurrentSwapPair();
  const { account } = useDexAccount();

  return (
    <StyledSwapTrade>
      <div className="trade-inner">
        <Spin spinning={tickerLoading}>
          <OrderDir />
          <div className="place-inner">
            {orderDir === OrderDirs.BUY ? <SwapPayQuote /> : <SwapPayBase />}
            <SwapInfo />
            <IntentOrderBtn />
            {!!account && (
              <>
                <div className="add_funds">
                  <AddFunds
                    token={orderDir === OrderDirs.SELL ? baseToken : usdcToken}
                  />
                </div>
                <AddFundsGuide />
              </>
            )}
            <div className="swap-data-warning-wrap">
              <SwapDataWarning />
            </div>
          </div>
        </Spin>
      </div>
    </StyledSwapTrade>
  );
}

export const StyledSwapTrade = styled.div`
  ${(props) => props.theme.fontRegular};
  width: 100%;
  height: 100%;
  .trade-inner {
    height: 100%;
  }
  background: ${(props) => props.theme.placeOrderBg};
  .place-inner {
    padding: 5px 14px 0;
  }
  .dg-slider {
    margin: 0;
  }
  .opr-btn {
    width: 100%;
    height: 46px;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    border-radius: 5px;
    margin-top: 20px;
  }
  .dg-swap-buy,
  .dg-swap-sell {
    margin-top: 20px;
  }
  .enable-quick-trading-btns {
    margin-top: 20px;
    .mantine-Button-root {
      margin: 0;
    }
  }
  .swap-data-warning-wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .add_funds {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    display: flex;
    align-items: center;
    line-height: 20px;
    gap: 4px;
    margin-top: 15px;
    cursor: pointer;
    justify-content: center;
  }
  .add-funds-guide {
    margin-top: 5px;
  }
`;
