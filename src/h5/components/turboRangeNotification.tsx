import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Close from 'src/components/Icons/close';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useIntl } from 'src/locals';
import { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { useTurboRangeActivePositions } from 'src/state/turboRange/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';
import { logAPPH5 } from 'src/utils/log';

export default function TurboRangeNotification() {
  const intl = useIntl();
  const [showTips, setShowTips] = useState(false);
  const isAppH5 = useIsAppH5();
  const { callAppPromise } = useWalletOprs();
  const hideAppNotification = useUserFlag('hide_app_notification');
  const changeHideAppNotification = useChangeFlag('hide_app_notification');
  const { positions } = useTurboRangeActivePositions();
  useEffect(() => {
    if (!isAppH5) {
      return;
    }
    callAppPromise('checkPushNotification', {})
      .then((res) => {
        if (res === 0) {
          setShowTips(true);
        }
        if (res === -1 || res === 1) {
          setShowTips(false);
        }
      })
      .catch(() => {
        setShowTips(false);
      });
  }, [isAppH5, callAppPromise]);

  const openPushNotification = useCallback(() => {
    logAPPH5({
      event: 'openPushNotification',
    });
    callAppPromise(
      'openPushNotification',
      intl.we_ll_notify_you_when_your_turbo_range_goes_out_of_range
    )
      .then((res) => {
        if (res) {
          setShowTips(false);
        }
        logAPPH5({
          event: 'openPushNotification',
          message: 'openPushNotification res',
          data: res,
        });
      })
      .catch((err) => {
        logAPPH5({
          event: 'openPushNotification',
          message: 'openPushNotification failed',
          error: err,
        });
      });
  }, [callAppPromise, intl]);

  if (!isAppH5) {
    return null;
  }
  // 本地记录用户关闭操作
  if (hideAppNotification) {
    return null;
  }
  // 没有活跃仓位，不显示
  if (!positions?.length) {
    return null;
  }
  // app已开启通知后不再显示
  if (!showTips) {
    return null;
  }

  return (
    <StyledTips className="turbo-range-notification">
      <div className="notification-inner" onClick={openPushNotification}>
        <div className="notification-title">{intl.enable_notifications}</div>
        <div className="notification-content">
          {intl.receive_notification_when_out_of_price_range}
        </div>
        <IconWrapper
          size={32}
          onClick={() => {
            changeHideAppNotification(true);
            logAPPH5({
              event: 'openPushNotification',
              message: 'close openPushNotification tips',
            });
          }}
        >
          <Close />
        </IconWrapper>
      </div>
    </StyledTips>
  );
}

const StyledTips = styled.div`
  .notification-inner {
    padding: 9px 32px 10px 10px;
    position: relative;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_10};
    border-radius: 5px;
    .notification-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 13px;
      line-height: 18px;
    }
    .notification-content {
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
    }
    .dg-icon-wrapper {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;
