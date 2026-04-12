import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfos, useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

import ChainIcon from '../ChainIcon';
import IconArrowDown from '../Icons/arrowDown';
import Close from '../Icons/close';
import BottomModal from '../Modals/bottomModal';

export default function DAChainsSelectM({
  value,
  onChange,
}: {
  value?: Type_DAChains | '';
  onChange: (chainId: Type_DAChains) => void;
}) {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);
  const chainInfoMap = useChainInfosMap();
  const chainInfo = useChainInfos();

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
        onClick={() => {
          setVisible(true);
        }}
      >
        <div className="select-placeholder">{intl.Network}</div>
        <div className="choose-label">{cur?.name ?? intl.Select}</div>
        <IconArrowDown />
      </div>
      {visible && (
        <BottomModal
          opened={visible}
          onClose={() => {
            setVisible(false);
          }}
        >
          <StyledPopup className="modal-wrapper">
            <div className="modal-title">
              {intl.Select_Network}
              <Close onClick={() => setVisible(false)} />
            </div>
            <div className="modal-content">
              <div className="chain-list">
                <div className="chain-list-title">{intl.Mainnet}</div>
                {mainnets.map((option) => {
                  return (
                    <div
                      className={`chain-item `}
                      key={option}
                      onClick={() => {
                        setVisible(false);
                        onChange(option);
                      }}
                    >
                      <ChainIcon chain={option} size={32} />
                      <div className="chain-name">
                        {chainInfoMap[option as Type_DAChains]?.name}
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
                        setVisible(false);
                        onChange(option);
                      }}
                    >
                      <ChainIcon chain={option} size={32} />
                      <div className="chain-name">
                        {chainInfoMap[option as Type_DAChains]?.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </StyledPopup>
        </BottomModal>
      )}
    </StyledChainSelect>
  );
}

const StyledChainSelect = styled.div`
  .chain-inner {
    width: 100%;
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
  }
`;
