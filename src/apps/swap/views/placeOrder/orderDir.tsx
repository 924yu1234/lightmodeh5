import React, { useCallback } from 'react';
import styled from 'styled-components';

import { SegmentedControl } from 'src/UI';

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
  const setFromSegment = useCallback(
    (v: string) => {
      if (v === 'buy') changeOrder(OrderDirs.BUY);
      if (v === 'sell') changeOrder(OrderDirs.SELL);
    },
    [changeOrder]
  );

  const segmentValue = orderDir === OrderDirs.BUY ? 'buy' : 'sell';

  return (
    <StyledOrderDir className="order-dir">
      <SegmentedControl
        className="swap-order-dir-segment"
        appearance="swap"
        swapVisual={segmentValue === 'buy' ? 'buy' : 'sell'}
        value={segmentValue}
        onChange={(v) => {
          if (v === 'buy' || v === 'sell') setFromSegment(v);
        }}
        data={[
          { value: 'buy', label: intl['trade.tab_buy'] },
          { value: 'sell', label: intl['trade.tab_sell'] },
        ]}
      />
      <SwapSettingsEntrance />
    </StyledOrderDir>
  );
}

OrderDir.propTypes = {};

export const StyledOrderDir = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 14px 0;
  gap: 10px;

  .swap-order-dir-segment.mantine-SegmentedControl-root {
    flex: 0 1 50%;
    width: 50%;
    max-width: 50%;
    min-width: 0;

    .mantine-SegmentedControl-label {
      font-size: 14px;
      letter-spacing: 0.01em;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    }
  }
`;
