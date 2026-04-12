import React from 'react';
import styled from 'styled-components';

import Apy from 'src/components/Earn/apy';
import ApyTitle from 'src/components/Earn/ApyTitle';
import MyDeposit from 'src/components/Earn/myDeposit';
import Tvl from 'src/components/Earn/tvl';
import VaultSymbol from 'src/components/Earn/vault';
import { Vault } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function Item({ item }: { item: Vault }) {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const chainInfosMap = useChainInfosMap();
  return (
    <StyledItem onClick={() => navigate(`/simple-earn/${item.id}`)}>
      <div className="item-inner">
        <div className="item-header">
          <VaultSymbol vault={item} />
          <div className="item-apy">
            <div className="item-apy-title">
              <ApyTitle vault={item} />
            </div>
            <div className="item-apy-value">
              <Apy vault={item} />
            </div>
          </div>
        </div>
        <div className="item-info">
          <div className="item-info-item">
            <div className="item-info-title">{intl.Network}</div>
            <div className="item-info-value">
              {chainInfosMap[item.chain as Type_DAChains]?.name}
            </div>
          </div>
          <div className="item-info-item">
            <div className="item-info-title">{intl.TVL}</div>
            <div className="item-info-value">
              <Tvl vault={item} />
            </div>
          </div>
          <div className="item-info-item">
            <div className="item-info-title">{intl.My_Deposit}</div>
            <div className="item-info-value">
              <MyDeposit vault={item} />
            </div>
          </div>
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  .item-inner {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
    border-radius: 8px;
    min-height: 105px;
    padding: 15px 10px 10px;
  }
  .item-header {
    display: flex;
    align-items: center;
    gap: 10px;
    .item-name {
      .item-name-title {
        font-size: 14px;
        line-height: 18px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
      .item-name-market {
        font-size: 12px;
        line-height: 18px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      }
    }
    .item-apy {
      margin-left: auto;
      .item-apy-title {
        font-size: 12px;
        line-height: 18px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      }
      .item-apy-value {
        font-size: 14px;
        line-height: 18px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }
  .item-info {
    margin-top: 10px;
    gap: 2px 10px;
    display: flex;
    .item-info-item {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }
    .item-info-title {
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    .item-info-value {
      font-size: 12px;
      line-height: 18px;
      display: flex;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
`;
