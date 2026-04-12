import React, { useMemo } from 'react';
import styled from 'styled-components';

import BottomModal from 'src/components/Modals/bottomModal';
import ChainsList from 'src/components/SearchChainSelect/list';
import { useIntl } from 'src/locals';
import { useChains, useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useThemeParams } from 'src/theme';

export default function FilterNetwork() {
  const intl = useIntl();
  const chains = useChains();
  const { windowHeight } = useThemeParams();
  const { visible, chain, hide, setChain } = useModals(ModalKeys.filterNetwork);

  const chainMaxHeight = useMemo(() => {
    return Math.max(windowHeight - 280, 260);
  }, [windowHeight]);

  return (
    <StyledFilterNetworkModal opened={visible} onClose={hide}>
      <div className="modal-wrapper">
        <div className="modal-title">{intl.Select_Network}</div>
        <div className="modal-content">
          <div className="chain-list-shell">
            <ChainsList
              chain={chain}
              chains={chains}
              onSelect={(chain) => {
                setChain(chain);
                hide();
              }}
              maxHeight={chainMaxHeight}
            />
          </div>
        </div>
      </div>
    </StyledFilterNetworkModal>
  );
}

const StyledFilterNetworkModal = styled(BottomModal)``;
