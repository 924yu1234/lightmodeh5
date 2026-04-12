import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  onLongPress: (accelerationLevel: number) => void;
  onClick?: () => void;
  threshold?: number; // 长按触发时间 (ms)
  accelerationInterval?: number; // 加速间隔 (ms)
  maxAcceleration?: number; // 最大加速级别
}

export function useLongPress({
  onLongPress,
  onClick,
  threshold = 300,
  accelerationInterval = 100,
  maxAcceleration = 5,
}: UseLongPressOptions) {
  const isLongPress = useRef(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const accelerationTimer = useRef<NodeJS.Timeout | null>(null);
  const accelerationLevel = useRef(1);

  const clearTimers = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (accelerationTimer.current) {
      clearInterval(accelerationTimer.current);
      accelerationTimer.current = null;
    }
  }, []);

  const startAcceleration = useCallback(() => {
    accelerationLevel.current = 1;

    // 立即执行一次
    onLongPress(accelerationLevel.current);

    // 设置重复执行的定时器
    accelerationTimer.current = setInterval(() => {
      onLongPress(accelerationLevel.current);

      // 增加加速级别，但不超过最大值
      if (accelerationLevel.current < maxAcceleration) {
        accelerationLevel.current += 1;
      }
    }, accelerationInterval);
  }, [onLongPress, accelerationInterval, maxAcceleration]);

  const onMouseDown = useCallback(() => {
    isLongPress.current = false;

    // 设置长按检测定时器
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      startAcceleration();
    }, threshold);
  }, [threshold, startAcceleration]);

  const onMouseUp = useCallback(() => {
    clearTimers();

    // 如果不是长按，执行单击事件
    if (!isLongPress.current && onClick) {
      onClick();
    }

    // 重置状态
    isLongPress.current = false;
    accelerationLevel.current = 1;
  }, [clearTimers, onClick]);

  const onMouseLeave = useCallback(() => {
    clearTimers();
    isLongPress.current = false;
    accelerationLevel.current = 1;
  }, [clearTimers]);

  // 触摸事件支持
  const onTouchStart = useCallback(() => {
    onMouseDown();
  }, [onMouseDown]);

  const onTouchEnd = useCallback(() => {
    onMouseUp();
  }, [onMouseUp]);

  return {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  };
}
