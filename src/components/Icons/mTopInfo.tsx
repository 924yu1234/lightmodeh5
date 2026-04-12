import React from 'react';
import styled from 'styled-components';

export default function IconMTopInfo({
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
      className={`${className} dg-icon icon-info icon-m-top-info`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 20} height={size || 20} viewBox="0 0 14 14">
        <g
          id="icon-info-grey"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon" fill="currentColor" fillRule="nonzero">
            <g id="info">
              <path
                d="M7,0 C10.8660176,0 14,3.13399805 14,7 C14,10.8660176 10.8660176,14 7,14 C3.13401367,14 0,10.8660176 0,7 C0,3.13401367 3.13401367,0 7,0 Z M7.03673295,9.38231059 C6.60492402,9.38231059 6.25487373,9.73236089 6.25487373,10.1641698 C6.25487373,10.5959787 6.60492402,10.946029 7.03673295,10.946029 C7.46854187,10.946029 7.81859216,10.5959787 7.81859216,10.1641698 C7.81859216,9.73236089 7.46854187,9.38231059 7.03673295,9.38231059 Z M7.03673295,3.12743686 C6.60492402,3.12743686 6.25487373,3.47748716 6.25487373,3.90929608 L6.25487373,7.03673295 C6.25487373,7.46854187 6.60492402,7.81859216 7.03673295,7.81859216 C7.46854187,7.81859216 7.81859216,7.46854187 7.81859216,7.03673295 L7.81859216,3.90929608 C7.81859216,3.47748716 7.46854187,3.12743686 7.03673295,3.12743686 Z"
                id="形状"
                transform="translate(7, 7) scale(1, -1) translate(-7, -7)"
              ></path>
            </g>
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

  color: ${({ theme }) => theme.t_b7b_80};
`;
