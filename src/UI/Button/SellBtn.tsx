import React from 'react';
import styled from 'styled-components';

import BaseButton from './BaseButton';
import { sellButtonStyle } from './buttonStyles';
import { UIButtonProps } from './types';

const StyledSellBtn = styled(BaseButton)`
  &.mantine-Button-root {
    ${sellButtonStyle};
  }
`;

export default function SellBtn(props: UIButtonProps) {
  return <StyledSellBtn {...props} uiVariant="sell" />;
}
