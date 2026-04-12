import React from 'react';
import styled from 'styled-components';

import BaseButton from './BaseButton';
import { ghostButtonStyle } from './buttonStyles';
import { UIButtonProps } from './types';

const StyledGhostBtn = styled(BaseButton)`
  &.mantine-Button-root {
    ${ghostButtonStyle};
  }
`;

export default function GhostBtn(props: UIButtonProps) {
  const { className, ...rest } = props;
  return (
    <StyledGhostBtn
      className={`${className} dg-ghost`}
      uiVariant="ghost"
      {...rest}
    />
  );
}
