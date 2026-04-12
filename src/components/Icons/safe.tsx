import React from 'react';
import styled from 'styled-components';

export default function IconSafe({
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
      className={`${className} dg-icon icon-safe`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 50} height={size || 50} viewBox="0 0 50 50">
        <g
          id="popup_safe"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.8"
        >
          <g transform="translate(4, 0)" fillRule="nonzero">
            <g>
              <path
                d="M42.4792486,5.55224135 C42.4272795,5.02637926 42.1126514,4.56160916 41.6452744,4.31701147 C36.15872,1.44925285 29.7434986,0 22.5829663,0 C22.216369,0 21.8589597,0.012298821 21.4984495,0.0183908055 C21.1379967,0.0122413669 20.7836309,0 20.4170337,0 C13.256444,0 6.84122258,1.45528738 1.3547256,4.31695402 C0.887291223,4.56155171 0.572663057,5.02632181 0.520751412,5.55827588 C0.447477894,6.34712646 -1.29380141,25.0459195 2.02986397,35.0312069 C2.094007,35.3124713 4.60511747,44.4417241 21.5014931,50 C38.39494,44.4417241 40.9059931,35.3124713 40.9701361,35.0312069 C44.2938014,25.0459195 42.5525221,6.3471264 42.4792486,5.55224135 Z"
                fill="#00A0FF"
              ></path>
              <path
                d="M35.3237705,18.751003 L20.0416691,34.0457784 C19.5653491,34.5224874 18.9410054,34.7608663 18.3167593,34.7608663 C17.6924643,34.7608663 17.0681694,34.5224874 16.5918494,34.0457784 L16.5904833,34.0443624 L9.04103262,26.4888448 C8.08839253,25.5354268 8.08834375,23.9895772 9.04103262,23.0362081 C9.99367271,22.0827901 11.5382123,22.0827413 12.4909012,23.0362081 L18.3167593,28.8667745 L31.8739508,15.2984151 C32.8265343,14.3449972 34.3711305,14.3449483 35.3238193,15.2984151 C36.2764594,16.2517843 36.2764594,17.797585 35.3237705,18.751003 L35.3237705,18.751003 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </g>
        </g>
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
  vertical-align: -0.125em;
`;
