import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconDown from 'src/components/Icons/downIcon';
import IconWrapper from 'src/components/Icons/IconWrapper';
import ChainsList from 'src/components/SearchChainSelect/list';
import SearchChainIcon from 'src/components/SearchChainSelect/searchChainIcon';
import { useIntl } from 'src/locals';
import { useAllowSwapChains } from 'src/state/application/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { useThemeParams } from 'src/theme';

export default function DAChainsSelectM() {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);
  const chains = useAllowSwapChains();
  const chain = useUserFlag('choose_swap_pair_chain');
  const changeFlag = useChangeFlag('choose_swap_pair_chain');

  const onChange = useCallback(
    (item: any) => {
      changeFlag(item);
      setVisible(false);
    },
    [changeFlag, setVisible]
  );

  const theme = useThemeParams();

  return (
    <StyledChainSelect className="chain-select">
      <div className="chain-select-inner" onClick={() => setVisible(true)}>
        <SearchChainIcon chain={chain} size={18} />
        <IconDown />
      </div>

      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={() => {
          setVisible(false);
        }}
        position="bottom"
        size="auto"
      >
        <StyledPopup>
          <div className="drawer-title">
            {intl.Select_Network}
            <IconWrapper size={40} onClick={() => setVisible(false)}>
              <Close />
            </IconWrapper>
          </div>
          <ChainsList
            chain={chain}
            chains={chains}
            onSelect={onChange}
            maxHeight={theme.windowHeight - 235}
          />
        </StyledPopup>
      </Drawer>
    </StyledChainSelect>
  );
}

const StyledChainSelect = styled.div`
  padding-left: 10px;
  border-left: 1px solid ${({ theme }) => theme.innerBorder};
  cursor: pointer;
  .chain-select-inner {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const StyledPopup = styled.div`
  padding-bottom: 20px;
`;
