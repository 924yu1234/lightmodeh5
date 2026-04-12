import React from 'react';
import styled from 'styled-components';

export default function IconDisconnect({
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
      className={`${className} dg-icon icon-disconnect`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <title>icon disconnect</title>
        <g
          id="icon-disconnect"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon断开" transform="translate(1, 2.5195)" fill="#B7BDC6">
            <path
              d="M8.7,1.48046875 L8.243,2.78746875 L2.4,2.78803711 C1.88716416,2.78803711 1.46449284,3.1740773 1.40672773,3.67141598 L1.4,3.78803711 L1.4,10.9880371 C1.4,11.5403219 1.84771525,11.9880371 2.4,11.9880371 L5.028,11.9874687 L4.507,13.4804688 L2,13.4804688 C0.8954305,13.4804688 1.3527075e-16,12.5850382 0,11.4804688 L0,3.48046875 C-1.3527075e-16,2.37589925 0.8954305,1.48046875 2,1.48046875 L8.7,1.48046875 Z M16,1.48046875 C17.1045695,1.48046875 18,2.37589925 18,3.48046875 L18,11.4804688 C18,12.5850382 17.1045695,13.4804688 16,13.4804688 L10.583,13.4804688 L11.104,11.9874687 L15.6,11.9880371 C16.1128358,11.9880371 16.5355072,11.6019969 16.5932723,11.1046582 L16.6,10.9880371 L16.6,3.78803711 C16.6,3.23575236 16.1522847,2.78803711 15.6,2.78803711 L14.319,2.78746875 L14.775,1.48046875 L16,1.48046875 Z"
              id="矩形-2"
            ></path>
            <polygon
              id="矩形"
              points="11.2060547 4.12789586e-15 13 0.0673828125 7.82 15.0036621 6.14550781 15.0036621"
            ></polygon>
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
`;
