import React from 'react';
import styled from 'styled-components';

export default function IconActionStop({
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
      className={`${className} dg-icon icon-action-stop`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 50}
        height={size || 50}
        viewBox="0 0 50 50"
        version="1.1"
      >
        <g
          id="popup_stop"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="失败"></g>
          <g id="icon-pause" fillRule="nonzero">
            <path
              d="M25,0 C11.192906,0 0,11.192906 0,25 C0,38.8072056 11.192906,50 25,50 C38.8072056,50 50,38.8072056 50,25 C50,11.1928502 38.8072056,0 25,0 Z"
              id="路径"
              fill="#DE4D77"
            ></path>
            <rect
              id="矩形"
              fill="#FFFFFF"
              x="15"
              y="15"
              width="20"
              height="20"
              rx="1"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  color: ${({ theme }) => theme.buy};
`;
