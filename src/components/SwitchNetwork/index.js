import React, { useCallback, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useIsInjected, useIsWalletConnectV2 } from 'src/hooks/useWalletHooks';
import { useThemeParams } from 'src/theme';
import { logWalletError } from 'src/utils/log';

import Close from 'js/components/Icons/close';
import { networks } from 'js/constants/ethers';
import { useIntl } from 'js/locals';
import { useWalletOprs, useWalletWeb3 } from 'js/providers/useWallet';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import WalletAni from '../WalletAni';

export default function SwitchNetwork() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { walletChainId } = useWalletWeb3();
  const showModal = useShowModal();
  const { visible, hide, chainId, modalParams } = useModals(
    ModalKeys.switchNetwork
  );

  const { switchNetwork } = useWalletOprs();
  const [hasClicked, setHasClicked] = useState(false);

  const network = networks[chainId];
  const chainName = network?.name;

  const networkName = intl[`network_${chainId}`] || chainName;
  let tips = intl.switch_to_MAINNET.replace('MAINNET', networkName);
  const isInjected = useIsInjected();
  const isWalletConnectV2 = useIsWalletConnectV2();
  const { providerInfo } = useWalletWeb3();

  if (isInjected) {
    if (!isMobile) {
      tips = intl.switch_to_MAINNET_in_metamask
        .replace('MAINNET', networkName)
        .replace('MetaMask', providerInfo?.name || 'MetaMask');
    }
  } else if (isWalletConnectV2) {
    if (hasClicked) {
      tips = intl.switch_network_in_walletconnect;
    }
  }

  useEffect(() => {
    if (visible && Number(chainId) === Number(walletChainId)) {
      hide();
      if (!isEmpty(modalParams)) {
        setTimeout(() => {
          showModal(modalParams);
        }, 200);
      }
    }
  }, [chainId, walletChainId, visible, hide, showModal, modalParams]);

  const doSwitchNetwork = useCallback(() => {
    setHasClicked(true);
    const rpc = network?.rpc_metamask || network?.rpc;
    switchNetwork(
      chainId,
      chainName,
      [rpc],
      [network?.explorer],
      network?.nativeCurrency
    ).catch((error) => {
      logWalletError({
        error,
        log_error: 'switch network error',
      });
    });
  }, [switchNetwork, chainName, chainId, network]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal className={isMobile ? 'isMobile' : ''}>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <WalletAni className="loading-gif" />
        <div className="title">{tips}</div>
        <PrimaryBtn eventName="btn_switch_network" onClick={doSwitchNetwork}>
          {hasClicked && isWalletConnectV2 ? intl.Retry : intl.switch_network}
        </PrimaryBtn>
      </StyledModal>
    </Modal>
  );
}

SwitchNetwork.propTypes = {};

const StyledModal = styled.div`
  ${(props) => props.theme.fontMedium};
  min-height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 30px;

  .modal-title {
    margin-bottom: 20px;
  }
  .loading-gif {
    margin: 0 0 25px;
    width: 50px;
    height: 50px;
  }

  .title {
    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    color: ${(props) => props.theme.modalTitle};
    text-align: center;
    line-height: 22px;
    margin: 0 auto 10px;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;
