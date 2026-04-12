import React, { useCallback, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import ChainIcon from '../ChainIcon';
import IconCheckOutlined from '../Icons/CheckOutlined';
import IconDown from '../Icons/downIcon';

export default function FungibleNetworkSelectPC({
  value,
  options = [],
  onChange,
  showErr,
}: {
  value?: Type_DAChains;
  onChange: (chainId: Type_DAChains) => void;
  options: { valid: boolean; chain: Type_DAChains }[];
  showErr: boolean;
}) {
  const intl = useIntl();

  const [showDropdown, setShowDropdown] = useState(false);
  const chainInfoMap = useChainInfosMap();

  const ref = useClickOutside(() => setShowDropdown(false));

  const handleSelect = useCallback(
    (item: Type_DAChains) => {
      setShowDropdown(false);
      onChange(item);
    },
    [onChange]
  );

  return (
    <Wrapper className="network-select" ref={ref}>
      {showDropdown && (
        <Dropdown>
          <div className="select-Dropdown-top" />
          <div className="select-Dropdown-inner">
            <div className="list-title">
              <div className="list-title-name">{intl.Select_Network}</div>
            </div>
            <div className="network-list">
              {options.map((option) => {
                const _chain = option.chain;
                const isActive = _chain === value;
                return (
                  <div
                    className={`network-item ${
                      option.valid ? 'valid' : 'invalid'
                    }`}
                    key={_chain}
                    onClick={() => {
                      if (!option.valid) return;
                      handleSelect(_chain);
                    }}
                  >
                    <ChainIcon chain={_chain} size={32} />
                    <div className="network-name">
                      {chainInfoMap[_chain]?.name || _chain}
                    </div>
                    {isActive && <IconCheckOutlined />}
                  </div>
                );
              })}
            </div>
          </div>
        </Dropdown>
      )}
      <StyledValue
        className={`choose-network-tpl ${showDropdown ? 'show' : ''} ${
          showErr ? 'error-border' : ''
        }`}
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        {value ? (
          <div className="value">
            {chainInfoMap[value as Type_DAChains]?.name}
          </div>
        ) : (
          <div className="placeholder">{intl.Select_Network}</div>
        )}
        <IconDown size={18} />
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
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  font-size: 14px;
  padding: 0 16px;
  .choose-label {
    font-size: 14px;

    line-height: 16px;
    margin-right: auto;
  }
  .value {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  &:hover {
    border-color: ${({ theme }) => theme.t_b7b_50};
  }
  &.error-border {
    border-color: ${({ theme }: { theme: ThemeType }) => theme.red};
  }
  &.show {
    z-index: 122;
    .icon-down {
      transform: rotate(180deg);
    }
  }
  .icon-down {
    margin-left: auto;
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

  .select-Dropdown-inner {
    padding: 10px 0 10px;
    border-radius: 5px;
  }

  :hover {
    cursor: pointer;
  }

  .list-title {
    padding: 0 15px;
    display: flex;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    line-height: 36px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    .list-title-name {
      margin-right: auto;
    }
  }

  .network-list {
    height: 168px;
    overflow: auto;
    .network-item {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 10px;
      font-size: 14px;
      overflow: hidden;
      padding: 0 15px;
      min-height: 50px;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      .arrival-gas {
        margin-left: auto;
      }
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
      .icon-check-outlined {
        margin-left: auto;
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
      &.invalid {
        opacity: 0.3;
      }
    }
  }
`;
