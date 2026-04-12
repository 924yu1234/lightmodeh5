import React from 'react';
import styled from 'styled-components';

export default function IconGuideArrow({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-guide-arrow`}
      onClick={onClick}
      {...rest}
    >
      <svg width="55px" height="55px" viewBox="0 0 55 55" version="1.1">
        <title>guide arrow</title>
        <g
          id="guide-arrow"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M45.8297396,6.15068144 L45.1732355,2 L53,6.14076446 L46.8333381,12.4947157 L46.1995013,8.48712209 C34.2458561,11.1607401 23.2802255,17.3407191 22.8985635,30.4022327 C27.2915026,28.4083529 32.0071686,27.9748392 36.8684725,29.8505653 C40.0385062,31.0734707 45.3891423,36.3728218 42.9430482,42.7126059 C40.8307313,48.1870626 33.2354575,51.514918 26.5446122,46.338254 C22.4701499,43.1857875 21.0426714,37.2673335 20.7086108,34.3180234 C20.1447596,34.6906185 19.587992,35.0901312 19.0391579,35.5140113 C13.7049557,39.6323917 9.10120987,46.0084436 5.63933358,52.5559176 L5.08738277,53.5994673 L3,52.495849 L3.55195081,51.452016 C7.17363217,44.6024991 12.0159522,37.9533052 17.5963789,33.6450854 C18.5529425,32.906412 19.5313235,32.2357408 20.5301051,31.6429887 C20.2065282,16.4153232 32.3573797,9.13512595 45.8297396,6.15068144 Z M22.9580653,32.9976483 C22.980166,33.3110248 23.0087836,33.6289349 23.043068,33.9508118 C23.3102598,36.4583912 24.4266285,41.7141076 27.9893747,44.4707449 C33.1745389,48.4823053 39.1031933,46.1050633 40.7400618,41.862579 C42.6121044,37.0106253 38.4447057,32.9894313 36.0184456,32.0532684 C31.4498342,30.2905959 27.0398946,30.9037486 22.9580653,32.9976483 Z"
            id="形状"
            fill="#FFFFFF"
            transform="translate(28, 27.7997) scale(1, -1) rotate(90) translate(-28, -27.7997)"
          ></path>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
`;
