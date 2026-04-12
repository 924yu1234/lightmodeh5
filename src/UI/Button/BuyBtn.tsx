import React from 'react';
import styled from 'styled-components';

import BaseButton from './BaseButton';
import { buyButtonStyle } from './buttonStyles';
import { UIButtonProps } from './types';

const StyledBuyBtn = styled(BaseButton)`
  &.mantine-Button-root {
    ${buyButtonStyle};
  }
`;

export default function BuyBtn(props: UIButtonProps) {
  return <StyledBuyBtn {...props} uiVariant="buy" />;
}
