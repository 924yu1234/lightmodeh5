import React from 'react';
import styled from 'styled-components';

export default function IconX({
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
      className={`${className} dg-icon icon-x`}
      onClick={onClick}
      {...rest}
    >
      <svg width={size || 20} height={size || 20} viewBox="0 0 20 20">
        <g
          id="资产类_意图交易Swap-MVP"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.6"
        >
          <g
            id="资产类_意图交易-Swap-MVP-#F-弹窗+Toast"
            transform="translate(-97, -291.5)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <g id="编组-8" transform="translate(70, 113)">
              <g id="编组-3" transform="translate(25, 37)">
                <g id="编组-7" transform="translate(0, 84.5)">
                  <g id="Twitter" transform="translate(2, 56)">
                    <g id="X" transform="translate(0, 1)">
                      <path
                        d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M7.57328,4 L4,4 L8.68492,10.81821 L4,16.2637 L5.05866,16.2637 L9.15491,11.50218 L12.42672,16.2637 L16,16.2637 L11.14137,9.19284 L15.6089,4 L14.5503,4 L10.67137,8.50887 L7.57328,4 Z M7.06615,4.796944 L10.11412,9.15685 L10.5888,9.83579 L14.5508,15.503 L12.92476,15.503 L9.69165,10.87854 L9.21697,10.19934 L5.44011,4.796944 L7.06615,4.796944 Z"
                        id="Oval-2"
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
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  color: ${({ theme }) => theme.t_b7b};
`;
