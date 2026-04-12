import React, { useEffect, useMemo, useState } from 'react';
import { usePrevious } from '@mantine/hooks';
import styled from 'styled-components';

import { isNumber } from 'src/utils/digit';
import { maxEffectiveNumber } from 'src/utils/numberUtils';

export default function NumberChangeAnimation({
  value,
}: {
  value: number | string;
}) {
  const preNumber = usePrevious(value);
  const [pre, setPre] = useState<number | string>(0);
  const [showValue, setShowValue] = useState<number | string>(0);
  useEffect(() => {
    if (preNumber !== undefined) {
      setPre(Number(preNumber));
    }
    // value 变化时存储上一个值
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isNumber(pre) && isNumber(value)) {
      setShowValue(Number(value));
    }
  }, [value, pre]);

  const step = useMemo(() => {
    if (!isNumber(pre) || !isNumber(value)) {
      return 0;
    }
    return Math.max(
      Math.abs(Number(pre) - Number(value)) * 0.2,
      Math.abs(Number(showValue) - Number(value)) * 0.2
    );
  }, [pre, value, showValue]);

  useEffect(() => {
    if (showValue === value || !isNumber(value)) return () => {};
    const timer = setTimeout(() => {
      setShowValue((pre) => {
        const cur = Number(pre);
        const to = Number(value);
        let newValue;
        if (cur > to) {
          newValue = cur - step;
          if (newValue <= to) {
            newValue = value;
          }
        } else {
          newValue = cur + step;
          if (newValue >= to) {
            newValue = value;
          }
        }
        return maxEffectiveNumber(newValue, 3);
      });
    }, 40);

    return () => {
      clearTimeout(timer);
    };
  }, [showValue, value, step]);

  if (!isNumber(value)) {
    return <StyledNumber className="number-ani">{value}</StyledNumber>;
  }

  return <StyledNumber className="number-ani">{showValue}</StyledNumber>;
}

const StyledNumber = styled.div``;
