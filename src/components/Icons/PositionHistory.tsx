import React from 'react';
import styled from 'styled-components';

export default function IconPositionHistory({
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
      className={`${className} dg-icon icon-position-history`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 16 16"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="position-history-normal"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g id="table-list-solid-full" fill="currentColor" fillRule="nonzero">
            <path
              d="M0,2.28571429 C0,1.025 1.025,0 2.28571429,0 L13.7142857,0 C14.975,0 16,1.025 16,2.28571429 L16,13.7142857 C16,14.975 14.975,16 13.7142857,16 L2.28571429,16 C1.025,16 0,14.975 0,13.7142857 L0,2.28571429 Z M2.28571429,2.28571429 L2.28571429,4.57142857 L4.57142857,4.57142857 L4.57142857,2.28571429 L2.28571429,2.28571429 Z M13.7142857,2.28571429 L6.85714286,2.28571429 L6.85714286,4.57142857 L13.7142857,4.57142857 L13.7142857,2.28571429 Z M2.28571429,6.85714286 L2.28571429,9.14285714 L4.57142857,9.14285714 L4.57142857,6.85714286 L2.28571429,6.85714286 Z M13.7142857,6.85714286 L6.85714286,6.85714286 L6.85714286,9.14285714 L13.7142857,9.14285714 L13.7142857,6.85714286 Z M2.28571429,11.4285714 L2.28571429,13.7142857 L4.57142857,13.7142857 L4.57142857,11.4285714 L2.28571429,11.4285714 Z M13.7142857,11.4285714 L6.85714286,11.4285714 L6.85714286,13.7142857 L13.7142857,13.7142857 L13.7142857,11.4285714 Z"
              id="形状"
            ></path>
          </g>
        </g>
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
  pointer-events: none;
  color: ${({ theme }) => theme.t_b7b};
`;
