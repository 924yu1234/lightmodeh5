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

  background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};

  &::before,
  &::after {
    display: none !important;
  }

  &[data-animate] {
    background: linear-gradient(
      90deg,
      ${({ theme }: { theme: ThemeType }) => theme.bg_white_10} 25%,
      ${({ theme }: { theme: ThemeType }) => theme.bg_white_20} 50%,
      ${({ theme }: { theme: ThemeType }) => theme.bg_white_10} 75%
    );
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s infinite linear;
  }

  ${({ $tokenIcon, theme }: { $tokenIcon: boolean; theme: ThemeType }) =>
    $tokenIcon &&
    css`
      background: ${theme.bg_white_30};

      &[data-animate] {
        background: linear-gradient(
          90deg,
          ${theme.bg_white_30} 25%,
          ${theme.bg_white_40} 50%,
          ${theme.bg_white_30} 75%
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
