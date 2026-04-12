import { RefObject, useEffect, useRef } from 'react';

export function useScrollForwardToParent(
  scrollRef: RefObject<HTMLElement>,
  parentId: string
) {
  const lastTouchYRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return () => {};

    // 外层滚动容器
    const parent = document.getElementById(parentId);
    if (!parent) return () => {};

    const canScrollDown = () =>
      el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    const canScrollUp = () => el.scrollTop > 0;

    const forwardToParentIfNeeded = (deltaY: number) => {
      if (!deltaY) return false;
      // deltaY > 0: 向下滚（手指上划 / 滚轮下滚）
      if (deltaY > 0 && !canScrollDown()) {
        parent.scrollTop += deltaY;
        return true;
      }
      // deltaY < 0: 向上滚（手指下划 / 滚轮上滚）
      if (deltaY < 0 && !canScrollUp()) {
        parent.scrollTop += deltaY;
        return true;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      // 当内部滚动已到边界时，把滚动“移交”给外层容器
      if (forwardToParentIfNeeded(e.deltaY)) {
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const lastY = lastTouchYRef.current;
      lastTouchYRef.current = y;
      if (lastY == null) return;

      // 手指上划 => 页面/内容向下滚 => deltaY 为正
      const deltaY = lastY - y;
      if (forwardToParentIfNeeded(deltaY)) {
        // iOS/部分 WebView：只有在边界时阻止默认滚动，避免“卡住/回弹”
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      lastTouchYRef.current = null;
    };

    // wheel 必须 passive:false 才能 preventDefault
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel as any);
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchend', onTouchEnd as any);
      el.removeEventListener('touchcancel', onTouchEnd as any);
    };
  }, [scrollRef, parentId]);
}
