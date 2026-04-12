import React from 'react';
import styled from 'styled-components';

export default function IconCopy({
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
      className={`${className} dg-icon icon-copy`}
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
          id="icon-copy"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(0.2414, 0.7)">
            <g id="编组-14" transform="translate(0, 2.3508)">
              <rect
                stroke="currentColor"
                strokeWidth="1.5"
                x="0.75"
                y="0.75"
                width="15.5"
                height="14.5"
                rx="2"
              ></rect>
              <rect
                fill="currentColor"
                x="3.20689655"
                y="8.47457627"
                width="6.89655172"
                height="1.69491525"
                rx="0.7"
              ></rect>
              <rect
                fill="currentColor"
                x="3.20689655"
                y="5.08474576"
                width="10.3448276"
                height="1.69491525"
                rx="0.7"
              ></rect>
            </g>
            <path
              d="M6.95862069,0 L15.3070235,0 C17.6676108,0 19.0275862,2.20338983 19.0275862,4.20906713 L19.0275862,14.3030189"
              stroke="currentColor"
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

  color: ${({ theme }) => theme.blue};
`;
