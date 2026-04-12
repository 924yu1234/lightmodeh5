import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import ChainIcon from 'src/components/ChainIcon';
import IconCheckOutlined from 'src/components/Icons/CheckOutlined';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import AllNetworkIcon from './allNetworkIcon';

export default function ChainsList({
  maxHeight,
  chain,
  chains,
  onSelect,
}: {
  maxHeight: number;
  chain: Type_DAChains | 'all';
  chains: Type_DAChains[];
  onSelect: (chain: Type_DAChains | 'all') => void;
}) {
  const intl = useIntl();
  const chainInfosMap = useChainInfosMap();
  const handleSelect = useCallback(
    (item: any) => {
      onSelect(item);
    },
    [onSelect]
  );

  const mainnetChains = useMemo(() => {
    return chains.filter((chain) => !chain.includes('_TESTNET'));
  }, [chains]);
  const testnetChains = useMemo(() => {
    return chains.filter((chain) => chain.includes('_TESTNET'));
  }, [chains]);
  const hasTestnet = useMemo(() => {
    return testnetChains.length > 0;
  }, [testnetChains]);

  return (
    <StyledMenus maxHeight={maxHeight}>
      <div
        className="chain-item all-chain-item"
        onClick={() => {
          handleSelect('all');
        }}
      >
        <AllNetworkIcon size={24} />
        <div className="chain-name">{intl.All_Networks}</div>
        {chain === 'all' && <IconCheckOutlined />}
      </div>
      {hasTestnet && <div className="chain-title">{intl.Mainnet}</div>}
      {mainnetChains.map((option) => {
        const isActive = chain === option;
        return (
          <div
            className="chain-item"
            key={option}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSelect(option);
            }}
          >
            <ChainIcon chain={option} size={24} />
            <div className="chain-name">
              {chainInfosMap[option as Type_DAChains]?.name}
            </div>
            {isActive && <IconCheckOutlined />}
          </div>
        );
      })}
      {hasTestnet && <div className="chain-title">{intl.Testnet}</div>}
      {testnetChains.map((option) => {
        const isActive = chain === option;
        return (
          <div
            className="chain-item"
            key={option}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleSelect(option);
            }}
          >
            <ChainIcon chain={option} size={24} />
            <div className="chain-name">
              {chainInfosMap[option as Type_DAChains]?.name}
            </div>
            {isActive && <IconCheckOutlined />}
          </div>
        );
      })}
    </StyledMenus>
  );
}

const StyledMenus = styled.div<{ maxHeight: number }>`
  overflow: auto;
  max-height: ${({ maxHeight }) => maxHeight}px;
  .chain-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    padding: 0 20px;
    line-height: 40px;
    border-top: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  }
  .chain-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    padding: 0 20px;
    min-height: 44px;
    font-size: 14px;
    width: 100%;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    gap: 8px;
    .icon-check-outlined {
      margin-left: auto;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    @media (hover: hover) {
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.bgMenuHover};
      }
    }
  }
`;
