import React from 'react';
import styled from 'styled-components';

export default function IconMessageWarning({
  className,
  size = 16,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      size={size}
      className={`${className} dg-icon icon-message-warning`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(12.000000, 12.000000) scale(1, -1) translate(-12.000000, -12.000000) "
            fill="currentColor"
            fillRule="nonzero"
          >
            <g>
              <path d="M11.9503817,0.0118519176 C18.543244,0.0118519176 23.8877397,5.35637429 23.8877397,11.9492099 C23.8877397,18.5420721 18.543244,23.8865678 11.9503817,23.8865678 C5.3575728,23.8865678 0.0130237926,18.5420721 0.0130237926,11.9492099 C0.0130237926,5.35640092 5.3575728,0.0118519176 11.9503817,0.0118519176 Z M12.0130238,16.0118519 C11.2766441,16.0118519 10.6796905,16.6088056 10.6796905,17.3451853 C10.6796905,18.0815649 11.2766441,18.6785186 12.0130238,18.6785186 C12.7494035,18.6785186 13.3463571,18.0815649 13.3463571,17.3451853 C13.3463571,16.6088056 12.7494035,16.0118519 12.0130238,16.0118519 Z M12.3463571,5.34518525 L11.6796905,5.34518525 C11.1274057,5.34518525 10.6796905,5.7929005 10.6796905,6.34518525 L10.6796905,6.34518525 L10.6796905,12.3451853 C10.6796905,12.89747 11.1274057,13.3451853 11.6796905,13.3451853 L11.6796905,13.3451853 L12.3463571,13.3451853 C12.8986419,13.3451853 13.3463571,12.89747 13.3463571,12.3451853 L13.3463571,12.3451853 L13.3463571,6.34518525 C13.3463571,5.7929005 12.8986419,5.34518525 12.3463571,5.34518525 L12.3463571,5.34518525 Z"></path>
            </g>
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

  color: ${({ theme }) => theme.yellow || '#febe2f'};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ size }: { size: number }) => size}px;
`;
