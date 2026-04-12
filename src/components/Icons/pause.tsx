import React from 'react';
import styled from 'styled-components';

export default function Pause({
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
      className={`${className} dg-icon icon-pause`}
      onClick={onClick}
      {...rest}
    >
      <svg
        viewBox="0 0 20 20"
        focusable="false"
        data-icon="close-circle"
        width={size || 20}
        height={size || 20}
        fill="currentColor"
        aria-hidden="true"
      >
        <g
          id="icon-pause"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g fill="#DE4D77">
            <rect id="矩形" x="6" y="6" width="8" height="8" rx="1"></rect>
            <path
              d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,0.909090909 C4.97922955,0.909090909 0.909090909,4.97922955 0.909090909,10 C0.909090909,15.0207705 4.97922955,19.0909091 10,19.0909091 C15.0207705,19.0909091 19.0909091,15.0207705 19.0909091,10 C19.0909091,4.97922955 15.0207705,0.909090909 10,0.909090909 Z"
              id="椭圆形-2"
              fillOpacity="0.8"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;

  color: ${({ theme }) => theme.t_b7b_40};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.t_b7b_40};
  }
`;
