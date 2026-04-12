import { useCallback } from 'react';

import { useIntl } from 'js/locals';

export function useTimeLeftM(timeLeft) {
  const intl = useIntl();
  if (timeLeft <= 0) {
    return intl['trade.period_expired'];
  }
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft - days * (24 * 60 * 60)) / 60 / 60);
  let minutes = Math.floor(
    (timeLeft - days * (24 * 60 * 60) - hours * 60 * 60) / 60
  );
  if (timeLeft < 60) {
    minutes = 1;
  }
  if (days > 0) {
    if (hours === 0) {
      return intl['trade.peroid_D_day'].replace('D', days);
    }
    return intl['trade.peroid_D_day_H_hour']
      .replace('D', days)
      .replace('H', hours);
  }
  if (hours === 0) {
    return intl['trade.peroid_M_minute'].replace('M', minutes);
  }
  return intl['trade.peroid_H_hour_M_minute']
    .replace('H', hours)
    .replace('M', minutes);
}

// timeLeft: 秒
export function useTimeString() {
  const intl = useIntl();
  return useCallback(
    (timeLeft) => {
      const days = Math.floor(timeLeft / (24 * 60 * 60));
      const hours = Math.floor((timeLeft - days * (24 * 60 * 60)) / 60 / 60);
      const minutes = Math.floor(
        (timeLeft - days * (24 * 60 * 60) - hours * 60 * 60) / 60
      );
      const seconds = Math.floor(
        timeLeft - days * (24 * 60 * 60) - hours * 60 * 60 - minutes * 60
      );

      if (timeLeft < 60) {
        return intl.time_S_second.replace('S', timeLeft < 0 ? 0 : timeLeft);
      }

      if (timeLeft < 3600) {
        return intl.time_M_minute_S_second
          .replace('M', minutes)
          .replace('S', timePadStart(seconds));
      }
      if (timeLeft < 86400) {
        return intl.time_H_hour_M_minute
          .replace('M', timePadStart(minutes))
          .replace('H', hours);
      }
      if (hours === 0) {
        return intl.time_D_day.replace('D', days);
      }
      return intl.time_D_day_H_hour
        .replace('D', days)
        .replace('H', timePadStart(hours));
    },
    [intl]
  );
}

function timePadStart(time) {
  return time.toString().padStart(2, '0');
}

// < 1小时：用m表示分钟，从1到59m
// >=1 小时 并且 <1年(365天)：用d和h表示，从1d到364d 23h
// >=1年(365天)：用y, mo,d表示，mo表示month，用30.4来计算。比如 1y 11mo 28d
// 以上计算最后一个单位的数值都四舍五入
export function usePoolCreatedString() {
  const intl = useIntl();
  return useCallback(
    (timeStamp) => {
      const now = new Date().valueOf();
      const seconds = Math.ceil(now / 1000 - timeStamp);

      // 小于1月：显示天
      if (seconds < 86400 * 30) {
        const days = Math.round(seconds / 86400);
        return intl.time_D_d.replace('D', days);
      }

      // 小于1年：显示月
      if (seconds < 31536000) {
        const months = Math.round(seconds / 86400 / 30);
        return intl.time_M_mo.replace('M', months);
      }

      // 大于等于1年：显示年、月
      const years = Math.floor(seconds / 31536000);
      const remainingSeconds = seconds % 31536000;
      const months = Math.round(remainingSeconds / (30 * 86400));

      let result = intl.time_Y_y.replace('Y', years);
      if (months > 0) {
        result += ` ${intl.time_M_mo.replace('M', months)}`;
      }
      return result;
    },
    [intl]
  );
}
