import React from 'react';
import styled from 'styled-components';

export default function IconCopy2({
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
      className={`${className} dg-icon icon-copy2`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <title>icon copy</title>
        <g
          id="icon-copy"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="icon-copy-blue"
            transform="translate(0.2414, 0.7)"
            stroke="currentColor"
          >
            <g id="编组-14" transform="translate(0, 2.3508)" strokeWidth="1.5">
              <rect
                id="矩形"
                x="0.75"
                y="0.75"
                width="15.5"
                height="14.5"
                rx="2"
              ></rect>
            </g>
            <path
              d="M6.95862069,0 L15.3070235,0 C17.6676108,0 19.0275862,2.20338983 19.0275862,4.20906713 L19.0275862,14.3030189"
              id="路径"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
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
`;
