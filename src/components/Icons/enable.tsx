import React from 'react';
import styled from 'styled-components';

export default function IconEnable({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-enable`}
      onClick={onClick}
      {...rest}
    >
      <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
        <title>icon Authorization Mode</title>
        <g
          id="icon-Authorization-Mode"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g transform="translate(-3, -3)" fill="#000">
            <path
              d="M18,30.7279221 C10.9996429,30.7279221 5.27207794,25.0003571 5.27207794,18 C5.27207794,10.9996429 10.9996429,5.27207794 18,5.27207794 C25.0003571,5.27207794 30.7279221,10.9996429 30.7279221,18 C30.7279221,18.4772971 30.409724,18.7954951 29.9324269,18.7954951 C29.4551299,18.7954951 29.1369318,18.4772971 29.1369318,18 C29.1369318,11.795138 24.204862,6.8630682 18,6.8630682 C11.795138,6.8630682 6.8630682,11.795138 6.8630682,18 C6.8630682,24.204862 11.795138,29.1369318 18,29.1369318 C18.4772971,29.1369318 18.7954951,29.4551299 18.7954951,29.9324269 C18.7954951,30.409724 18.4772971,30.7279221 18,30.7279221 Z"
              id="路径"
              fillRule="nonzero"
              transform="translate(18, 18) scale(-1, 1) rotate(45) translate(-18, -18)"
            ></path>
            <circle id="椭圆形" cx="18" cy="18" r="3"></circle>
            <path
              d="M17.2543014,19.5 L18.7456986,19.5 C19.1921789,19.5 19.5845649,19.7959773 19.7072225,20.2252789 L22.135794,28.7252789 C22.2875183,29.2563139 21.9800262,29.8097997 21.4489911,29.9615239 C21.3596497,29.9870501 21.2671865,30 21.17427,30 L14.82573,30 C14.2734452,30 13.82573,29.5522847 13.82573,29 C13.82573,28.9070835 13.8386799,28.8146203 13.864206,28.7252789 L16.2927775,20.2252789 C16.4154351,19.7959773 16.8078211,19.5 17.2543014,19.5 Z"
              id="矩形"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  text-rendering: optimizelegibility;

  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
`;
