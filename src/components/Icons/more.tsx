import React from 'react';
import styled from 'styled-components';

export default function IconMore({
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
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 30}
        height={size || 30}
        viewBox="0 0 30 30"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="icon_more"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="账户充值">
            <circle
              id="椭圆形-2"
              stroke="#00A0FF"
              strokeWidth="2"
              cx="15"
              cy="15"
              r="14"
            ></circle>
            <g
              id="编组-2"
              transform="translate(15.5, 15) rotate(90) translate(-15.5, -15)translate(14, 6)"
              fill="#00A0FF"
            >
              <circle id="椭圆形" cx="1.5" cy="1.5" r="1.5"></circle>
              <circle id="椭圆形" cx="1.5" cy="9" r="1.5"></circle>
              <circle id="椭圆形" cx="1.5" cy="16.5" r="1.5"></circle>
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

  color: ${({ theme }) => theme.blue};
`;
