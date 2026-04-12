import React from 'react';
import styled from 'styled-components';

import Apy from 'src/components/Earn/apy';
import ApyTitle from 'src/components/Earn/ApyTitle';
import EarnDescription from 'src/components/Earn/description';
import MyDeposit from 'src/components/Earn/myDeposit';
import Tvl from 'src/components/Earn/tvl';
import VaultSymbol from 'src/components/Earn/vault';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useVault } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

export default function EarnDetailTop({ id }: { id: number }) {
  const vault = useVault(id);
  const intl = useIntl();
  const showModal = useShowModal();
  const chainInfosMap = useChainInfosMap();
  return (
    <StyledTop>
      <div className="top">
        <VaultSymbol vault={vault} />
        <div
          className="more"
          onClick={() =>
            showModal({
              modal: ModalKeys.earnMoreInfo,
              vault,
            })
          }
        >
          {intl.more}
          <IconRightOutlined size={12} />
        </div>
      </div>
      <div className="info">
        <div className="info-item">
          <div className="info-item-title">{intl.Network}</div>
          <div className="info-item-value">
            {chainInfosMap[vault.chain as Type_DAChains]?.name}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">
            <ApyTitle vault={vault} />
          </div>
          <div className="info-item-value apy">
            <Apy vault={vault} />
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.TVL}</div>
          <div className="info-item-value">
            <Tvl vault={vault} />
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.My_Deposit}</div>
          <div className="info-item-value">
            <MyDeposit vault={vault} />
          </div>
        </div>
      </div>
      <EarnDescription vault={vault} />
    </StyledTop>
  );
}

const StyledTop = styled.div`
  width: 100%;
  margin-top: 10px;
  .top {
    padding: 0 20px;
    min-height: 34px;

    display: flex;
    align-items: center;
    gap: 10px;
    .top-text {
      .top-name {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        font-size: 16px;
        line-height: 18px;
        margin-bottom: 2px;
      }
      .top-market {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
        font-size: 12px;
        line-height: 18px;
      }
    }
    .more {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      cursor: pointer;
      margin-left: auto;
      display: flex;
      align-items: center;
      font-size: 12px;
      gap: 2px;
      .icon-right-outlined {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 20px 10px;
    margin-top: 20px;
    padding: 0 20px;
    .info-item {
      .info-item-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 3px;
      }
      .info-item-value {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        font-size: 16px;
        line-height: 18px;
        min-height: 18px;
        display: flex;
        &.apy {
          color: ${({ theme }: { theme: ThemeType }) => theme.green};
        }
      }
    }
  }
`;
