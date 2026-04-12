import React from 'react';
import styled from 'styled-components';

export default function IconStatusFailed2({
  className,
  size = 14,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-status-failed`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 50}
        height={size || 50}
        viewBox="0 0 50 50"
        version="1.1"
      >
        <g
          id="popup_error"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="icon"
            transform="translate(0.013, 0.0119)"
            fill="#DE4D77"
            fillRule="nonzero"
          >
            <g id="失败">
              <path
                d="M25,0 C11.192906,0 0,11.192906 0,25 C0,38.8072056 11.192906,50 25,50 C38.8072056,50 50,38.8072056 50,25 C50,11.1928502 38.8072056,0 25,0 Z"
                id="路径"
                opacity="0.1"
              ></path>
              <path
                d="M34.9278683,32.4493873 C35.6119257,33.1339467 35.6119257,34.2437551 34.9278683,34.9274221 C34.2426954,35.6119815 33.133389,35.6119815 32.4483276,34.9274221 L25.0122153,27.4913098 L17.5756011,34.9274221 C16.8909859,35.6119815 15.7816795,35.6119815 15.0965623,34.9274221 C14.4123934,34.2438109 14.4123934,33.1339467 15.0965623,32.4493873 L22.5336228,25.0112671 L15.0965623,17.5750991 C14.4123934,16.8914879 14.4123934,15.7807313 15.0965623,15.0961161 C15.7816237,14.4125049 16.8909301,14.4125049 17.5756011,15.0961161 L25.0122153,22.5332323 L32.4483276,15.0961161 C33.133389,14.4125049 34.2426954,14.4125049 34.9278125,15.0961161 C35.6119257,15.7807313 35.6119257,16.8915994 34.9278125,17.5750991 L27.4906963,25.0112671 L34.9278125,32.4493873 L34.9278683,32.4493873 Z"
                id="路径"
              ></path>
            </g>
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
