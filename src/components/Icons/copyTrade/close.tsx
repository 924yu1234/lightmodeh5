import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeClose({
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
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.83968 4.8669C4.96445 4.74212 5.16675 4.74212 5.29153 4.8669L8.04768 7.62305L10.8038 4.8669C10.9286 4.74212 11.1309 4.74212 11.2557 4.8669C11.3805 4.99167 11.3805 5.19397 11.2557 5.31875L8.49953 8.0749L11.2557 10.8311C11.3805 10.9558 11.3805 11.1581 11.2557 11.2829C11.1309 11.4077 10.9286 11.4077 10.8038 11.2829L8.04768 8.52676L5.29153 11.2829C5.16675 11.4077 4.96445 11.4077 4.83968 11.2829C4.7149 11.1581 4.7149 10.9558 4.83968 10.8311L7.59583 8.0749L4.83968 5.31875C4.7149 5.19397 4.7149 4.99167 4.83968 4.8669Z"
          fill="white"
        />
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
