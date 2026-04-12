import React from 'react';
import styled from 'styled-components';

export default function IconStrategies({
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
      className={`${className} dg-icon icon-strategies`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        version="1.1"
      >
        <title>icon strategies black</title>
        <g
          id="icon-strategies-black"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="编组" transform="translate(2, 2)" fill="#000000">
            <circle id="椭圆形" cx="5" cy="3" r="1"></circle>
            <rect id="矩形" x="0" y="4" width="2" height="5" rx="1"></rect>
            <rect id="矩形" x="8" y="0" width="2" height="9" rx="1"></rect>
            <rect id="矩形" x="4" y="5" width="2" height="4" rx="1"></rect>
          </g>
        </g>
      </svg>
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
  color: ${({ theme }) => theme.t_b7b};
`;
