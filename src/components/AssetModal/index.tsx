import React, { useMemo } from 'react';
import styled from 'styled-components';

import Close from 'src/components/Icons/close';
import TokenSymbol from 'src/components/Token/symbol';
import { useTokenBalance } from 'src/hooks/useAssets';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType, useThemeParams } from 'src/theme';

import IconBack from '../Icons/back';
import FullModal from '../Modals/fullModal';
import SwapTokenBalance from './swapTokenBalance';

export default function AssetModal() {
  const {
    visible,
    token: token_,
    hide,
    fromFungibleUsdc,
  } = useModals(ModalKeys.assetModal);
  const showModal = useShowModal();
  const { isMobile, modalTop, windowHeight } = useThemeParams();
  const token = useTokenBalance({ token: token_ });

  const contentHeight = useMemo(() => {
    if (isMobile) {
      return windowHeight;
    }
    const pcHeight = windowHeight - modalTop - 100;
    if (pcHeight > 580) {
      return 580;
    }
    return pcHeight;
  }, [isMobile, modalTop, windowHeight]);

  return (
    <FullModal opened={visible} onClose={hide} className="bg13">
      <StyledAssetModal className="modal-wrapper">
        <div className="modal-title">
          {fromFungibleUsdc && (
            <IconBack
              onClick={() => {
                showModal({
                  modal: ModalKeys.fungibleUsdcModal,
                });
                hide();
              }}
            />
          )}
          <TokenSymbol token={token} hideCode iconSize={20} />
          <Close onClick={hide} />
        </div>
        <SwapTokenBalance contentHeight={contentHeight} token={token} />
      </StyledAssetModal>
    </FullModal>
  );
}

const StyledAssetModal = styled.div`
  padding: 0 20px 30px;
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .token-symbol {
      .token-symbol-inner {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
`;
