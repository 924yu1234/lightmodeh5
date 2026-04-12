import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTimeStr } from 'src/hooks/useWithdrawTime';
import { useIntl } from 'src/locals';
import { useToggleWalletTradeBtn } from 'src/state/application/hooks';
import { useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';

export default function SwapArrivalTime() {
  const intl = useIntl();
  const { tryResp } = useSwapTradeInfo();
  const estimateArrivalTime = Number(tryResp?.estimate_time);
  const getTimeStr = useTimeStr();
  const withdrawalMinutes = Math.ceil(estimateArrivalTime / 60);
  let withdrawTimeStr = '';
  let withdrawTimeTips = '';
  if (withdrawalMinutes < 30) {
    withdrawTimeStr = getTimeStr('m', withdrawalMinutes);
    withdrawTimeTips = intl.around + withdrawTimeStr;
  } else {
    withdrawTimeStr = intl.time_M_minutes?.replace('M', 30);
    withdrawTimeTips = `> ${withdrawTimeStr}`;
  }
  const toogleWalletTrade = useToggleWalletTradeBtn();

  const show =
    isNumber(estimateArrivalTime) &&
    estimateArrivalTime > 0 &&
    tryResp?.need_rebalance;

  useEffect(() => {
    toogleWalletTrade(true);
    const timer = setTimeout(() => {
      toogleWalletTrade(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [toogleWalletTrade, show]);

  if (!show) return null;

  return (
    <StyledSwapArrivalTime className="arrival-time">
      <div className="arrival-time-title">{intl.arrival_time}</div>
      <div className="arrival-time-value">{withdrawTimeTips}</div>
    </StyledSwapArrivalTime>
  );
}

export const StyledSwapArrivalTime = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  .arrival-time-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
  .arrival-time-value {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
`;
