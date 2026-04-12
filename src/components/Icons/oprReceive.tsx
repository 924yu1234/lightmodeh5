import React from 'react';
import styled from 'styled-components';

export default function IconOprReceive({
  className,
  onClick,
  size = 28,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-opr-receive`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size} height={size} viewBox="0 0 28 28" version="1.1">
        <g
          id="icon_deposit"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g fill="#00A0FF" fillRule="nonzero">
            <path
              d="M14,28 C6.3,28 0,21.7 0,14 C0,6.3 6.3,0 14,0 C21.7,0 28,6.3 28,14 C28,14.525 27.65,14.875 27.125,14.875 C26.6,14.875 26.25,14.525 26.25,14 C26.25,7.175 20.825,1.75 14,1.75 C7.175,1.75 1.75,7.175 1.75,14 C1.75,20.825 7.175,26.25 14,26.25 C14.525,26.25 14.875,26.6 14.875,27.125 C14.875,27.65 14.525,28 14,28 Z"
              transform="translate(14.000000, 14.000000) scale(-1, -1) rotate(90.000000) translate(-14.000000, -14.000000) "
            ></path>
            <path d="M18.7594371,15.7668081 L13.0017869,15.7668081 C12.4495022,15.7668081 12.0017869,15.3190929 12.0017869,14.7668081 L12.0017869,9.00759437 C12.0017869,8.47480057 12.4337016,8.04288586 12.9664954,8.04288586 C13.4992892,8.04288586 13.9312039,8.47480057 13.9312039,9.00759437 L13.9312039,12.834264 C13.9312039,13.3865488 14.3789192,13.834264 14.9312039,13.834264 L18.7594371,13.834264 C19.2930944,13.834264 19.7257092,14.2668788 19.7257092,14.8005361 C19.7257092,15.3341934 19.2930944,15.7668081 18.7594371,15.7668081 Z"></path>
            <path d="M13.2990384,13.1032354 L22.855727,3.54654679 C23.233078,3.1691958 23.8448849,3.1691958 24.2222359,3.54654679 C24.5995863,3.92389725 24.5995863,4.53570321 24.2222359,4.91305366 C24.2222355,4.91305399 24.2222352,4.91305431 24.2222349,4.91305464 L14.6655482,14.469714 C14.2881996,14.8470615 13.6763987,14.8470646 13.2990462,14.4697208 C12.9216996,14.0923828 12.9216926,13.4805899 13.2990306,13.1032432 C13.2990332,13.1032406 13.2990358,13.103238 13.2990384,13.1032354 Z"></path>
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
