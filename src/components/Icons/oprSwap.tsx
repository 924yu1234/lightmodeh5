import React from 'react';
import styled from 'styled-components';

export default function IconOprSwap({
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
      className={`${className} dg-icon icon-opr-swap`}
      onClick={onClick}
      {...rest}
    >
      <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icon_swap" fill="#00A0FF" fillRule="nonzero">
            <g id="Swap">
              <path d="M7,28 C3.13400676,28 0,24.8659932 0,21 C0,17.1340068 3.13400676,14 7,14 C10.8659933,14 14,17.1340068 14,21 C14,24.8659932 10.8659933,28 7,28 M21,14 C18.499141,14 16.1882518,12.6658076 14.9378222,10.5 C13.6873926,8.33419248 13.6873926,5.66580752 14.9378222,3.5 C16.1882518,1.33419242 18.499141,0 21,0 C24.8659934,0 28,3.13400675 28,7 C28,10.8659932 24.8659934,14 21,14 M0,5 C0,2.23857625 2.23857626,0 5,0 L11,0 C11.5522847,-1.01453063e-16 12,0.44771525 12,1 C12,1.55228475 11.5522847,2 11,2 L5,2 L5,2 C3.34314576,2 2,3.34314575 2,5 L2,11 C2,11.5522847 1.55228475,12 1,12 C0.44771525,12 6.76353751e-17,11.5522847 0,11 L0,5 L0,5 Z M27,16 C26.4477153,16 26,16.4477153 26,17 L26,23 L26,23 C26,24.6568542 24.6568543,26 23,26 L17,26 C16.4477153,26 16,26.4477153 16,27 C16,27.5522847 16.4477153,28 17,28 L23,28 L23,28 C25.7614238,28 28,25.7614237 28,23 L28,17 C28,16.4477153 27.5522847,16 27,16 Z"></path>
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
  vertical-align: -0.125em;
`;
