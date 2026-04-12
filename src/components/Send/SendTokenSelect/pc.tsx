import React, { useCallback, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import IconDown from 'src/components/Icons/downIcon';
import TokenSymbol from 'src/components/Token/symbol';
import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import TokenItem from './item';

export default function SendTokenSelectPC({
  value,
  tokens,
  onChange,
}: {
  value: Token | undefined;
  tokens: Token[];
  onChange: (token: Token) => void;
}) {
  const intl = useIntl();
  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useClickOutside(() => setShowDropdown(false));

  const handleSelect = useCallback(
    (item: any) => {
      setShowDropdown(false);
      onChange(item);
    },
    [onChange]
  );

  return (
    <Wrapper className="chain-select" ref={ref}>
      {showDropdown && (
        <Dropdown>
          <div className="select-Dropdown-top" />
          <div className="select-Dropdown-inner">
            <div className="list-title">
              <div className="list-title-symbol">{intl.token}</div>
              <div className="list-title-balance">{intl.available}</div>
            </div>
            <div className="token-list">
              {tokens.map((option) => {
                return (
                  <TokenItem
                    key={option.id}
                    token={option}
                    onClick={() => {
                      handleSelect(option);
                    }}
                  />
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
        {!!value && <TokenSymbol token={value} />}
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
  padding: 0 16px;
  .choose-label {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 16px;
    margin-right: auto;
  }
  .chain-icon {
    margin-right: 8px;
  }
  &.placeholder {
    color: ${(props) => props.theme.t_abaeba};
  }
  &:hover {
    border-color: ${({ theme }) => theme.t_b7b_50};
  }
  &.show {
    z-index: 122;
    .icon-down {
      transform: rotate(180deg);
    }
  }
  .token-symbol {
    margin-right: auto;
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
    .list-title-balance {
      margin-left: auto;
    }
  }

  .token-list {
    overflow: auto;
    max-height: 270px;
  }
`;
