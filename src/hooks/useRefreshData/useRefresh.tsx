import { useEffect, useState } from 'react';

export default function useRefresh(time: number) {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (!time) return () => {};
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [index, time]);

  return index;
}
