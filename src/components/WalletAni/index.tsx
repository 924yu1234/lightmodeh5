import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import { CONNECTION } from 'src/constants/interface/wallet';
import { useWalletWeb3 } from 'src/providers/useWallet';
import { useThemeParams } from 'src/theme';

import Eip6963 from './eip6963.json';
import Ledger from './Ledger.json';
import Metamask from './MetaMask.json';
import Wallet from './Wallet.json';
import WalletConnect from './WalletConnect.json';

export default function WalletAni({
  className,
  type,
}: {
  className?: string;
  type?: 'ledger' | 'metamask' | 'walletConenct';
}) {
  const { isMobile } = useThemeParams();

  const { selectedWallet } = useWalletWeb3();

  let _type = '';
  if (type) {
    _type = type;
  } else if (selectedWallet === CONNECTION.LEDGER_ID) {
    _type = 'ledger';
  } else if (
    // pc metamask
    selectedWallet.includes(CONNECTION.INJECTED_CONNECTOR_TYPE) &&
    selectedWallet.includes('io.metamask') &&
    !isMobile
  ) {
    _type = 'metamask';
  } else if (
    selectedWallet.includes(CONNECTION.INJECTED_CONNECTOR_TYPE) &&
    !isMobile
  ) {
    _type = 'eip6963';
  } else if (selectedWallet === CONNECTION.WALLET_CONNECT_CONNECTOR_ID) {
    _type = 'walletConenct';
  }

  let data: any = Wallet;
  if (_type === 'ledger') {
    data = Ledger;
  } else if (_type === 'metamask') {
    data = Metamask;
  } else if (_type === 'eip6963') {
    data = Eip6963;
  } else if (_type === 'walletConenct') {
    data = WalletConnect;
  }

  return (
    <StyledAni className={className}>
      <Lottie animationData={data} loop />
    </StyledAni>
  );
}

const StyledAni = styled.div`
  & > div {
    height: 50px;
    width: 50px;
  }
`;
