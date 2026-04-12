import React from 'react';
import styled from 'styled-components';

export default function IconInvite({
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
      className={`${className} dg-icon icon-invite`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        version="1.1"
      >
        <title>icon invite</title>
        <defs>
          <linearGradient
            x1="105.125%"
            y1="134.856648%"
            x2="1.46041681%"
            y2="-24.7193894%"
            id="linearGradient-1"
          >
            <stop stopColor="#F2C94C" offset="0%"></stop>
            <stop stopColor="#F2C04C" offset="18.4%"></stop>
            <stop stopColor="#F2994A" offset="100%"></stop>
          </linearGradient>
          <linearGradient
            x1="105.125%"
            y1="71.214162%"
            x2="1.46041681%"
            y2="31.3201527%"
            id="linearGradient-2"
          >
            <stop stopColor="#F2C94C" offset="0%"></stop>
            <stop stopColor="#F2C04C" offset="18.4%"></stop>
            <stop stopColor="#F2994A" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g
          id="icon-invite"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="add-friend-(1)" fillRule="nonzero">
            <path
              d="M20,6 C20,2.6862915 17.3137085,0 14,0 C10.6862915,0 8,2.6862915 8,6 C8,9.3137085 10.6862915,12 14,12 C17.3123376,11.9966926 19.9966926,9.31233757 20,6 Z M10,6 C10,3.790861 11.790861,2 14,2 C16.209139,2 18,3.790861 18,6 C18,8.209139 16.209139,10 14,10 C12.939134,10 11.9217184,9.57857264 11.1715729,8.82842712 C10.4214274,8.07828161 10,7.06086596 10,6 Z"
              id="形状"
              fill="url(#linearGradient-1)"
            ></path>
            <path
              d="M17,14 L11,14 C7.13583434,14.0044086 4.00440864,17.1358343 4,21 L4,23 C4,23.5522847 4.44771525,24 5,24 C5.55228475,24 6,23.5522847 6,23 L6,21 C6.00330612,18.2399468 8.23994685,16.0033061 11,16 L17,16 C19.7600532,16.0033061 21.9966939,18.2399468 22,21 L22,23 C22,23.5522847 22.4477153,24 23,24 C23.5522847,24 24,23.5522847 24,23 L24,21 C23.9955914,17.1358343 20.8641657,14.0044086 17,14 Z"
              id="路径"
              fill="url(#linearGradient-1)"
            ></path>
            <path
              d="M4,7 C3.44771525,7 3,7.44771525 3,8 L3,10 L1,10 C0.44771525,10 0,10.4477153 0,11 C0,11.5522847 0.44771525,12 1,12 L3,12 L3,14 C3,14.5522847 3.44771525,15 4,15 C4.55228475,15 5,14.5522847 5,14 L5,12 L7,12 C7.55228475,12 8,11.5522847 8,11 C8,10.4477153 7.55228475,10 7,10 L5,10 L5,8 C5,7.44771525 4.55228475,7 4,7 Z"
              id="路径"
              fill="url(#linearGradient-1)"
            ></path>
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
