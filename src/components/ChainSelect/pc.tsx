import React, { useCallback, useMemo, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfos, useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import ChainIcon from '../ChainIcon';
import IconDown from '../Icons/downIcon';

export default function DAChainsSelectPC({
  value,
  onChange,
}: {
  value?: Type_DAChains | '';
  onChange: (chainId: Type_DAChains) => void;
}) {
  const chainInfo = useChainInfos();

  const intl = useIntl();
  const chainInfoMap = useChainInfosMap();

  const mainnets = useMemo(() => {
    return chainInfo.map((d) => d.chain).filter((d) => !d.includes('_TESTNET'));
  }, [chainInfo]);
  const testnets = useMemo(() => {
    return chainInfo.map((d) => d.chain).filter((d) => d.includes('_TESTNET'));
  }, [chainInfo]);

  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useClickOutside(() => setShowDropdown(false));

  const handleSelect = useCallback(
    (item: any) => {
      setShowDropdown(false);
      onChange(item);
    },
    [onChange]
  );

  const cur = value ? chainInfoMap[value] : undefined;

  return (
    <Wrapper className="chain-select" ref={ref}>
      {showDropdown && (
        <Dropdown>
          <div className="select-Dropdown-top" />
          <div className="select-Dropdown-inner">
            <div className="chain-list">
              <div className="chain-list-title">{intl.Mainnet}</div>
              {mainnets.map((option) => {
                return (
                  <div
                    className={`chain-item `}
                    key={option}
                    onClick={() => {
                      handleSelect(option);
                    }}
                  >
                    <ChainIcon chain={option} size={32} />
                    <div className="chain-name">
                      {chainInfoMap[option]?.name}
                    </div>
                  </div>
                );
              })}
              <div className="chain-list-title">{intl.Testnet}</div>
              {testnets.map((option) => {
                return (
                  <div
                    className={`chain-item `}
                    key={option}
                    onClick={() => {
                      handleSelect(option);
                    }}
                  >
                    <ChainIcon chain={option} size={32} />
                    <div className="chain-name">
                      {chainInfoMap[option]?.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Dropdown>
      )}
      <StyledValue
        className={`choose-network-tpl ${showDropdown ? 'show' : ''} ${
          !value ? 'placeholder' : ''
        }`}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        <div className={`choose-label ${!cur?.name ? 'placeholder' : ''}`}>
          {cur?.name ?? intl.Select_Network}
        </div>
        <IconDown />
      </StyledValue>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ ref: any }>`
  position: relative;
  width: 100%;
  height: 50px;

  :hover {
    cursor: pointer;
  }
  &.show-dropdown {
    .icon-down {
      transform: rotate(180deg);
    }
  }
`;

const StyledValue = styled.div`
  background: none;
  position: absolute;
  width: 100%;
  height: 50px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  background: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.border_transparent};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  font-size: 14px;
  gap: 5px;
  padding: 0 16px;
  .choose-label {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 16px;
    margin-right: auto;
  }
  .placeholder {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
  &.show {
    z-index: 122;
    .icon-down {
      transform: rotate(180deg);
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  box-shadow: ${({ theme }: { theme: ThemeType }) => theme.boxShadow};
  border-radius: 5px;
  top: 41px;
  left: 0;
  width: 100%;
  z-index: 111;

  .chain-list-title {
    padding: 15px 20px;
    display: flex;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    cursor: default;
  }

  .select-Dropdown-inner {
    padding: 10px 0 10px;
    border-radius: 5px;
  }

  :hover {
    cursor: pointer;
  }

  .chain-list {
    overflow: auto;
    max-height: 330px;
    .chain-item {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
      padding: 0 20px;
      min-height: 55px;
      font-size: 14px;
      gap: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
    }
  }
`;
