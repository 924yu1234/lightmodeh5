import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { Type_DAChains } from 'src/da';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType, useThemeParams } from 'src/theme';
import { formatAddress } from 'src/utils/format';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import ChainIcon from '../ChainIcon';
import IconBack from '../Icons/back';
import BtnArrow from '../Icons/btnArrow';
import Tag from '../Tag';
import RouteChart from './RouteChart';

export default function UsdcSuppliedChartModal() {
  const { visible, hide, onBack, tokens, chain, recipent, amount } = useModals(
    ModalKeys.usdc_supplied_chart_modal
  );
  const { isMobile } = useThemeParams();

  const chainInfosMap = useChainInfosMap();
  const intl = useIntl();
  const { DAs } = useDexAccount();

  const hideModal = () => {
    hide();
  };

  // 构建路由数据
  const routeSources = tokens
    .filter((token: any) => token.chain !== chain)
    .map((token: any) => ({
      chain: token.chain as Type_DAChains,
      address: DAs[token.chain]?.address,
      amount: token.amount_display,
    }));

  const routeTarget = {
    chain: chain as Type_DAChains,
    address: DAs[chain]?.address,
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledUsdcSuppliedChartModal>
        <div className="modal-title">
          {isMobile && (
            <IconBack
              onClick={() => {
                hide();
                if (onBack) onBack();
              }}
            />
          )}
          {intl.Details}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content">
          <div className="title-container">
            <div className="item-title">{intl.Funds}</div>
          </div>
          <div className="supplied-items">
            {tokens.map((d: any) => {
              const _chain = d.chain as Type_DAChains;
              return (
                <div key={d.chain} className="supplied-item">
                  <div className="supplied-chain">
                    <ChainIcon chain={_chain} size={16} />
                    {chainInfosMap[_chain]?.name}
                  </div>
                  <div className="supplied-amount">{d.amount_display} USDC</div>
                </div>
              );
            })}
          </div>
          <div className="title-container">
            <div className="item-title">{intl.Route}</div>
          </div>
          <RouteChart sources={routeSources} target={routeTarget} />
          <div className="item-result">
            <div className="send-from">
              <Tag>{intl.me}</Tag>
              <div className="send-address">
                <ChainIcon chain={chain} size={16} />
                {formatAddress(DAs[chain]?.address)}
              </div>
            </div>
            <div className="send-arrow-container">
              <div className="text">{amount} USDC</div>
              <div className="send-arrow">
                <div className="send-arrow-line"></div>
                <BtnArrow size={10} />
              </div>
            </div>
            <div className="send-to">
              <Tag>{intl.Recipient}</Tag>
              <div className="send-address">
                <ChainIcon chain={chain} size={16} />
                {formatAddress(recipent)}
              </div>
            </div>
          </div>
        </div>
      </StyledUsdcSuppliedChartModal>
    </Modal>
  );
}

const StyledUsdcSuppliedChartModal = styled.div`
  width: 100%;
  padding: 0 0 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-content {
    width: 100%;
    max-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight - theme.modalTop * 2 - 100}px;
    overflow: auto;
    height: 100%;
  }
  .modal-title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 27px;
    width: 100%;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    position: relative;
    .icon-back {
      position: absolute;
      left: 15px;
    }
  }

  .title-container {
    padding: 0 16px 10px;
    width: 100%;
  }

  .item-title {
    width: 100%;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
  }

  .supplied-items {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 40px;
    padding: 0 16px;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;

    .supplied-item {
      width: 100%;
      display: flex;
      align-items: center;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      line-height: 20px;
      .supplied-chain {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 110px;
      }
      .supplied-amount {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        margin-left: auto;
      }
    }
  }
  .item-result {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding: 0 10px;
    gap: 5px;
    .tag {
      transform: scale(0.8);
    }

    .send-from,
    .send-to {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 5px;
      border: 1px solid ${({ theme }) => theme.border_b7b_20};
      border-radius: 8px;
      padding: 8px;
      .send-address {
        display: flex;
        align-items: center;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 12px;
        line-height: 20px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        gap: 5px;
      }
    }
    .send-arrow-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      flex-direction: column;
      width: 100%;
      .text {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 12px;
        line-height: 20px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
    .send-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      width: 100%;
      .send-arrow-line {
        width: 100%;
        height: 1px;
        background: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        margin-right: -5px;
      }
    }
  }
`;
