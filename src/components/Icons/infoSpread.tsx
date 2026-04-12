import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function IconSpread(props: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  const { size, className, onClick, ...rest } = props;
  return (
    <StyledSpan
      className={`${className} dg-icon icon-spread`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 14} height={size || 14} viewBox="0 0 14 14">
        <g
          id="icon-spread"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="说明-icon">
            <path
              d="M7.8637789,1.48076383 L13.1227419,10.496129 C13.4010222,10.9731809 13.2398859,11.5854986 12.762834,11.8637789 C12.609898,11.9529916 12.4360176,12 12.258963,12 L1.741037,12 C1.18875225,12 0.741036999,11.5522847 0.741036999,11 C0.741036999,10.8229454 0.788045397,10.649065 0.877258098,10.496129 L6.1362211,1.48076383 C6.41450138,1.00371192 7.02681911,0.842575671 7.50387103,1.12085595 C7.65287466,1.20777474 7.77686011,1.3317602 7.8637789,1.48076383 Z"
              id="三角形"
              stroke="currentColor"
            ></path>
            <path
              d="M6.99173554,11 C7.27272727,11 7.50413223,10.8991597 7.70247934,10.7142857 C7.90082645,10.512605 8,10.2773109 8,9.99159664 C8,9.68907563 7.90082645,9.45378151 7.70247934,9.28571429 C7.50413223,9.08403361 7.27272727,9 6.99173554,9 C6.7107438,9 6.47933884,9.08403361 6.28099174,9.28571429 C6.08264463,9.45378151 6,9.68907563 6,9.99159664 C6,10.2773109 6.08264463,10.512605 6.28099174,10.7142857 C6.47933884,10.8991597 6.7107438,11 6.99173554,11 Z M8,7 L8,5 C8,4.44771525 7.55228475,4 7,4 C6.44771525,4 6,4.44771525 6,5 L6,7 C6,7.55228475 6.44771525,8 7,8 C7.55228475,8 8,7.55228475 8,7 Z"
              id="i"
              fill="currentColor"
              fillRule="nonzero"
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
  color: ${({ theme }: { theme: ThemeType }) => theme.yellow};
`;
