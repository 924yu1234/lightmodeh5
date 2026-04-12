import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import IconDown from 'src/components/Icons/downIcon';
import ChainsList from 'src/components/SearchChainSelect/list';
import SearchChainIcon from 'src/components/SearchChainSelect/searchChainIcon';
import { useAllowSwapChains } from 'src/state/application/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

export default function DAChainsSelectPC({ maxHeight }: { maxHeight: number }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const chains = useAllowSwapChains();
  const chain = useUserFlag('choose_swap_pair_chain');
  const changeFlag = useChangeFlag('choose_swap_pair_chain');

  const handleSelect = useCallback(
    (item: any) => {
      setShowDropdown(false);
      changeFlag(item);
    },
    [changeFlag]
  );

  return (
    <Menu
      trigger="click"
      opened={showDropdown}
      position="bottom-end"
      withinPortal={false}
      width={200}
      onOpen={() => {
        setShowDropdown(true);
      }}
      onClose={() => {
        setShowDropdown(false);
      }}
    >
      <Menu.Target>
        <StyledChainSelect
          className="chain-select-inner"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <SearchChainIcon size={18} chain={chain} />
          <IconDown />
        </StyledChainSelect>
      </Menu.Target>
      <Menu.Dropdown style={{ padding: 0 }}>
        <ChainsList
          chain={chain}
          chains={chains}
          onSelect={handleSelect}
          maxHeight={maxHeight}
        />
      </Menu.Dropdown>
    </Menu>
  );
}

const StyledChainSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 10px;
  border-left: 1px solid ${({ theme }) => theme.innerBorder};
  cursor: pointer;
`;
