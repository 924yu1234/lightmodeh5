import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeWallet({
  className,
  onClick,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-wallet`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 21} height={size || 21} viewBox="0 0 21 21">
        <g clipPath="url(#clip0_6702_5065)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 4.39233C18.1046 4.39233 19 5.28776 19 6.39233V14.9638C19 16.0683 18.1046 16.9638 17 16.9638H5C3.89543 16.9638 3 16.0683 3 14.9638V6.39233C3 5.28776 3.89543 4.39233 5 4.39233H17ZM19 7.96433H14.2857C13.7334 7.96433 13.2857 8.41205 13.2857 8.96433V11.9643C13.2857 12.5166 13.7334 12.9643 14.2857 12.9643H19V7.96433Z"
            fill="#00A0FF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.0001 8.96423V11.9642H15.2144C14.9382 11.9642 14.7144 11.7404 14.7144 11.4642V9.46423C14.7144 9.18809 14.9382 8.96423 15.2144 8.96423H19.0001ZM17.5001 10.2499C17.2239 10.2499 17.0001 10.4738 17.0001 10.7499C17.0001 11.0261 17.2239 11.2499 17.5001 11.2499C17.7762 11.2499 18.0001 11.0261 18.0001 10.7499C18.0001 10.4738 17.7762 10.2499 17.5001 10.2499Z"
            fill="#00A0FF"
          />
          <path
            d="M4.79466 5.08587L12.0757 1.98642C12.5685 1.81673 13.0782 1.8356 13.519 2.00406C13.6214 2.04321 13.7201 2.09044 13.814 2.14527C14.1943 2.3673 14.4957 2.71385 14.6468 3.15242C15.1678 4.37801 15.5587 5.29719 15.8192 5.90999"
            stroke="#00A0FF"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6702_5065">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(3 1)"
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
`;
