import { useEffect, useRef, useState } from 'react';
export const RefreshPeriod = 12000; // eth block time

export default function useRefreshTime() {
  const [time, setTime] = useState(0);
  const timeRef = useRef();
  useEffect(() => {
    if (timeRef?.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      const cur = Date.now();
      // refresh every 12 seconds
      setTime(cur - (cur % RefreshPeriod));
    }, RefreshPeriod);
  }, [time]);

  return time;
}
