import React from 'react';
import styled from 'styled-components';

export default function IconShare({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-share`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <title>icon share</title>
        <g
          id="icon-share"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            id="share-nodes-solid-full"
            transform="translate(2.25, 2)"
            fill="#B7BDC6"
            fillRule="nonzero"
          >
            <path
              d="M12,6 C13.65625,6 15,4.65625 15,3 C15,1.34375 13.65625,0 12,0 C10.34375,0 9,1.34375 9,3 C9,3.16875 9.015625,3.3375 9.040625,3.5 L4.9875,5.753125 C4.459375,5.284375 3.7625,5 3,5 C1.34375,5 0,6.34375 0,8 C0,9.65625 1.34375,11 3,11 C3.7625,11 4.45625,10.715625 4.9875,10.246875 L9.040625,12.5 C9.0125,12.6625 9,12.828125 9,13 C9,14.65625 10.34375,16 12,16 C13.65625,16 15,14.65625 15,13 C15,11.34375 13.65625,10 12,10 C11.2375,10 10.54375,10.284375 10.0125,10.753125 L5.959375,8.5 C5.9875,8.3375 6,8.171875 6,8 C6,7.828125 5.984375,7.6625 5.959375,7.5 L10.0125,5.246875 C10.540625,5.715625 11.2375,6 12,6 Z"
              id="路径"
            ></path>
          </g>
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
  color: ${({ theme }) => theme.t_b7b};
`;
