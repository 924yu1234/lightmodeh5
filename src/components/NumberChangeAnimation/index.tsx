// NumberDisplay.tsx
import React, { useEffect, useState } from 'react';
import { usePrevious, useThrottle } from 'ahooks';
import styled, { css, keyframes } from 'styled-components';

import { isNumber } from 'src/utils/digit';

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const NumberContainer = styled.div<{ shouldAnimate: boolean }>`
  opacity: 1;
  ${(props) =>
    props.shouldAnimate &&
    css`
      animation: ${fadeIn} 0.6s forwards;
    `}
`;

interface NumberDisplayProps {
  value: number | string;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  const pre = usePrevious(value);
  const throttleValue = useThrottle(value, { wait: 500 });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isNumber(pre)) return () => {};
    setShouldAnimate(true);
    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [pre, throttleValue]);

  return (
    <NumberContainer className="number-ani" shouldAnimate={shouldAnimate}>
      {throttleValue}
    </NumberContainer>
  );
};

export default NumberDisplay;
