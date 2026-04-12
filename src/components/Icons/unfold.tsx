import React from 'react';
import styled from 'styled-components';

export default function IconUnfold({
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
      className={`${className} dg-icon icon-unfold`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_288_819)">
          <path
            d="M13 0H1C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H13C13.5523 2 14 1.55228 14 1C14 0.447715 13.5523 0 13 0Z"
            fill="#B7BDC6"
          />
          <path
            d="M13 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H13C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12Z"
            fill="#B7BDC6"
          />
          <path
            d="M13 4H6C5.44772 4 5 4.44772 5 5C5 5.55228 5.44772 6 6 6H13C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4Z"
            fill="#B7BDC6"
          />
          <path
            d="M13 8H6C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10H13C13.5523 10 14 9.55228 14 9C14 8.44772 13.5523 8 13 8Z"
            fill="#B7BDC6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.678427 7.424L3.23503 9.02187C3.4692 9.16823 3.77767 9.09704 3.92403 8.86287C3.97369 8.78341 4.00003 8.69158 4.00003 8.59787V5.40212C4.00003 5.12598 3.77617 4.90212 3.50003 4.90212C3.40632 4.90212 3.31449 4.92846 3.23503 4.97812L0.678427 6.576C0.444258 6.72235 0.373072 7.03083 0.519427 7.265C0.559668 7.32938 0.614042 7.38376 0.678427 7.424Z"
            fill="#B7BDC6"
          />
        </g>
        <defs>
          <clipPath id="clip0_288_819">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
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

  color: ${({ theme }) => theme.blue};
`;
