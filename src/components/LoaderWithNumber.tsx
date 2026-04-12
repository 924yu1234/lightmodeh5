import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ThemeType } from 'src/theme';

export default function LoaderWithNumber({
  size = 36,
  children,
  ...rest
}: {
  size?: number;
  stroke?: string;
  children: React.ReactNode;
}) {
  return (
    <StyledLoader size={size}>
      <StyledSVG
        viewBox="0 0 36 36"
        fill="none"
        size={size}
        className="loader"
        {...rest}
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fillRule="nonzero">
            <path d="M18,0 C8.05885616,0 0,8.05885616 0,18 C0,27.9411438 8.05885616,36 18,36 C27.9411438,36 36,27.9411438 36,18 C36,8.05885616 27.9411438,0 18,0 Z"></path>
            <path
              d="M18,0 C27.9411438,0 36,8.05885616 36,18 C36,27.9411438 27.9411438,36 18,36 C8.05885616,36 0,27.9411438 0,18 C0,8.05885616 8.05885616,0 18,0 Z M18,2 C9.1634277,2 2,9.1634277 2,18 C2,26.8365723 9.1634277,34 18,34 C26.8365723,34 34,26.8365723 34,18 C34,9.1634277 26.8365723,2 18,2 Z"
              fill="#00A0FF"
              opacity="0.2"
            ></path>
            <path
              d="M18,0 L18,2 C13.5827205,2 9.58353661,3.79004095 6.68826466,6.68430645 L5.27405438,5.27008804 C8.53125458,2.01389638 13.0304368,0 18,0 Z"
              fill="#00A0FF"
              opacity="0.98063151"
            ></path>
          </g>
        </g>
      </StyledSVG>
      <div className="loader-number">{children}</div>
    </StyledLoader>
  );
}

const StyledLoader = styled.div<{ size: number }>`
  position: relative;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
  .loader-number {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue1};
    position: absolute;
    top: 0;
    left: 0;
    font-size: ${({ size }: { size: number }) => size * 0.55}px;
    width: ${({ size }: { size: number }) => size}px;
    height: ${({ size }: { size: number }) => size}px;
    line-height: ${({ size }: { size: number }) => size}px;
    text-align: center;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSVG = styled.svg<{ size: number }>`
  animation: 2s ${rotate} linear infinite;
  height: ${(props: any) => props.size}px;
  width: ${(props: any) => props.size}px;
`;
