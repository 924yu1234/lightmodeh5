import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function IconRefresh(props: {
  className?: string;
  size?: number;
  onClick?: (e: any) => void;
}) {
  const { size, className, onClick, ...rest } = props;
  return (
    <StyledSpan
      className={`${className} dg-icon icon-refresh`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 18} height={size || 18} viewBox="0 0 18 18">
        <g
          id="icon-refresh-off"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g
            id="icon"
            transform="translate(1, 0)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <g id="refresh">
              <path
                d="M8.06702188,17.9990639 C3.72342211,17.9373238 0.0662273253,14.2764972 0.000855422444,9.93289746 C-0.0645164804,5.36775958 3.62536426,1.63429757 8.17234328,1.62340225 L8.17234328,0 L10.5402589,2.36791559 C10.7690605,2.59671725 10.7690605,2.96715804 10.5402589,3.19959147 L8.17234328,5.56750706 L8.17234328,3.94773658 C4.53330735,3.9586319 1.66783895,7.29623071 2.45956532,11.073274 C2.92443219,13.2850234 4.71489597,15.0754872 6.92664535,15.540354 C10.5148365,16.2957627 13.7107962,13.7389949 14.0267604,10.3614466 C14.0558145,10.052746 14.2955115,9.8094172 14.6042122,9.8094172 L15.7663793,9.8094172 C16.1005024,9.8094172 16.3801489,10.0890637 16.3583582,10.4231867 C16.0387623,14.6977828 12.4324123,18.0644358 8.06702188,17.9990639 L8.06702188,17.9990639 Z"
                id="路径"
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
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
`;
