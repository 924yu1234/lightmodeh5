import React from 'react';
import styled from 'styled-components';

export default function FileImageOutlined({
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
      className={`${className} dg-icon icon-file-image-outlined`}
      onClick={onClick}
      {...rest}
    >
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <title>icon upload</title>
        <g
          id="icon-upload"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="upload-file" transform="translate(2, 2)">
            <path
              d="M9,0 L9,1 L2,1 C1.48716416,1 1.06449284,1.38604019 1.00672773,1.88337887 L1,2 L1,14 C1,14.5522847 1.44771525,15 2,15 L14,15 C14.5522847,15 15,14.5522847 15,14 L15,8 L16,8 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 L9,0 Z"
              id="矩形-4"
              fill="#00A0FF"
              transform="translate(8, 8) scale(1, -1) translate(-8, -8)"
            ></path>
            <g id="编组" transform="translate(2.8385, 6.2385)"></g>
            <path
              d="M12.5,10 C12.7761424,10 13,10.2238576 13,10.5 L13,12 L14.5,12 C14.7761424,12 15,12.2238576 15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L13,13 L13,14.5 C13,14.7761424 12.7761424,15 12.5,15 C12.2238576,15 12,14.7761424 12,14.5 L12,13 L10.5,13 C10.2238576,13 10,12.7761424 10,12.5 C10,12.2238576 10.2238576,12 10.5,12 L12,12 L12,10.5 C12,10.2238576 12.2238576,10 12.5,10 Z"
              id="矩形-2"
              fill="#00A0FF"
            ></path>
            <circle id="椭圆形" fill="#00A0FF" cx="4" cy="4" r="1"></circle>
            <polyline
              id="路径"
              stroke="#00A0FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="1 9.85 4 7.4 7.67695526 8.625 15 4.95"
            ></polyline>
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
