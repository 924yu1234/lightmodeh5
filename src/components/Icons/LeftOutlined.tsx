import React from 'react';
import styled from 'styled-components';

export default function IconLeftOutlined({
  className,
  onClick,
  disabled,
  size,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
  disabled?: boolean;
}) {
  return (
    <StyledSpan
      className={`${className} dg-icon icon-left-outlined`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="left"
        width={size || '14'}
        height={size || '14'}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
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
  color: ${(props) => props.theme.t_b7b};
`;
