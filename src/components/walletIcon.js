import React from 'react';
import styled from 'styled-components';

import { useSelectdWalletIcon } from 'js/hooks/useWalletHooks';

export default function WalletIcon() {
  const icon = useSelectdWalletIcon();
  if (!icon) return null;
  return (
    <StyledWalletIcon src={icon} alt="wallet_icon" className="wallet-icon" />
  );
}

const StyledWalletIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
