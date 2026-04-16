import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Drawer } from 'src/UI';

import ChainIcon from 'src/components/ChainIcon';
import Close from 'src/components/Icons/close';
import IconDown from 'src/components/Icons/downIcon';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfos, useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function ChainSelectMobile({
  value,
  onChange,
}: {
  value?: Type_DAChains | '';
  onChange: (chainId: Type_DAChains) => void;
}) {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);
  const chainInfo = useChainInfos();
  const chainInfoMap = useChainInfosMap();

  const mainnets = useMemo(() => {
    return chainInfo.map((d) => d.chain).filter((d) => !d.includes('_TESTNET'));
  }, [chainInfo]);

  const testnets = useMemo(() => {
    return chainInfo.map((d) => d.chain).filter((d) => d.includes('_TESTNET'));
  }, [chainInfo]);

  const cur = value ? chainInfoMap[value] : undefined;

  return (
    <StyledChainSelect className="chain-select">
      <div
        className={`chain-inner ${!value ? 'placeholder' : ''}`}
        onClick={() => setVisible(true)}
      >
        <div className="select-placeholder">{intl.Network}</div>
        {value && <ChainIcon chain={value} size={28} />}
        <div className="choose-label">{cur?.name ?? intl.Select}</div>
        <IconDown />
      </div>
      <Drawer
        opened={visible}
        withCloseButton={false}
        onClose={() => setVisible(false)}
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
          <div className="chain-list-title">{intl.Mainnet}</div>
          {mainnets.map((option) => (
            <div
              className="chain-item"
              key={option}
              onClick={() => {
                setVisible(false);
                onChange(option);
              }}
            >
              <ChainIcon chain={option} size={32} />
              <div className="chain-name">{chainInfoMap[option]?.name}</div>
            </div>
          ))}
          <div className="chain-list-title">{intl.Testnet}</div>
          {testnets.map((option) => (
            <div
              className="chain-item"
              key={option}
              onClick={() => {
                setVisible(false);
                onChange(option);
              }}
            >
              <ChainIcon chain={option} size={32} />
              <div className="chain-name">{chainInfoMap[option]?.name}</div>
            </div>
          ))}
        </StyledPopup>
      </Drawer>
    </StyledChainSelect>
  );
}

const StyledChainSelect = styled.div`
  .chain-inner {
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
    gap: 5px;
    .select-placeholder {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      margin-right: auto;
    }
    .choose-label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 16px;
    }
  }
`;

const StyledPopup = styled.div`
  padding-bottom: 20px;

  .chain-list-title {
    padding: 15px 20px;
    display: flex;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    cursor: default;
  }

  .chain-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-size: 14px;
    overflow: hidden;
    padding: 0 20px;
    min-height: 55px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
`;
