import React from 'react';
import styled from 'styled-components';

const IconWrapper2 = React.forwardRef(
  (
    {
      children,
      className,
      size = 32,
      width,
      cursor = 'pointer',
      onClick,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onPointerDown,
      onPointerUp,
    }: {
      children: React.ReactElement | null;
      className?: string;
      size?: number;
      width?: number;
      cursor?: 'pointer' | 'default';
      onClick?: (e: any) => void;
      onMouseLeave?: (e: any) => void;
      onMouseDown?: (e: any) => void;
      onMouseUp?: (e: any) => void;
      onTouchStart?: (e: any) => void;
      onTouchEnd?: (e: any) => void;
      onPointerDown?: (e: any) => void;
      onPointerUp?: (e: any) => void;
    },
    ref
  ) => {
    return (
      <StyledSpan
        ref={ref as any}
        size={size}
        width={width}
        className={`${className} dg-icon-wrapper2`}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        cursor={cursor}
      >
        {children}
      </StyledSpan>
    );
  }
);

IconWrapper2.displayName = 'IconWrapper2';

export default IconWrapper2;

const StyledSpan = styled.div<{ size: number; cursor: string; width?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size, width }: { size: number; width?: number }) =>
    width || size}px;
  min-width: ${({ size, width }: { size: number; width?: number }) =>
    width || size}px;
  height: ${({ size }: { size: number }) => size}px;
  cursor: ${({ cursor }: { cursor: string }) => cursor};
  .dg-icon {
    cursor: ${({ cursor }: { cursor: string }) => cursor};
  }
  background: ${({ theme }) => theme.bg_white_10};
  border-radius: 50%;
  @media (hover: hover) {
    &:hover,
    &:active,
    &.active {
      .dg-icon {
        color: ${({ theme }) => theme.blue};
      }
    }
  }
`;
