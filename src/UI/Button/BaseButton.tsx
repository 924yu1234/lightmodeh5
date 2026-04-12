import React from 'react';
import { Button } from '@mantine/core';
import styled from 'styled-components';

import { useGaEvent } from 'src/hooks/useGaEvent';
import { ThemeType } from 'src/theme';

import {
  buyButtonStyle,
  commonButtonStyle,
  ghostButtonStyle,
  primaryButtonStyle,
  sellButtonStyle,
  smallButtonStyle,
} from './buttonStyles';
import { UIButtonProps } from './types';

function resolveVariant(
  className: string | undefined,
  uiVariant: 'primary' | 'ghost' | 'buy' | 'sell' | undefined
) {
  if (uiVariant) return uiVariant;
  if (!className) return 'primary';
  if (className.includes('dg-ghost')) return 'ghost';
  if (className.includes('dg-buy') || className.includes('dg-swap-buy'))
    return 'buy';
  if (className.includes('dg-sell') || className.includes('dg-swap-sell'))
    return 'sell';
  return 'primary';
}

function resolveSize(
  className: string | undefined,
  uiSize: 'default' | 'small' | undefined
) {
  if (uiSize) return uiSize;
  if (className?.includes('small')) return 'small';
  return undefined;
}

const StyledUIButton = styled(Button as any)<{
  $uiSize?: 'default' | 'small';
  $uiVariant?: 'primary' | 'ghost' | 'buy' | 'sell';
  $isFullWidth?: boolean;
}>`
  & {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    ${commonButtonStyle};
    ${({ $uiSize }: { $uiSize?: 'default' | 'small' }) =>
      $uiSize === 'small' ? smallButtonStyle : ''}
  }

  &.mantine-Button-root[data-ui-variant='primary'] {
    ${primaryButtonStyle};
    ${({ $uiSize }: { $uiSize?: 'default' | 'small' }) =>
      $uiSize === 'small' ? smallButtonStyle : ''}
  }

  &.mantine-Button-root[data-ui-variant='ghost'] {
    ${ghostButtonStyle};
    ${({ $uiSize }: { $uiSize?: 'default' | 'small' }) =>
      $uiSize === 'small' ? smallButtonStyle : ''}
  }

  &.mantine-Button-root[data-ui-variant='buy'] {
    ${buyButtonStyle};
  }

  &.mantine-Button-root[data-ui-variant='sell'] {
    ${sellButtonStyle};
  }
`;

const BaseButton = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  (
    {
      uiSize,
      uiVariant,
      eventName,
      eventData,
      reportEventName = 'web_button_click',
      className,
      onClick,
      fullWidth,
      ...props
    },
    ref
  ) => {
    const gaEvent = useGaEvent();

    const resolvedVariant = resolveVariant(className, uiVariant);
    const resolvedSize = resolveSize(className, uiSize);

    return (
      <StyledUIButton
        $uiSize={resolvedSize}
        $uiVariant={resolvedVariant}
        $isFullWidth={!!fullWidth}
        className={className}
        ref={ref}
        fullWidth={fullWidth}
        data-ui-variant={resolvedVariant}
        {...props}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          if (eventName) {
            gaEvent?.(reportEventName, {
              buttonName: eventName,
              ...eventData,
            });
          }
        }}
      />
    );
  }
);

BaseButton.displayName = 'BaseButton';

export default BaseButton;
