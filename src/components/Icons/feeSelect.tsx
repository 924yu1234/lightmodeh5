import React from 'react';
import styled from 'styled-components';

export default function FeeSelect({
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
      className={`${className} dg-icon icon-feeSelect`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 22} height={size || 16} viewBox="0 0 22 16">
        <title>icon change</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1564.000000, -495.000000)">
            <g transform="translate(1257.000000, 77.000000)">
              <g transform="translate(21.000000, 122.000000)">
                <g transform="translate(0.000000, 295.000000)">
                  <g transform="translate(200.000000, 0.000000)">
                    <g
                      id="icon-change"
                      transform="translate(86.000000, 1.000000)"
                    >
                      <rect
                        stroke="#979797"
                        opacity="0.5"
                        x="0.5"
                        y="0.5"
                        width="21"
                        height="15"
                        rx="4"
                      ></rect>
                      <path
                        d="M11.9164288,6.6324772 L13.6878414,8.26456276 C14.0940122,8.63878696 14.11991,9.27142208 13.7456858,9.67759285 C13.5563506,9.88309118 13.2896719,10 13.0102486,10 L9.51292238,10 C8.96063763,10 8.51292238,9.55228475 8.51292238,9 C8.51292238,8.72509001 8.62609714,8.46230447 8.8258415,8.27341906 L10.5517551,6.6413335 C10.9336356,6.28021364 11.5298936,6.27634411 11.9164288,6.6324772 Z"
                        id="Triangle"
                        fill="#8E909C"
                        fillRule="nonzero"
                        transform="translate(11.285714, 8.000000) scale(1, -1) translate(-11.285714, -8.000000) "
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
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
`;
