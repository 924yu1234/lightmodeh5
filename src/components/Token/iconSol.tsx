import React from 'react';
import styled from 'styled-components';

import { TOKEN_SOL_ICON } from 'src/da';

export default function TokenSol({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const showIcon = TOKEN_SOL_ICON;

  return (
    <StyledTokenIcon
      className={`token-icon ${className}`}
      size={size}
      key={showIcon}
    >
      <img src={showIcon} alt="logo" className="token-icon-img" />
    </StyledTokenIcon>
  );
}

export const StyledTokenIcon = styled.div<{ size: number }>`
  position: relative;
  width: ${(props: any) => props.size + props.size / 12}px;
  height: ${(props: any) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  .token-icon-img {
    width: ${(props: any) => props.size}px;
    height: ${(props: any) => props.size}px;
    border-radius: 50%;
  }
`;
