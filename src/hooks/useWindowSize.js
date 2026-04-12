import { useMemo } from 'react';
import { useViewportSize } from '@mantine/hooks';
function getWindowSize() {
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return {
    width,
    height,
  };
}

export default function useWindowSize() {
  const { height, width } = useViewportSize();
  return useMemo(() => {
    if (!height || !width) {
      return getWindowSize();
    }
    return { width, height };
  }, [height, width]);
}
