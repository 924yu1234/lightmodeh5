import React from 'react';
import styled from 'styled-components';

export default function IconChosen({
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
      className={`${className} dg-icon icon-chosen`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 10} height={size || 10} viewBox="0 0 10 10">
        <g
          id="icon-chosen"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            transform="translate(4.9831, 4.4831) rotate(45) translate(-4.9831, -4.4831)translate(2.4831, 0.6431)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <path d="M4.23056078,6.14111811 C4.52048823,6.14111811 4.9764032,6.49214484 4.9764032,6.91709439 C4.9764032,7.31967817 4.54457745,7.64351161 4.27585634,7.67717226 L4.23056078,7.67999656 L0.524960096,7.67999656 C0.235032641,7.67999656 3.74166765e-14,7.33550688 3.74166765e-14,6.91055733 C3.74166765e-14,6.50797355 0.210943423,6.17760306 0.47966453,6.14394241 L0.524960096,6.14111811 L4.23056078,6.14111811 Z"></path>
            <path
              d="M7.31856134,2.84352144 C7.6084888,2.84352144 7.84352144,3.18801111 7.84352144,3.61296066 C7.84352144,4.01554445 7.63257802,4.34591494 7.36385691,4.37957559 L7.31856134,4.38239989 L1.14256021,4.38239989 C0.852632754,4.38239989 0.617600113,4.03791021 0.617600113,3.61296066 C0.617600113,3.21037688 0.828543536,2.88000639 1.09726464,2.84634574 L1.14256021,2.84352144 L7.31856134,2.84352144 Z"
              transform="translate(4.2306, 3.613) rotate(-90) translate(-4.2306, -3.613)"
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
  color: ${({ theme }) => theme.t_b7b};
`;
