import React from 'react';
import styled from 'styled-components';

export default function IconActionPause({
  className,
  size,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-action-pause`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 50}
        height={size || 50}
        viewBox="0 0 50 50"
        version="1.1"
      >
        <g
          id="popup_pause"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon">
            <g id="成功-(1)" fill="#FEBE2F" fillRule="nonzero">
              <path
                d="M24.999707,0 C11.1927246,0 0,11.1927246 0,24.999707 C0,38.8066895 11.1927246,49.9994141 24.999707,49.9994141 C38.8066895,49.9994141 49.9994141,38.8066895 49.9994141,24.999707 C49.9994141,11.1927246 38.8066895,0 24.999707,0 Z"
                id="形状"
              ></path>
            </g>
            <g
              id="编组"
              transform="translate(18, 14)"
              fill="#FFFFFF"
              stroke="#FFFFFF"
            >
              <rect id="矩形" x="0" y="0" width="4" height="22" rx="2"></rect>
              <rect id="矩形" x="11" y="0" width="4" height="22" rx="2"></rect>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  color: ${({ theme }) => theme.buy};
`;
