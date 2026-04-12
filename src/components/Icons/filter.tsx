import React from 'react';
import styled from 'styled-components';

export default function IconFilter({
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
      className={`${className} dg-icon icon-filter`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="home-adjust"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="setting-(3)"
            transform="translate(0, 2)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path
              d="M18.75,4.15 L12.75,4.15 C12.34,4.15 12,3.81 12,3.4 C12,2.99 12.34,2.65 12.75,2.65 L18.75,2.65 C19.16,2.65 19.5,2.99 19.5,3.4 C19.5,3.81 19.16,4.15 18.75,4.15 Z M4.75,4.15 L0.75,4.15 C0.34,4.15 0,3.81 0,3.4 C0,2.99 0.34,2.65 0.75,2.65 L4.75,2.65 C5.16,2.65 5.5,2.99 5.5,3.4 C5.5,3.81 5.16,4.15 4.75,4.15 Z"
              id="形状"
            ></path>
            <path
              d="M6.75,14.15 L0.75,14.15 C0.34,14.15 0,13.81 0,13.4 C0,12.99 0.34,12.65 0.75,12.65 L6.75,12.65 C7.16,12.65 7.5,12.99 7.5,13.4 C7.5,13.81 7.16,14.15 6.75,14.15 Z M18.75,14.15 L14.75,14.15 C14.34,14.15 14,13.81 14,13.4 C14,12.99 14.34,12.65 14.75,12.65 L18.75,12.65 C19.16,12.65 19.5,12.99 19.5,13.4 C19.5,13.81 19.16,14.15 18.75,14.15 Z"
              id="形状"
            ></path>
            <circle id="椭圆形" cx="7.35" cy="3.6" r="3.6"></circle>
            <circle id="椭圆形" cx="12.15" cy="13.2" r="3.6"></circle>
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
  color: #b7bdc6;
  text-transform: none;
`;
