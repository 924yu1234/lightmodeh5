import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSVG = styled.svg<{ size: number; stroke: string }>`
  animation: 2s ${rotate} linear infinite;
  height: ${(props: any) => props.size}px;
  width: ${(props: any) => props.size}px;
  path {
    stroke: ${(props: any) => props.stroke || props.theme.blue1};
  }
`;

/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
export default function Loader({
  size = 16,
  stroke = '',
  ...rest
}: {
  size?: number;
  stroke?: string;
}) {
  return (
    <StyledSVG
      viewBox="0 0 24 24"
      fill="none"
      size={size}
      stroke={stroke}
      className="loader"
      {...rest}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSVG>
  );
}
