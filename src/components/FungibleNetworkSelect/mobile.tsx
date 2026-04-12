import React, { useState } from 'react';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import ChainIcon from '../ChainIcon';
import IconCheckOutlined from '../Icons/CheckOutlined';
import Close from '../Icons/close';
import IconDown from '../Icons/downIcon';
import IconWrapper from '../Icons/IconWrapper';

export default function FungibleNetworkSelectM({
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
  const [visible, setVisible] = useState<boolean>(false);
  const chainInfoMap = useChainInfosMap();
  const chainInfo = value ? chainInfoMap[value] : undefined;

  return (
    <StyledFungibleNetworkSelectM
      className={`network-select ${showErr ? 'error-border' : ''}`}
    >
      <div
        className="network-inner"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="network-select-label">
          {value ? (
            <span className="name">{chainInfo?.name}</span>
          ) : (
            <span className="placeholder">{intl.Select_Network}</span>
          )}
        </div>
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
          {options.map((option: { valid: boolean; chain: Type_DAChains }) => {
            const _chain = option.chain;
            const isActive = _chain === value;

            return (
              <div
                className={`network-item ${_chain === value ? 'active' : ''} ${
                  option.valid ? 'valid' : 'invalid'
                }`}
                key={_chain}
                onClick={() => {
                  if (!option.valid) return;
                  setVisible(false);
                  onChange(_chain);
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
        </StyledPopup>
      </Drawer>
    </StyledFungibleNetworkSelectM>
  );
}

const StyledFungibleNetworkSelectM = styled.div`
  &.error-border .network-inner {
    border-color: ${({ theme }: { theme: ThemeType }) => theme.red};
  }
  .network-inner {
    width: 100%;
    height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    background: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
    border: 1px solid ${({ theme }) => theme.border_transparent};
    border-radius: 5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  .network-select-label {
    white-space: nowrap;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    letter-spacing: 0;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    .name {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
  .icon-down {
    margin-left: auto;
  }
`;

const StyledPopup = styled.div`
  padding-bottom: 20px;

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

  .network-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    padding: 0 15px;
    min-height: 50px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    gap: 10px;
    .icon-check-outlined {
      margin-left: auto;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    &.invalid {
      opacity: 0.3;
    }
  }
`;
