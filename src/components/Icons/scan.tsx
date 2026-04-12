import React from 'react';
import styled from 'styled-components';

export default function IconScan({
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
      className={`${className} dg-icon icon-scan`}
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
          id="icon-scan"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon_scan" transform="translate(0, 1)">
            <rect
              fill="currentColor"
              x="0"
              y="8"
              width="20"
              height="1.7"
              rx="0.85"
            ></rect>
            <path
              d="M13.9140625,0 L17.4487535,0 C18.3054833,0 19,0.666736062 19,1.48919668 L19,4.73974609"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M1,0 L4.53469096,0 C5.39142077,0 6.0859375,0.666736062 6.0859375,1.48919668 L6.0859375,4.73974609"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(3.543, 2.3699) scale(-1, 1) translate(-3.543, -2.3699)"
            ></path>
            <path
              d="M14,13 L17.534691,13 C18.3914208,13 19.0859375,13.6667361 19.0859375,14.4891967 L19.0859375,17.7397461"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(16.543, 15.3699) scale(1, -1) translate(-16.543, -15.3699)"
            ></path>
            <path
              d="M1,13 L4.53469096,13 C5.39142077,13 6.0859375,13.6667361 6.0859375,14.4891967 L6.0859375,17.7397461"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(3.543, 15.3699) scale(-1, -1) translate(-3.543, -15.3699)"
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
  color: ${({ theme }) => theme.t_b7b};
`;
