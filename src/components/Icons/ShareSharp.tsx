import React from 'react';
import styled from 'styled-components';

export default function IconShareSharp({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-share-sharp`}
      onClick={onClick}
      {...rest}
    >
      <svg width="15px" height="30px" viewBox="0 0 15 30" version="1.1">
        <title>share image header bg</title>
        <g
          id="share-image-header-bg"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="token-header"
            transform="translate(0, 0)"
            fill="#50E4A2"
            fillRule="nonzero"
          >
            <g id="title-turborange">
              <path
                d="M13.9577842,30 C8.31742931,30 3.74501824,25.4275889 3.74501824,19.787234 L3.74501824,3.7787234 C3.73236615,1.68510638 2.06229045,0 0,0 L166.434043,0 C164.353191,0 162.668085,1.68510638 162.655319,3.7787234 L162.655319,19.787234 C162.655319,25.4275889 158.082908,30 152.442553,30 L13.9577842,30 Z"
                id="路径"
              ></path>
            </g>
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
