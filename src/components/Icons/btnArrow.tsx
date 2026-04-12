import React from 'react';
import styled from 'styled-components';

export default function BtnArrow({
  className,
  size = 15,
  ...rest
}: {
  className?: string;
  size?: number;
}) {
  return (
    <StyledSpan className={`${className} dg-icon icon-btnArrow`} {...rest}>
      <svg
        width={size || '15px'}
        height={size ? size * 2 : '30px'}
        viewBox="0 0 15 30"
        fill="none"
        style={{ width: size, height: size }}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M-2.84217094e-14,0 L0.779918558,-3.5048808e-16 C2.12350151,1.28780787e-16 2.68148642,0.07602665 3.26260614,0.247314162 C3.84372585,0.418601675 4.35146861,0.685150049 4.82247331,1.0661935 C5.293478,1.44723695 5.6729355,1.86333696 6.43595765,2.96923585 L12.9606877,12.4259624 C13.5600825,13.2947053 13.7162577,13.6505555 13.8207634,14.0724618 C13.9252691,14.4943682 13.9291751,14.9114129 13.8325902,15.3352027 C13.7360054,15.7589925 13.5865228,16.1177054 13.0035051,16.9975228 L6.40031223,26.9622351 C5.6674307,28.0682082 5.28454537,28.5021162 4.81060164,28.8954307 C4.33665791,29.2887451 3.82240109,29.5648874 3.23273916,29.7427012 C2.64307723,29.9205149 2.06987614,30 0.743116248,30 L-2.84217094e-14,30 L-2.84217094e-14,30 L-2.84217094e-14,0 Z"
            fill="currentColor"
          ></path>
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
