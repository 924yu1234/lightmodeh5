import React from 'react';
import styled from 'styled-components';

export default function IconAccount({
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
      className={`${className} dg-icon icon-account`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size || 20}
        height={size || 20}
        viewBox="0 0 20 20"
        aria-hidden="true"
        data-icon="shrink"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-713, -18)" fill="currentColor">
            <g id="编组-12" transform="translate(599, 0)">
              <g id="normal" transform="translate(109, 0)">
                <g id="iconaccount_on" transform="translate(5, 18)">
                  <circle
                    stroke="currentColor"
                    strokeWidth="1.4"
                    opacity="0.2"
                    cx="10"
                    cy="10"
                    r="9.3"
                  ></circle>
                  <g transform="translate(4.3501, 3.6027)" fillRule="nonzero">
                    <path d="M5.5,7 C3.57022828,7 2,5.42977172 2,3.5 C2,1.57022828 3.57022828,0 5.5,0 C7.42977172,0 9,1.57022828 9,3.5 C9,5.42977172 7.42977172,7 5.5,7 Z M9.39537005,12.8136364 L1.73718823,12.8136364 C1.18218823,12.8136364 0.657188231,12.5586364 0.33127914,12.1318182 C0.0244609579,11.7295455 -0.0750844966,11.2236364 0.0571882307,10.7422727 C0.500370049,9.12772727 2.05218823,8 3.83037005,8 L7.30082459,8 C9.07900641,8 10.6308246,9.12772727 11.0740064,10.7409091 C11.2062791,11.2222727 11.1067337,11.7295455 10.7999155,12.1304545 C10.4740064,12.5586364 9.94900641,12.8136364 9.39537005,12.8136364 Z"></path>
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
