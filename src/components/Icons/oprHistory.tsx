import React from 'react';
import styled from 'styled-components';

export default function IconOprHistory({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-opr-history`}
      onClick={onClick}
      {...rest}
    >
      <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
        <g
          id="icon_history"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g fill="#00A0FF">
            <path
              d="M14,28 C6.3,28 0,21.7 0,14 C0,6.3 6.3,0 14,0 C21.7,0 28,6.3 28,14 C28,14.525 27.65,14.875 27.125,14.875 C26.6,14.875 26.25,14.525 26.25,14 C26.25,7.175 20.825,1.75 14,1.75 C7.175,1.75 1.75,7.175 1.75,14 C1.75,20.825 7.175,26.25 14,26.25 C14.525,26.25 14.875,26.6 14.875,27.125 C14.875,27.65 14.525,28 14,28 Z"
              fillRule="nonzero"
              transform="translate(14.000000, 14.000000) scale(-1, 1) rotate(90.000000) translate(-14.000000, -14.000000) "
            ></path>
            <path
              d="M19.7594371,15.7668081 L14.0017869,15.7668081 C13.4495022,15.7668081 13.0017869,15.3190929 13.0017869,14.7668081 L13.0017869,9.00759437 C13.0017869,8.47480057 13.4337016,8.04288586 13.9664954,8.04288586 C14.4992892,8.04288586 14.9312039,8.47480057 14.9312039,9.00759437 L14.9312039,12.834264 C14.9312039,13.3865488 15.3789192,13.834264 15.9312039,13.834264 L19.7594371,13.834264 C20.2930944,13.834264 20.7257092,14.2668788 20.7257092,14.8005361 C20.7257092,15.3341934 20.2930944,15.7668081 19.7594371,15.7668081 Z"
              fillRule="nonzero"
            ></path>
            <rect
              stroke="#00A0FF"
              x="13.5"
              y="18.5"
              width="11"
              height="1"
              rx="0.5"
            ></rect>
            <rect
              stroke="#00A0FF"
              x="13.5"
              y="22.5"
              width="11"
              height="1"
              rx="0.5"
            ></rect>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
`;
