import { useCallback } from 'react';

import { useIntl } from 'src/locals';

// 1d 23h 02m 15s
export function useTimeStr_DdHhMmSs() {
  const intl = useIntl();
  return useCallback(
    (time: number) => {
      const day = Math.floor(time / 86400);
      const hour = Math.floor((time % 86400) / 3600);
      const minute = Math.floor((time % 3600) / 60);
      const second = Math.ceil(time % 60);
      let str = '';

      if (day > 0) {
        str += `${intl.time_D_day.replace('D', day)} `;
      }

      if (hour > 0) {
        str += `${intl.time_H_h.replace('H', hour)} `;
      }

      if (minute > 0) {
        str += `${intl.time_M_m.replace('M', minute)} `;
      }

      if (second > 0) {
        str += intl.time_S_second.replace('S', second);
      }

      return str;
    },
    [intl]
  );
}

export function useTimeStr_DdayHhourMminuteSsecond() {
  const intl = useIntl();
  return useCallback(
    (time: number) => {
      const day = Math.floor(time / 86400);
      const hour = Math.floor((time % 86400) / 3600);
      const minute = Math.floor((time % 3600) / 60);
      const second = Math.ceil(time % 60);
      let str = '';

      if (day > 0) {
        if (day === 1) {
          str += intl.time_1_day;
        } else {
          str += intl.time_D_days.replace('D', day);
        }
      }

      if (hour > 0) {
        if (hour === 1) {
          str += ` ${intl.time_1_hour}`;
        } else {
          str += ` ${intl.time_H_hours.replace('H', hour)}`;
        }
      }

      if (minute > 0) {
        if (minute === 1) {
          str += ` ${intl.time_1_minute}`;
        } else {
          str += ` ${intl.time_M_minutes.replace('M', minute)}`;
        }
      }

      if (second > 0) {
        str += ` ${intl.time_S_second.replace('S', second)}`;
      }

      return str;
    },
    [intl]
  );
}
