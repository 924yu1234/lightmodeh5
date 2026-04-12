import React from 'react';
import styled from 'styled-components';

export default function IconMoreMenu({
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
      className={`${className} dg-icon icon-more`}
      {...rest}
      onClick={onClick}
    >
      <svg
        width={size || 16}
        height={size || 16}
        viewBox="0 0 16 16"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon-open-orders-more"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="icon_more"
            transform="translate(8, 8) rotate(90) translate(-8, -8)"
          >
            <rect
              stroke="currentColor"
              opacity="0.5"
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="7.5"
            ></rect>
            <circle fill="currentColor" cx="8" cy="5" r="1"></circle>
            <circle fill="currentColor" cx="8" cy="8" r="1"></circle>
            <circle fill="currentColor" cx="8" cy="11" r="1"></circle>
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
  text-transform: none;
  color: ${({ theme }) => theme.t_b7b};
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;
