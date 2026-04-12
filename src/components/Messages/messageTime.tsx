import React, { useMemo } from 'react';
import dayjs from 'dayjs';

export default function MessageTime({ time }: { time: number }) {
  const date = useMemo(() => {
    const today = dayjs().format('MM-DD');
    const dayStr = dayjs(time).format('MM-DD');
    if (today !== dayStr) return dayStr;
    return dayjs(time).format('HH:mm');
  }, [time]);
  return <span>{date}</span>;
}
