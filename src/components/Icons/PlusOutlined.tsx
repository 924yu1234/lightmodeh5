import React from 'react';
import styled from 'styled-components';

export default function PlusOutlined({
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
      className={`${className} dg-icon icon-plus-outlined`}
      onClick={onClick}
      {...rest}
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="plus"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <defs>
          <style></style>
        </defs>
        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
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
