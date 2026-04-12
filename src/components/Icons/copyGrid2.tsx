import React from 'react';
import styled from 'styled-components';

export default function IconCopyGrid2({
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
      className={`${className} dg-icon icon-copy-grid2`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 12} height={size || 12} viewBox="0 0 14 14">
        <g
          id="icon-copy"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g id="icon-copy" transform="translate(0, 0.5)" stroke="currentColor">
            <g id="编组-14" transform="translate(0, 1.4687)">
              <path
                d="M10,0.5 C10.4142136,0.5 10.7892136,0.667893219 11.0606602,0.939339828 C11.3321068,1.21078644 11.5,1.58578644 11.5,2 L11.5,10 C11.5,10.4142136 11.3321068,10.7892136 11.0606602,11.0606602 C10.7892136,11.3321068 10.4142136,11.5 10,11.5 L2,11.5 C1.58578644,11.5 1.21078644,11.3321068 0.939339828,11.0606602 C0.667893219,10.7892136 0.5,10.4142136 0.5,10 L0.5,2 C0.5,1.58578644 0.667893219,1.21078644 0.939339828,0.939339828 C1.21078644,0.667893219 1.58578644,0.5 2,0.5 Z"
                id="矩形"
              ></path>
            </g>
            <path
              d="M3.5,0 L11.1023041,0 C12.6235714,0 13.5,1.421875 13.5,2.71616364 L13.5,10.3236669"
              id="路径"
              strokeLinecap="round"
              strokeLinejoin="round"
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
`;
