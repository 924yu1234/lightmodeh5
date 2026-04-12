import React from 'react';
import styled from 'styled-components';

export default function IconRaffleSolo({
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
      className={`${className} dg-icon icon-raffle-solo`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g
          id="tab_solo_off"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          fillOpacity="0.8"
        >
          <g
            id="group"
            transform="translate(4.8, 2.202)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <path
              d="M3.6,10.8 C1.6117749,10.8 0,12.4117749 0,14.4 L0,18.8 C0,19.4627417 0.5372583,20 1.2,20 L13.2,20 C13.8627417,20 14.4,19.4627417 14.4,18.8 L14.4,14.4 C14.4,12.4117749 12.7882251,10.8 10.8,10.8 L3.6,10.8 Z"
              id="路径"
            ></path>
            <circle id="椭圆形" cx="7.2" cy="4.8" r="4.8"></circle>
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
`;
