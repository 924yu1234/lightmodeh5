import React from 'react';
import styled from 'styled-components';

export default function IconTimeLimit({
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
      className={`${className} dg-icon icon-time-limit`}
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
          id="icon-time-limited"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="icon-limited"
            transform="translate(1, 0)"
            fill="#50E4A2"
            fillRule="nonzero"
          >
            <path
              d="M7.21582816,16 C3.40406346,16 0.313867379,12.9098039 0.313867379,9.09803922 C0.313867379,5.28627451 3.40406346,2.19607843 7.21582816,2.19607843 C11.0275929,2.19607843 14.1177889,5.28627451 14.1177889,9.09803922 C14.1177889,12.9098039 11.0275929,16 7.21582816,16 Z M7.84327914,8.62745098 L7.84327914,6.2745098 L6.43151444,6.2745098 L6.43151444,10.0392157 L10.1962203,10.0392157 L10.1962203,8.62745098 L7.84327914,8.62745098 Z M0.579279144,4.3545098 C0.106534261,3.97024745 -0.100966197,3.34701944 0.0470857827,2.75606607 C0.195137763,2.16511269 0.671961694,1.71332898 1.27003503,1.59733949 C1.86810837,1.48135001 2.4792482,1.72213561 2.83747522,2.21490196 C1.95512701,2.77749584 1.18860651,3.50376283 0.579279144,4.3545098 Z M11.5941811,2.21490196 C11.9524081,1.72213561 12.563548,1.48135001 13.1616213,1.59733949 C13.7596946,1.71332898 14.2365186,2.16511269 14.3845705,2.75606607 C14.5326225,3.34701944 14.3251221,3.97024745 13.8523772,4.3545098 C13.2430498,3.50376283 12.4765293,2.77749584 11.5941811,2.21490196 L11.5941811,2.21490196 Z M9.72563209,1.33458824 C8.91473582,1.07307583 8.06784974,0.94032644 7.21582816,0.941176471 C6.3399066,0.941176471 5.49661248,1.07921569 4.70602424,1.33458824 L4.70602424,0 L9.72563209,0 L9.72563209,1.33458824 Z"
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
`;
