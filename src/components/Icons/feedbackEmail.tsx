import React from 'react';
import styled from 'styled-components';

export default function IconFeedbackEmail({
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
      className={`${className} dg-icon icon-feedback-email`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="icon-email" transform="translate(0, 2)">
            <path
              d="M20,3.40934919 L20,11.5906508 C20,13.46352 18.4977778,15 16.6666667,15 L3.33333333,15 C1.50222222,15 0,13.46352 0,11.5906508 L0,3.40934919 L7.91666667,8.86544435 C9.08444444,9.80187893 10.8333333,9.80187893 12.0011111,8.86544435 L20,3.40934919 Z"
              id="Fill-1"
              fill="#00A0FF"
            ></path>
            <path
              d="M20,3.40934919 L12.0833333,9.71778165 C10.9155556,10.6542162 9.16666667,10.6542162 7.99888889,9.71778165 L0,3.40934919 C0,1.53079779 1.50222222,0 3.33333333,0 L16.6666667,0 C18.4977778,0 20,1.44670051 20,3.40934919"
              id="Fill-2"
              fill="#6AC8FF"
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
