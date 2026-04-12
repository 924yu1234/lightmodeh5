import React from 'react';
import styled from 'styled-components';

export default function IconSortwUp({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-sort-up`}
      onClick={onClick}
      {...rest}
    >
      <svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1">
        <g
          id="arrow-sorting-default-up"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="上下箭头-icon"
            transform="translate(1.625, 0.75)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path
              d="M4.74507988,0.421513339 L7.70964205,3.34800292 C7.94546603,3.58079831 7.94792118,3.96068936 7.71512579,4.19651334 C7.60238924,4.31071656 7.44860272,4.375 7.28812871,4.375 L1.43522089,4.375 C1.10385004,4.375 0.835220894,4.10637085 0.835220894,3.775 C0.835220894,3.61723094 0.897361375,3.46581039 1.00818815,3.3535228 L3.8966056,0.427032747 C4.12934489,0.191153407 4.50923574,0.188666105 4.74507941,0.421441537 C4.74509146,0.421453426 4.7451035,0.421465316 4.74507988,0.421513339 Z"
              id="Triangle"
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
  color: ${({ theme }) => theme.t_b7b_50};
  text-transform: none;
`;
