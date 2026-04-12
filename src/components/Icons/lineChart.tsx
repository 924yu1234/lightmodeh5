import React from 'react';
import styled from 'styled-components';

export default function IconLineChart({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-line-chart`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 12}
        height={size || 12}
        viewBox="0 0 12 12"
        version="1.1"
      >
        <title>APY backtest</title>
        <g
          id="APY-backtest"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(0, 1)">
            <path
              d="M3,7 L5.01061894,4.88977103 L7.40887932,5.84703939 C9.1469543,4.06858868 10.4207501,2.78624222 11.2302668,2"
              id="路径-4"
              stroke="#00A0FF"
              strokeLinecap="round"
            ></path>
            <rect
              id="矩形"
              fill="#00A0FF"
              x="0"
              y="0"
              width="1"
              height="11"
              rx="0.5"
            ></rect>
            <rect
              id="矩形"
              fill="#00A0FF"
              transform="translate(6, 10.5) rotate(90) translate(-6, -10.5)"
              x="5.5"
              y="4.5"
              width="1"
              height="12"
              rx="0.5"
            ></rect>
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

  color: ${({ theme }) => theme.blue};
`;
