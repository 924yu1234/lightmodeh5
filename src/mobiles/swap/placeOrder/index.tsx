import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import AddFundsGuide from 'src/components/ExternalWalletGuide/AddFundsGuide';
import Spin from 'src/components/Spin';
import { OrderDirs } from 'src/constants/interface';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useCurrentSwapPair,
  useSwapPairTickerLoading,
} from 'src/state/swap/pair/hooks';
import { useSwapOrderDir, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';

// import AdvancedSettings from './advancedSettings';
import SwapInfo from './info';
import IntentOrderBtn from './intentBtn';
import OrderDir from './orderDir';
import SwapPayBase from './payBase';
import SwapPayQuote from './payQuote';
export default function SwapTrade() {
  const tickerLoading = useSwapPairTickerLoading();
  const orderDir = useSwapOrderDir();
  const { baseToken } = useCurrentSwapPair();
  const { usdcToken } = useSwapTradeInfo();
  const { account } = useDexAccount();

  return (
    <StyledSwapTrade>
      <Spin spinning={tickerLoading}>
        <OrderDir />
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
      </Spin>
    </StyledSwapTrade>
  );
}

export const StyledSwapTrade = styled.div`
  ${(props) => props.theme.fontRegular};
  width: 100%;
  padding: 0 0 30px 0;
  .opr-btn {
    width: 100%;
    height: 46px;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    border-radius: 5px;
    margin-top: 20px;
  }

  .mantine-Button-root.dg-swap-sell,
  .mantine-Button-root.dg-swap-buy {
    height: 46px;
    margin-top: 20px;
  }

  .enable-quick-trading-btns {
    margin-top: 20px;
    .mantine-Button-root {
      margin: 0;
    }
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
`;
