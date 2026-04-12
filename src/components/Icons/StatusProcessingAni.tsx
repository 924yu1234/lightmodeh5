import React from 'react';
import data from 'imgs/statusProcessing.json';
import Lottie from 'lottie-react';
import styled from 'styled-components';

export default function IconStatusProcessingAni({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-status-processing-ani`}
      onClick={onClick}
      {...rest}
      style={{ width: size || 50, height: size || 50 }}
    >
      <Lottie
        animationData={data}
        loop
        width={size || 50}
        height={size || 50}
      />
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  display: inline-block;
`;
