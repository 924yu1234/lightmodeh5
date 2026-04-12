import React from 'react';
import styled from 'styled-components';

export default function IconStatusSuccess({
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
      className={`${className} dg-icon icon-status-success`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 14}
        height={size || 14}
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="currentColor" fillRule="nonzero">
            <g>
              <path
                d="M12,0.000140625 C5.37264844,0.000140625 0.000140625,5.37264844 0.000140625,12 C0.000140625,18.6273516 5.37264844,23.9998594 12,23.9998594 C18.6273516,23.9998594 23.9998594,18.6273516 23.9998594,12 C23.9998594,5.37264844 18.6273516,0.000140625 12,0.000140625 Z M18.3130078,9.15789844 L10.9716094,16.4993906 C10.7427891,16.7282109 10.4428594,16.8426328 10.1429766,16.8426328 C9.84307031,16.8426328 9.54316406,16.7282109 9.31434375,16.4993906 L9.3136875,16.4987109 L5.68699219,12.8720625 C5.22935156,12.4144219 5.22932812,11.6724141 5.68699219,11.2147969 C6.14463281,10.7571563 6.88661719,10.7571328 7.34428125,11.2147969 L10.1429766,14.0134688 L16.6557422,7.50065625 C17.1133594,7.04301563 17.8553672,7.04299219 18.3130313,7.50065625 C18.7706719,7.95827344 18.7706719,8.70025781 18.3130078,9.15789844 L18.3130078,9.15789844 Z"
                id="形状"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  color: ${({ theme }) => theme.buy};
`;
