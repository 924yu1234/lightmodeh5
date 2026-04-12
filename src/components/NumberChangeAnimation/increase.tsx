import React, { useEffect, useRef, useState } from 'react';

interface NumberIncreaseAnimationProps {
  value: number;
  duration?: number; // 动画时长，默认2000ms
  format?: (val: number) => string; // 可选格式化函数
  step?: number; // 步长，默认1
}

const NumberIncreaseAnimation: React.FC<NumberIncreaseAnimationProps> = ({
  value,
  duration = 1000,
  format,
  step = 1,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startValueRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  const _value = Number(value);

  useEffect(() => {
    if (_value === startValueRef.current) return () => {};
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - (startTimeRef.current || 0);
      const progress = Math.min(elapsed / duration, 1);
      let _step = (_value - startValueRef.current) * progress;
      _step = Math.ceil(_step / step) * step;
      const current = Math.min(startValueRef.current + _step, _value);
      setDisplayValue(current);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(_value);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_value, duration]);

  return <span>{format ? format(displayValue) : displayValue}</span>;
};

export default NumberIncreaseAnimation;
