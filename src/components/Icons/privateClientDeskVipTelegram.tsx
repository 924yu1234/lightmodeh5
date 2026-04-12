import React from 'react';
import styled from 'styled-components';

export default function IconPrivateClientDeskVipTelegram({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <StyledSpan className={`${className || ''} dg-icon icon-pcd-vip-telegram`}>
      <svg width={size} height={size} viewBox="0 0 36 36" version="1.1">
        <title>vip telegram</title>
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
          id="vip-telegram"
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
              id="Logo"
              transform="translate(8, 9)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M1.09991658,5.70820094 C5.39487508,3.83695573 8.25885345,2.60331637 9.69185167,2.00728284 C13.7833528,0.305485973 14.6335317,0.00986564143 15.1876664,0 C15.3095432,-0.00204286686 15.5820505,0.0281618624 15.7585693,0.171394688 C15.9076183,0.292337686 15.9486277,0.455714481 15.968252,0.570381708 C15.9878763,0.685048934 16.0123132,0.946263815 15.9928877,1.15036954 C15.7711678,3.47999959 14.8117894,9.1333974 14.3237122,11.742623 C14.1171884,12.8466841 13.7105366,13.2168702 13.3168506,13.2530978 C12.4612798,13.3318288 11.8115982,12.6876769 10.9829361,12.1444784 C9.68624342,11.29448 8.95369455,10.7653534 7.6950298,9.93591199 C6.2404249,8.97734896 7.18338472,8.45050603 8.01235983,7.58949726 C8.22930655,7.36416717 11.998971,3.93536587 12.071933,3.62431986 C12.0810581,3.58541835 12.0895267,3.44041197 12.0033809,3.36384328 C11.9172352,3.28727459 11.7900915,3.3134581 11.698341,3.33428208 C11.5682875,3.36379943 9.49680421,4.73297309 5.48389106,7.441803 C4.89590741,7.84555796 4.36333009,8.04228091 3.88615908,8.0319719 C3.36011633,8.02060704 2.34822111,7.73453932 1.59598102,7.49001571 C0.673327936,7.19009757 -0.0599783768,7.03152867 0.00387614987,6.52217486 C0.0371355237,6.25687187 0.402482323,5.98554723 1.09991658,5.70820094 Z"
                id="Path-3"
              ></path>
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
