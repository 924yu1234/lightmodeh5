import React from 'react';
import styled from 'styled-components';

export default function IconSearch({
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
      className={`${className} dg-icon icon-search`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 14 14"
        version="1.1"
      >
        <title>iconsearch</title>
        <g
          id="iconsearch"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="搜索">
            <rect
              id="矩形"
              fillOpacity="0"
              fill="#FFFFFF"
              x="0"
              y="0"
              width="14"
              height="14"
            ></rect>
            <g
              id="编组-10"
              transform="translate(0.1556, 0.3889)"
              fill="#B7BDC6"
            >
              <path
                d="M10.4767048,10.3340319 L13.2109669,10.3340319 C13.649831,10.3340319 14.0056006,10.6898015 14.0056006,11.1286656 C14.0056006,11.5675296 13.649831,11.9232992 13.2109669,11.9232992 L10.4767048,11.9232992 C10.0378408,11.9232992 9.68207116,11.5675296 9.68207116,11.1286656 C9.68207116,10.6898015 10.0378408,10.3340319 10.4767048,10.3340319 Z"
                id="矩形"
                transform="translate(11.8438, 11.1287) rotate(-315) translate(-11.8438, -11.1287)"
              ></path>
              <path
                d="M6.35706914,0 C9.86798148,0 12.7141383,2.8461568 12.7141383,6.35706914 C12.7141383,9.86798148 9.86798148,12.7141383 6.35706914,12.7141383 C2.8461568,12.7141383 0,9.86798148 0,6.35706914 C0,2.8461568 2.8461568,0 6.35706914,0 Z M6.35706914,1.23529412 C3.5283909,1.23529412 1.23529412,3.5283909 1.23529412,6.35706914 C1.23529412,9.18574738 3.5283909,11.4788442 6.35706914,11.4788442 C9.18574738,11.4788442 11.4788442,9.18574738 11.4788442,6.35706914 C11.4788442,3.5283909 9.18574738,1.23529412 6.35706914,1.23529412 Z"
                id="椭圆形"
                fillRule="nonzero"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span<{ disabled?: boolean }>`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  color: ${({ theme }) => theme.t_b7b_50};
  text-transform: none;
`;
