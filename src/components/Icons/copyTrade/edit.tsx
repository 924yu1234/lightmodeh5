import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeEdit({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-edit`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2267_22054)">
          <path
            d="M10.0068 4.97422L10.7032 4.27779C11.0054 3.9756 11.4953 3.9756 11.7975 4.27779C12.0997 4.57998 12.0997 5.06993 11.7975 5.37212L5.86762 11.302C5.64944 11.5202 5.38033 11.6806 5.08461 11.7687L3.97656 12.0988L4.30663 10.9907C4.39472 10.695 4.5551 10.4259 4.77329 10.2077L10.0068 4.97422ZM10.0068 4.97422L11.0956 6.06305"
            stroke="white"
            strokeWidth="0.619048"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2267_22054">
            <rect
              width="9.90476"
              height="9.90476"
              fill="white"
              transform="translate(3.04785 3.12256)"
            />
          </clipPath>
        </defs>
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

  color: ${({ theme }) => theme.t_b7b};
`;
