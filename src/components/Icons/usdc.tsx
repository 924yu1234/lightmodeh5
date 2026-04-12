import React from 'react';
import styled from 'styled-components';

import usdc from 'src/imgs/chainToken/USDC.png';

export default function IconUSDC({
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
      className={`${className} dg-icon icon-usdc`}
      onClick={onClick}
      {...rest}
    >
      <img src={usdc} alt="usdc" width={size || 20} height={size || 20} />
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
`;
