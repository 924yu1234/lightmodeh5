import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeResume({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-resume`}
      onClick={onClick}
      {...rest}
    >
      <svg width="17" height="17" viewBox="0 0 17 17">
        <path
          d="M10.9066 7.79462L7.11224 4.11513C6.87548 3.88553 6.42285 4.0247 6.42285 4.3271L6.42285 11.6861C6.42285 11.9885 6.87548 12.1277 7.11224 11.8981L10.9066 8.21856C11.0324 8.09659 11.0324 7.9166 10.9066 7.79462Z"
          fill="currentColor"
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

  color: ${({ theme }) => theme.buy};
`;
