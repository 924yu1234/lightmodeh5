import React from 'react';
import styled from 'styled-components';

export default function IconPrivateClientDeskVipEmail({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <StyledSpan className={`${className || ''} dg-icon icon-pcd-vip-email`}>
      <svg width={size} height={size} viewBox="0 0 36 36" version="1.1">
        <title>vip email</title>
        <defs>
          <linearGradient
            x1="29.9673227%"
            y1="1.47029748e-13%"
            x2="78.8724459%"
            y2="100%"
            id="linearGradient-1"
          >
            <stop stopColor="#4B4B4B" offset="0%"></stop>
            <stop stopColor="#2E2E2E" offset="51.735372%"></stop>
            <stop stopColor="#1C1C1C" offset="100%"></stop>
          </linearGradient>
          <rect id="path-2" x="0" y="0" width="32" height="32" rx="16"></rect>
          <filter
            x="-9.4%"
            y="-9.4%"
            width="118.8%"
            height="118.8%"
            filterUnits="objectBoundingBox"
            id="filter-3"
          >
            <feOffset
              dx="0"
              dy="0"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="1"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feComposite
              in="shadowBlurOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowBlurOuter1"
            ></feComposite>
            <feColorMatrix
              values="0 0 0 0 0   0 0 0 0 0.62745098   0 0 0 0 1  0 0 0 0.401360358 0"
              type="matrix"
              in="shadowBlurOuter1"
            ></feColorMatrix>
          </filter>
        </defs>
        <g
          id="vip-email"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="编组-4" transform="translate(2, 2)">
            <g id="矩形">
              <use
                fill="black"
                fillOpacity="1"
                filter="url(#filter-3)"
                xlinkHref="#path-2"
              ></use>
              <rect
                strokeOpacity="0.47342111"
                stroke="#00A0FF"
                strokeWidth="0.5"
                strokeLinejoin="miter"
                fill="url(#linearGradient-1)"
                fillRule="evenodd"
                x="0.25"
                y="0.25"
                width="31.5"
                height="31.5"
                rx="15.75"
              ></rect>
            </g>
            <g
              id="connect_email"
              transform="translate(8, 10)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <g id="email-white">
                <path
                  d="M1.5,0 C0.671875,0 0,0.671875 0,1.5 C0,1.971875 0.221875,2.415625 0.6,2.7 L7.1,7.575 C7.634375,7.975 8.365625,7.975 8.9,7.575 L15.4,2.7 C15.778125,2.415625 16,1.971875 16,1.5 C16,0.671875 15.328125,0 14.5,0 L1.5,0 Z M0,4.125 L0,10 C0,11.103125 0.896875,12 2,12 L14,12 C15.103125,12 16,11.103125 16,10 L16,4.125 L9.8,8.775 C8.734375,9.575 7.265625,9.575 6.2,8.775 L0,4.125 Z"
                  id="形状"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  display: inline-flex;
  line-height: 0;
`;
