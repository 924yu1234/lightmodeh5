import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeCopy({
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
      className={`${className} dg-icon icon-copy`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 22}
        height={size || 23}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.0750122" width="22" height="22" rx="6" fill="currentColor" />
        <path
          d="M16.7764 7.40092C16.7764 6.12031 15.7383 5.08217 14.4577 5.08217H8.39688C8.08276 5.08217 7.82812 5.3368 7.82812 5.65092C7.82812 5.96503 8.08276 6.21967 8.39688 6.21967H14.4577C15.1101 6.21967 15.639 6.74853 15.639 7.40092V14.1127C15.639 14.4268 15.8936 14.6814 16.2077 14.6814C16.5218 14.6814 16.7764 14.4268 16.7764 14.1127V7.40092Z"
          fill="white"
        />
        <path
          d="M14.1715 9.12937C14.1715 8.33202 13.5251 7.68562 12.7277 7.68562H6.66689C5.86954 7.68562 5.22314 8.33202 5.22314 9.12937V15.6249C5.22314 16.4223 5.86954 17.0686 6.66689 17.0686H12.7277C13.5251 17.0686 14.1715 16.4223 14.1715 15.6249V9.12937ZM12.7277 8.82312C12.8969 8.82312 13.034 8.96024 13.034 9.12937V15.6249C13.034 15.7941 12.8969 15.9311 12.7277 15.9311H6.66689C6.49776 15.9311 6.36064 15.7941 6.36064 15.6249V9.12937C6.36064 8.96024 6.49776 8.82312 6.66689 8.82312H12.7277Z"
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
  cursor: pointer;

  color: ${({ theme }) => theme.blue};
`;
