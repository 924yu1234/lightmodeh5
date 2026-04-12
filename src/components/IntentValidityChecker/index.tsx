import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { IntentTryItemResp } from 'src/constants/interface';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconTime from '../Icons/time';

export default function IntentValidityChecker({
  tryResp,
  updateExpired,
}: {
  tryResp: IntentTryItemResp;
  updateExpired: (expired: boolean) => void;
}) {
  const hasSolana = useMemo(() => {
    if (!tryResp) return false;
    const { add_on, action } = tryResp as any;
    return (
      action?.chain === 'SOLANA' ||
      add_on?.some((item: any) => item?.chain === 'SOLANA')
    );
  }, [tryResp]);
  useRefresh(hasSolana ? 1000 : 0);
  const intl = useIntl();
  const now = Date.now() / 1000;
  const created_at = tryResp?.result?.created_at || now;
  const leftSeconds = Math.ceil(created_at + 30 - now);

  useEffect(() => {
    if (!hasSolana) {
      updateExpired(false);
      return;
    }
    updateExpired(leftSeconds <= 0);
  }, [leftSeconds, updateExpired, hasSolana]);

  if (!tryResp || !created_at || !hasSolana) return null;

  if (leftSeconds >= 30) return null;
  if (leftSeconds <= 0) {
    return (
      <StyledIntentCountdown className="intent-countdown">
        <div className="intent-countdown-inner">
          {intl.confirmation_expired}
        </div>
      </StyledIntentCountdown>
    );
  }
  if (leftSeconds <= 10) {
    return (
      <StyledIntentCountdown className="intent-countdown">
        <div className="intent-countdown-inner">
          {intl.please_confirm_within_10_seconds}
          <IconTime />
          {leftSeconds}
        </div>
      </StyledIntentCountdown>
    );
  }
  return null;
}

const StyledIntentCountdown = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.bg_black};
  .intent-countdown-inner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    background: ${(props) => props.theme.bg_yellow_30};
    border-radius: 20px 20px 0px 0px;
    padding: 10px 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.yellow};
    font-size: 13px;
    line-height: 20px;
    .icon-time {
      margin-left: auto;
    }
  }
`;
