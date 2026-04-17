import React from 'react';
import styled from 'styled-components';

import BaseButton from './BaseButton';
import { primaryButtonStyle } from './buttonStyles';
import { UIButtonProps } from './types';

const StyledPrimaryBtn = styled(BaseButton)`
  &.mantine-Button-root {
    ${primaryButtonStyle};
  }
`;

export type PrimaryBtnProps = UIButtonProps & {
  /** Disabled CTA with copy (Turbo Range “Enter amount to continue”). Adds `btn-with-tips` for light outline style. */
  withTips?: boolean;
};

export default function PrimaryBtn({
  withTips,
  className,
  ...rest
}: PrimaryBtnProps) {
  return (
    <StyledPrimaryBtn
      className={`${className ?? ''} dg-primary${
        withTips ? ' btn-with-tips' : ''
      }`}
      uiVariant="primary"
      {...rest}
    />
  );
}
