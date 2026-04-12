import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeTransferOut({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-transfer-out`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6704_1504)">
          <path
            d="M8.00004 15.1667C4.04671 15.1667 0.833374 11.9534 0.833374 8.00004C0.833374 4.04671 4.04671 0.833374 8.00004 0.833374C8.27337 0.833374 8.50004 1.06004 8.50004 1.33337C8.50004 1.60671 8.27337 1.83337 8.00004 1.83337C4.60004 1.83337 1.83337 4.60004 1.83337 8.00004C1.83337 11.4 4.60004 14.1667 8.00004 14.1667C11.4 14.1667 14.1667 11.4 14.1667 8.00004C14.1667 7.72671 14.3934 7.50004 14.6667 7.50004C14.94 7.50004 15.1667 7.72671 15.1667 8.00004C15.1667 11.9534 11.9534 15.1667 8.00004 15.1667Z"
            fill="white"
          />
          <path
            d="M8.66655 7.83351C8.53988 7.83351 8.41321 7.78684 8.31321 7.68684C8.11988 7.49351 8.11988 7.17351 8.31321 6.98018L13.7799 1.51353C13.9732 1.3202 14.2932 1.3202 14.4865 1.51353C14.6799 1.70686 14.6799 2.02686 14.4865 2.2202L9.01988 7.68684C8.91988 7.78684 8.79321 7.83351 8.66655 7.83351Z"
            fill="#02FFAB"
          />
          <path
            d="M14.6667 5.05337C14.3933 5.05337 14.1667 4.82671 14.1667 4.55337V1.83337H11.4467C11.1733 1.83337 10.9467 1.60671 10.9467 1.33337C10.9467 1.06004 11.1733 0.833374 11.4467 0.833374H14.6667C14.94 0.833374 15.1667 1.06004 15.1667 1.33337V4.55337C15.1667 4.82671 14.94 5.05337 14.6667 5.05337Z"
            fill="#02FFAB"
          />
        </g>
        <defs>
          <clipPath id="clip0_6704_1504">
            <rect width="16" height="16" fill="white" />
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
