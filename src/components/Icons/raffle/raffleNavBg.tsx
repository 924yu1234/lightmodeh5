import React from 'react';
import styled from 'styled-components';

export default function IconRaffleNavBg({
  className,
  onClick,
  active,
  ...rest
}: {
  className?: string;
  size?: number;
  active?: boolean;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-raffle-nav-bg`}
      onClick={onClick}
      {...rest}
    >
      <svg width="200px" height="90px" viewBox="0 0 200 90" version="1.1">
        <title>lottery left nav off</title>
        <defs>
          <radialGradient
            cx="52.8493924%"
            cy="122.560764%"
            fx="52.8493924%"
            fy="122.560764%"
            r="66.7491319%"
            gradientTransform="translate(0.5285, 1.2256), scale(0.45, 1), rotate(90), scale(1, 1.4951), translate(-0.5285, -1.2256)"
            id="radialGradient-1"
          >
            <stop stopColor="#FFF21A" offset="0%"></stop>
            <stop stopColor="#FFF21A" stopOpacity="0" offset="100%"></stop>
          </radialGradient>
        </defs>
        <g
          id="lottery-left-nav-off"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <rect
            id="矩形"
            strokeOpacity={active ? '1' : '0.2'}
            stroke="#FE932F"
            strokeWidth="2"
            fill="#000000"
            x="1"
            y="1"
            width="198"
            height="88"
            rx="20"
          ></rect>
          <rect
            id="矩形"
            fill="url(#radialGradient-1)"
            opacity="0.29952567"
            x="0"
            y="0"
            width="200"
            height="90"
            rx="20"
          ></rect>
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
`;
