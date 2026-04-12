import React from 'react';
import styled from 'styled-components';

export default function IconOprSend({
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
      className={`${className} dg-icon icon-opr-send`}
      onClick={onClick}
      {...rest}
    >
      <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
        <g
          id="icon_withdrawal"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            transform="translate(-0.000000, 0.000000)"
            fill="#00A0FF"
            fillRule="nonzero"
          >
            <path
              d="M14,28 C6.3,28 0,21.7 0,14 C0,6.3 6.3,0 14,0 C21.7,0 28,6.3 28,14 C28,14.525 27.65,14.875 27.125,14.875 C26.6,14.875 26.25,14.525 26.25,14 C26.25,7.175 20.825,1.75 14,1.75 C7.175,1.75 1.75,7.175 1.75,14 C1.75,20.825 7.175,26.25 14,26.25 C14.525,26.25 14.875,26.6 14.875,27.125 C14.875,27.65 14.525,28 14,28 Z"
              transform="translate(14.000000, 14.000000) scale(-1, -1) rotate(90.000000) translate(-14.000000, -14.000000) "
            ></path>
            <path
              d="M24.3594371,10.1668081 L18.6017869,10.1668081 C18.0495022,10.1668081 17.6017869,9.71909288 17.6017869,9.16680813 L17.6017869,3.40759437 C17.6017869,2.87480057 18.0337016,2.44288586 18.5664954,2.44288586 C19.0992892,2.44288586 19.5312039,2.87480057 19.5312039,3.40759437 L19.5312039,7.23426402 C19.5312039,7.78654877 19.9789192,8.23426402 20.5312039,8.23426402 L24.3594371,8.23426402 C24.8930944,8.23426402 25.3257092,8.66687875 25.3257092,9.20053607 C25.3257092,9.73419339 24.8930944,10.1668081 24.3594371,10.1668081 Z"
              transform="translate(21.463748, 6.304847) scale(-1, -1) translate(-21.463748, -6.304847) "
            ></path>
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
