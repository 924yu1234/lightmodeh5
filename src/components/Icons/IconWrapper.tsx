import React from 'react';
import styled from 'styled-components';

import { FloatingPosition, Tooltip as MTooltip } from 'src/UI';

import { useThemeParams } from 'src/theme';

const IconWrapper = React.forwardRef(
  (
    {
      children,
      className,
      size = 24,
      width,
      cursor = 'pointer',
      title = '',
      titlePosition = 'top',
      titleDisabled = false,
      showHoverBG = false,
      hideHoverBg = false,
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
      title?: string;
      titlePosition?: FloatingPosition;
      titleDisabled?: boolean;
      showHoverBG?: boolean;
      hideHoverBg?: boolean;
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
    const { isMobile } = useThemeParams();
    const showTitle = (!!title || showHoverBG) && !isMobile;
    const ele = (
      <StyledSpan
        ref={ref as any}
        size={size}
        width={width}
        className={`${className} dg-icon-wrapper ${
          showTitle && !hideHoverBg ? 'show-title' : ''
        }`}
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
    if (showTitle) {
      return (
        <MTooltip
          label={title}
          position={titlePosition}
          arrowSize={7}
          arrowOffset={4.5}
          withinPortal
          disabled={titleDisabled || !title}
        >
          {ele}
        </MTooltip>
      );
    }
    return ele;
  }
);

IconWrapper.displayName = 'IconWrapper';

export default IconWrapper;

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
  &.show-title {
    &:hover {
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 5px;
      .dg-icon {
        color: ${({ theme }) => theme.blue};
      }
    }
  }
`;
