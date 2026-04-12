import React from 'react';
import styled from 'styled-components';

export default function IconCopyTradeBots({
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
      className={`${className} dg-icon icon-bots`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 17}
        height={size || 17}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6839_905)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.534 3.46606C14.7964 3.46606 15.8198 4.48941 15.8198 5.75178V12.6089C15.8198 13.8713 14.7964 14.8946 13.534 14.8946H4.39118C3.12882 14.8946 2.10547 13.8713 2.10547 12.6089V5.75178C2.10547 4.48941 3.12882 3.46606 4.39118 3.46606H13.534ZM10.6769 10.3232H7.24833C6.93273 10.3232 6.6769 10.579 6.6769 10.8946C6.6769 11.2102 6.93273 11.4661 7.24833 11.4661H10.6769C10.9925 11.4661 11.2483 11.2102 11.2483 10.8946C11.2483 10.579 10.9925 10.3232 10.6769 10.3232ZM6.10547 8.03749H4.96261C4.64702 8.03749 4.39118 8.29333 4.39118 8.60892C4.39118 8.92451 4.64702 9.18035 4.96261 9.18035H6.10547C6.42106 9.18035 6.6769 8.92451 6.6769 8.60892C6.6769 8.29333 6.42106 8.03749 6.10547 8.03749ZM12.9626 8.03749H11.8198C11.5042 8.03749 11.2483 8.29333 11.2483 8.60892C11.2483 8.92451 11.5042 9.18035 11.8198 9.18035H12.9626C13.2782 9.18035 13.534 8.92451 13.534 8.60892C13.534 8.29333 13.2782 8.03749 12.9626 8.03749Z"
            fill="#02FFAB"
          />
          <path
            d="M10.6768 1.1803H7.24819C6.9326 1.1803 6.67676 1.43614 6.67676 1.75173C6.67676 2.06732 6.9326 2.32316 7.24819 2.32316H10.6768C10.9923 2.32316 11.2482 2.06732 11.2482 1.75173C11.2482 1.43614 10.9923 1.1803 10.6768 1.1803Z"
            fill="#02FFAB"
          />
          <path
            d="M2.10526 6.89453H0.962402V11.466H2.10526V6.89453Z"
            fill="#02FFAB"
          />
          <path
            d="M16.9622 6.89453H15.8193V11.466H16.9622V6.89453Z"
            fill="#02FFAB"
          />
        </g>
        <defs>
          <clipPath id="clip0_6839_905">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0.962402 0.0374756)"
            />
          </clipPath>
        </defs>
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

  color: ${({ theme }) => theme.t_b7b};
`;
