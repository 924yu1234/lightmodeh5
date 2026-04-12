import React from 'react';
import styled from 'styled-components';

export default function IconCalendar({
  className,
  onClick,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-calcendar`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 16 16"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="iconcanledar"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="搜索" transform="translate(1.000000, 1.000000)">
            <rect
              id="矩形"
              fillOpacity="0"
              fill="#FFFFFF"
              x="0"
              y="0"
              width="14"
              height="14"
            ></rect>
            <g
              id="icon-calendar"
              opacity="0.6"
              transform="translate(0.200000, 0.200000)"
              fill="#B7BDC6"
            >
              <path
                d="M11,1 C12.6568542,1 14,2.34314575 14,4 L14,10 C14,11.6568542 12.6568542,13 11,13 L3,13 C1.34314575,13 2.02906125e-16,11.6568542 0,10 L0,4 C-2.02906125e-16,2.34314575 1.34314575,1 3,1 L11,1 Z M11,2 L3,2 C1.8954305,2 1,2.8954305 1,4 L1,4 L1,10 C1,11.1045695 1.8954305,12 3,12 L3,12 L11,12 C12.1045695,12 13,11.1045695 13,10 L13,10 L13,4 C13,2.8954305 12.1045695,2 11,2 L11,2 Z"
                id="矩形-2"
              ></path>
              <rect id="矩形" x="1" y="6" width="12" height="1"></rect>
              <rect id="矩形" x="4" y="0" width="1" height="4" rx="0.5"></rect>
              <rect id="矩形" x="9" y="0" width="1" height="4" rx="0.5"></rect>
            </g>
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
  pointer-events: none;
  color: ${({ theme }) => theme.t_b7b};
`;
