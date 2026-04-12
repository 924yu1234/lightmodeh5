import React from 'react';
import styled from 'styled-components';

export default function IconTelegram({
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
      className={`${className} dg-icon icon-telegram`}
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
            transform="translate(-97, -326.5)"
            fill="#FFFFFF"
            fillRule="nonzero"
          >
            <g id="编组-8" transform="translate(70, 113)">
              <g id="编组-3" transform="translate(25, 37)">
                <g id="编组-7" transform="translate(0, 84.5)">
                  <g id="telegram" transform="translate(2, 92)">
                    <path
                      d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M15.9580474,6.05230851 C16.1531804,5.20918969 15.6329742,4.8200024 15.1127123,5.0794791 L3.60264802,9.55466096 C2.82228298,9.87893742 2.82228298,10.33298 3.47254079,10.5275459 L6.39886794,11.5004308 L13.1618832,7.21975932 C13.4870121,7.02519344 13.8120853,7.15490403 13.5520379,7.34952544 L8.02456813,12.3436052 L7.82949079,15.391915 C8.15461969,15.391915 8.28467126,15.2622044 8.47980427,15.0676386 L9.91037145,13.6407666 L12.9017244,15.8459576 C13.4870121,16.1702341 13.8771111,15.9756682 14.0072183,15.3270597 Z"
                      id="Oval-2"
                    ></path>
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
