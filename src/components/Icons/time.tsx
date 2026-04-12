import React from 'react';
import styled from 'styled-components';

export default function IconTime({
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
      className={`${className} dg-icon icon-time`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 15}
        height={size || 15}
        viewBox="0 0 15 15"
        version="1.1"
      >
        <title>icon countdown</title>
        <g
          id="icon-countdown"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="time"
            transform="translate(1, 0)"
            fill="#FEBE2F"
            fillRule="nonzero"
          >
            <path
              d="M6.5,2 C10.0898735,2 13,4.91014105 13,8.5 C13,12.0898735 10.0898735,15 6.5,15 C2.91015555,15 0,12.0898735 0,8.5 C0,4.91015555 2.91015555,2 6.5,2 Z M6.5,3 C3.46243931,3 1,5.46243931 1,8.5 C1,11.5375852 3.46243931,14 6.5,14 C9.53758523,14 12,11.5375852 12,8.5 C12,5.46242704 9.53758523,3 6.5,3 Z"
              id="路径-2"
            ></path>
            <path
              d="M7.41421356,7.4830127 C7.67931024,7.4830127 7.89421356,7.69791602 7.89421356,7.9630127 L7.89421356,10.0030127 C7.89421356,10.2681094 7.67931024,10.4830127 7.41421356,10.4830127 C7.14911688,10.4830127 6.93421356,10.2681094 6.93421356,10.0030127 L6.93421356,7.9630127 C6.93421356,7.69791602 7.14911688,7.4830127 7.41421356,7.4830127 Z"
              id="矩形"
              transform="translate(7.4142, 8.983) rotate(-60) translate(-7.4142, -8.983)"
            ></path>
            <path
              d="M6.5,-1 C6.76509668,-1 6.98,-0.78509668 6.98,-0.52 L6.98,1.52 C6.98,1.78509668 6.76509668,2 6.5,2 C6.23490332,2 6.02,1.78509668 6.02,1.52 L6.02,-0.52 C6.02,-0.78509668 6.23490332,-1 6.5,-1 Z"
              id="矩形"
              transform="translate(6.5, 0.5) rotate(90) translate(-6.5, -0.5)"
            ></path>
            <path
              d="M6.5,5.1 C6.76509668,5.1 6.98,5.31490332 6.98,5.58 L6.98,8.38 C6.98,8.64509668 6.76509668,8.86 6.5,8.86 C6.23490332,8.86 6.02,8.64509668 6.02,8.38 L6.02,5.58 C6.02,5.31490332 6.23490332,5.1 6.5,5.1 Z"
              id="矩形"
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

  color: ${({ theme }) => theme.t_b7b};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
