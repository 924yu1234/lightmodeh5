import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeTransferIn({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-transfer-in`}
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
        <g clipPath="url(#clip0_6704_1496)">
          <path
            d="M8.00004 15.1667C4.04671 15.1667 0.833374 11.9534 0.833374 8.00004C0.833374 4.04671 4.04671 0.833374 8.00004 0.833374C8.27337 0.833374 8.50004 1.06004 8.50004 1.33337C8.50004 1.60671 8.27337 1.83337 8.00004 1.83337C4.60004 1.83337 1.83337 4.60004 1.83337 8.00004C1.83337 11.4 4.60004 14.1667 8.00004 14.1667C11.4 14.1667 14.1667 11.4 14.1667 8.00004C14.1667 7.72671 14.3934 7.50004 14.6667 7.50004C14.94 7.50004 15.1667 7.72671 15.1667 8.00004C15.1667 11.9534 11.9534 15.1667 8.00004 15.1667Z"
            fill="white"
          />
          <path
            d="M9.19999 7.30031C9.07333 7.30031 8.94666 7.25364 8.84666 7.15364C8.65333 6.96031 8.65333 6.64033 8.84666 6.44699L14.3133 0.980327C14.5067 0.786994 14.8267 0.786994 15.02 0.980327C15.2133 1.17366 15.2133 1.49366 15.02 1.68699L9.55333 7.15364C9.45999 7.24697 9.33333 7.30031 9.19999 7.30031Z"
            fill="#02FFAB"
          />
          <path
            d="M11.8866 7.83327H8.66663C8.39329 7.83327 8.16663 7.6066 8.16663 7.33327V4.11328C8.16663 3.83995 8.39329 3.61328 8.66663 3.61328C8.93996 3.61328 9.16663 3.83995 9.16663 4.11328V6.83327H11.8866C12.16 6.83327 12.3866 7.05993 12.3866 7.33327C12.3866 7.6066 12.16 7.83327 11.8866 7.83327Z"
            fill="#02FFAB"
          />
        </g>
        <defs>
          <clipPath id="clip0_6704_1496">
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
