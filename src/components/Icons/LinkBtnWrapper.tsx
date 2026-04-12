import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

const LinkBtnWrapper = React.forwardRef(
  (
    {
      children,
      className,
      cursor = 'pointer',
      onClick,
      onMouseLeave,
    }: {
      children: React.ReactNode;
      className?: string;
      cursor?: 'pointer' | 'default';
      onClick?: (e: any) => void;
      onMouseLeave?: (e: any) => void;
    },
    ref
  ) => {
    return (
      <StyledSpan
        ref={ref as any}
        className={`${className} dg-link-wrapper `}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
      >
        {children}
      </StyledSpan>
    );
  }
);

LinkBtnWrapper.displayName = 'LinkBtnWrapper';

export default LinkBtnWrapper;

const StyledSpan = styled.div<{ cursor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ cursor }: { cursor: string }) => cursor};
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  padding: 0 8px;
  min-height: 26px;
  &:hover {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    border-radius: 6px;
    .dg-icon {
      color: ${({ theme }) => theme.blue};
    }
  }
  .icon-down {
    color: ${({ theme }) => theme.blue};
  }
`;
