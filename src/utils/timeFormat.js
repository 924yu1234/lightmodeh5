import { useMemo } from 'react';

import { useThemeParams } from 'src/theme';

// const year = new Date().getFullYear();

export function useYearForamt(timeStr) {
  const { isMobile } = useThemeParams();
  return useMemo(() => {
    return yearFormat(timeStr, isMobile);
  }, [timeStr, isMobile]);
}

export function yearFormat(timeStr) {
  return timeStr;
  // if (!window.isMobile || typeof timeStr !== 'string') return timeStr;
  // return timeStr?.replace(`${year}-`, '');
}

// XX days XX hours
export function formatTimeDDHH(time, intl) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let daysStr = intl.time_D_days.replace('D', days);
  if (days === 1) {
    daysStr = intl.time_1_day;
  } else if (days === 0) {
    daysStr = '';
  }
  let hoursStr = intl.time_H_hours.replace('H', hours);
  if (hours === 1) {
    hoursStr = intl.time_1_hour;
  } else if (hours === 0) {
    hoursStr = '';
  }
  return `${daysStr} ${hoursStr}`;
}

export function formatTimeDDHHMM(time, intl) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let daysStr = intl.time_D_day.replace('D', days);
  if (days === 0) {
    daysStr = '';
  }
  let hoursStr = intl.time_H_h.replace('H', hours);
  if (hours === 0) {
    hoursStr = '';
  }
  let minutesStr = intl.time_M_m.replace('M', minutes);
  if (minutes === 0) {
    minutesStr = '';
  }
  return `${daysStr} ${hoursStr} ${minutesStr}`;
}

export function formatHHmmss(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
