import React from 'react';
import styled from 'styled-components';

export default function IconStatusDisabled({
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
      className={`${className} dg-icon icon-status-disabled`}
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
          id="popup_forbidden50x50"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.7"
        >
          <path
            d="M25,0 C38.8071187,0 50,11.1928813 50,25 C50,38.8071187 38.8071187,50 25,50 C11.1928813,50 0,38.8071187 0,25 C0,11.1928813 11.1928813,0 25,0 Z M3,25 C3,37.1502645 12.8497355,47 25,47 C30.662701,47 35.8257086,44.8605588 39.7248091,41.3458903 L8.65410966,10.2751909 C5.13944122,14.1742914 3,19.337299 3,25 Z M25,3 C19.5921904,3 14.6401018,4.95117349 10.8093265,8.18792817 L41.8120718,39.1906735 C45.0488265,35.3598982 47,30.4078096 47,25 C47,12.8497355 37.1502645,3 25,3 Z"
            id="椭圆形-2"
            fill="#DE4D77"
          ></path>
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
