import React from 'react';
import styled from 'styled-components';

export default function IconMNotification({
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
      className={`${className} dg-icon icon-notification`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <g
          id="icon-notification"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g id="icon-notification-on" transform="translate(1, 1)">
            <rect
              id="矩形"
              fill="#B7BDC6"
              x="0"
              y="13"
              width="18"
              height="2"
              rx="1"
            ></rect>
            <path
              d="M11.9999999,13.9990748 C12,14.8284271 11.6642136,15.5784271 11.1213203,16.1213203 C10.5784271,16.6642136 9.82842712,17 9,17 C8.17157288,17 7.42157288,16.6642136 6.87867966,16.1213203 C6.33578644,15.5784271 6,14.8284271 6,14 Z"
              id="椭圆形-2"
              stroke="#B7BDC6"
              strokeWidth="2"
            ></path>
            <path
              d="M9.01795447,1 C10.9261651,1 12.2988278,1.57982494 13.2390847,2.42551705 C14.5235933,3.5808384 15,5.1947898 15,6.27983819 L15,14 L3.03151535,14 C3.0140717,12.5836249 3.00386538,11.3348008 3.00090917,10.2550115 L3.00090427,9.01240446 C3.00449361,7.86577715 3.01867626,6.96780775 3.04380168,6.31850529 C3.04454954,5.19455953 3.51818385,3.57989916 4.80132493,2.4243778 C5.73982923,1.57921605 7.11074015,1 9.01795447,1 Z"
              id="路径-5"
              stroke="#B7BDC6"
              strokeWidth="2"
            ></path>
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
