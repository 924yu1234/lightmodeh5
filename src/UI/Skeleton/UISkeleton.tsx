import React from 'react';
import { Skeleton as MantineSkeleton, SkeletonProps } from '@mantine/core';
import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

export interface UISkeletonProps extends SkeletonProps {
  tokenIcon?: boolean;
}

const StyledSkeleton = styled(MantineSkeleton)<{ $tokenIcon: boolean }>`
  @keyframes skeleton-shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  background: ${({ theme }: { theme: ThemeType }) => theme.skeletonBase};

  &::before,
  &::after {
    display: none !important;
  }

  &[data-animate] {
    background: linear-gradient(
      90deg,
      ${({ theme }: { theme: ThemeType }) => theme.skeletonBase} 25%,
      ${({ theme }: { theme: ThemeType }) => theme.skeletonHighlight} 50%,
      ${({ theme }: { theme: ThemeType }) => theme.skeletonBase} 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite linear;
  }

  ${({ $tokenIcon, theme }: { $tokenIcon: boolean; theme: ThemeType }) =>
    $tokenIcon &&
    css`
      background: ${theme.skeletonTokenMid};

      &[data-animate] {
        background: linear-gradient(
          90deg,
          ${theme.skeletonTokenMid} 25%,
          ${theme.skeletonTokenHighlight} 50%,
          ${theme.skeletonTokenMid} 75%
        );
        background-size: 200% 100%;
      }
    `}
`;

const UISkeleton = React.forwardRef<HTMLDivElement, UISkeletonProps>(
  ({ tokenIcon, className, ...props }, ref) => {
    const hasTokenIconClass = Boolean(className?.includes('token-icon'));
    return (
      <StyledSkeleton
        {...props}
        ref={ref}
        className={className}
        $tokenIcon={Boolean(tokenIcon || hasTokenIconClass)}
      />
    );
  }
);

UISkeleton.displayName = 'UISkeleton';

export default UISkeleton;
