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

export default function PrimaryBtn(props: UIButtonProps) {
  const { className, ...rest } = props;
  return (
    <StyledPrimaryBtn
      className={`${className} dg-primary`}
      uiVariant="primary"
      {...rest}
    />
  );
}
