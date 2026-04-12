import React, { useCallback, useMemo, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfos, useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import ChainIcon from '../ChainIcon';
import IconArrowDown from '../Icons/arrowDown';

export default function DAChainsSelectWeb({
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
        <div className="select-placeholder">{intl.Network}</div>
        <div className="choose-label">{cur?.name ?? intl.Select}</div>
        <IconArrowDown />
      </StyledValue>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ ref: any }>`
  position: relative;
  width: 250px;

  :hover {
    cursor: pointer;
  }
  &.show-dropdown {
    .icon-arrows {
      transform: rotate(180deg);
    }
  }
`;

const StyledValue = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  font-size: 14px;
  display: flex;
  align-items: center;
  .select-placeholder {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-right: 15px;
  }
  .choose-label {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 16px;
    margin-right: 5px;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  box-shadow: ${({ theme }: { theme: ThemeType }) => theme.boxShadow};
  border-radius: 5px;
  top: 31px;
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
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      .chain-icon {
        margin-right: 8px;
      }
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
    }
  }
`;
