import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function IconRightOutlined({
  className,
  size = 12,
  onClick,
  disabled,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
  disabled?: boolean;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-right-outlined`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="right"
        width={size || 14}
        height={size || 14}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.span<{ disabled?: boolean }>`
  text-rendering: optimizelegibility;

  -moz-osx-font-smoothing: grayscale;
  color: inherit;
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
`;
