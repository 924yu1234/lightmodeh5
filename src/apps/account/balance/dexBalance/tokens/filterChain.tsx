import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import ChainsList from 'src/components/SearchChainSelect/list';
import SearchChainIcon from 'src/components/SearchChainSelect/searchChainIcon';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChains } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function FilterChain({
  chain,
  setChain,
}: {
  chain: Type_DAChains | 'all';
  setChain: (chain: Type_DAChains | 'all') => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const chains = useChains();
  const maxHeight = 370;
  const intl = useIntl();

  const handleSelect = useCallback(
    (item: any) => {
      setShowDropdown(false);
      setChain(item);
    },
    [setChain]
  );

  return (
    <Menu
      trigger="click"
      opened={showDropdown}
      position="bottom"
      withinPortal={false}
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
          {intl.filter_by_network}
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
  gap: 10px;
  padding-left: 10px;
  cursor: pointer;
  font-size: 14px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  padding: 0 7px;
  min-height: 30px;
  border-radius: 5px;
  &:hover {
    background: ${({ theme }) => theme.bg_white_10};
  }
`;
