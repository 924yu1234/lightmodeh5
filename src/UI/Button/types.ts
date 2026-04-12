import { ButtonProps } from '@mantine/core';
import type { MouseEvent } from 'react';

export type UIButtonVariant = 'primary' | 'ghost' | 'buy' | 'sell';
export type UIButtonSize = 'default' | 'small';

export interface UIButtonProps extends ButtonProps {
  uiVariant?: UIButtonVariant;
  uiSize?: UIButtonSize;
  eventName?: string;
  eventData?: any;
  reportEventName?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
