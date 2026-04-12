import { useCallback } from 'react';

import { useIntl } from 'js/locals';

export function useTimeStr() {
  const intl = useIntl();
  return useCallback(
    (type, num) => {
      // type : m h d
      if (type === 'm') {
        return num === 1
          ? intl.time_1_minute
          : intl.time_M_minutes.replace('M', num);
      }
      if (type === 'h') {
        return num === 1
          ? intl.time_1_hour
          : intl.time_H_hours.replace('H', num);
      }
      if (type === 'd') {
        return num === 1 ? intl.time_1_day : intl.time_D_days.replace('D', num);
      }
      return '';
    },
    [intl]
  );
}
