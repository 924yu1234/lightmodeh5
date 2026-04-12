import React, { useCallback } from 'react';
import styled from 'styled-components';

import SwapDataWarning from 'src/components/SwapDataWarning';
import SwapSettingsEntrance from 'src/components/SwapSettings/entrance';
import { OrderDirs } from 'src/constants/interface';
import {
  useChangeSwapOrderDir,
  useSwapOrderDir,
} from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function OrderDir() {
  const intl = useIntl();
  const orderDir = useSwapOrderDir();
  const changeOrder = useChangeSwapOrderDir();
  const setSell = useCallback(() => {
    changeOrder(OrderDirs.SELL);
  }, [changeOrder]);
  const setBuy = useCallback(() => {
    changeOrder(OrderDirs.BUY);
  }, [changeOrder]);
  return (
    <StyledOrderDir className="order-dir">
      <div className="order-dir-inner">
        <div
          className={`tab-buy ${orderDir === OrderDirs.BUY ? 'active' : ''}`}
          onClick={setBuy}
        >
          {intl['trade.tab_buy']}
        </div>
        <div
          className={`tab-sell ${orderDir === OrderDirs.SELL ? 'active' : ''}`}
          onClick={setSell}
        >
          {intl['trade.tab_sell']}
        </div>
      </div>
      <SwapDataWarning />
      <SwapSettingsEntrance />
    </StyledOrderDir>
  );
}

OrderDir.propTypes = {};

export const StyledOrderDir = styled.div`
  display: flex;
  align-items: center;

  .order-dir-inner {
    height: 32px;
    width: 170px;
    border-radius: 5px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
    display: flex;
    align-items: center;
    margin-right: auto;
  }

  .tab-buy,
  .tab-sell {
    cursor: pointer;
    height: 100%;
    flex: 1;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    display: flex;
    align-items: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.border_transparent};
  }
  .tab-buy {
    border-radius: 5px 0 0 5px;
    &.active {
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.buy};
      color: ${({ theme }: { theme: ThemeType }) => theme.buy};
    }
  }
  .tab-sell {
    border-radius: 0 5px 5px 0;
    &.active {
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.sell};
      color: ${({ theme }: { theme: ThemeType }) => theme.sell};
    }
  }

  .swap-data-warning {
    border-radius: 15px;
    margin-right: 15px;
  }
`;
