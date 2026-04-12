import React from 'react';
import styled from 'styled-components';

import BridgeBtn from 'src/components/BridgeUsdc/BridgeBtn';
import ChainIcon from 'src/components/ChainIcon';
import Close from 'src/components/Icons/close';
import TokenSymbol from 'src/components/Token/symbol';
import { BalanceToken } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import {
  useChainInfosMap,
  useModals,
  useShowModal,
} from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useFungibleUsdc } from 'src/state/swap/balances/hooks';
import { useIsHideAssets } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import DividerLine from '../dividerLine';
import IconRightOutlined from '../Icons/RightOutlined';
import FullModal from '../Modals/fullModal';

export default function FungibleUsdcModal() {
  const { visible, hide } = useModals(ModalKeys.fungibleUsdcModal);
  const token = useFungibleUsdc();

  const intl = useIntl();
  const isHideValue = useIsHideAssets();
  const showMoal = useShowModal();
  const chainInfosMap = useChainInfosMap();

  return (
    <FullModal opened={visible} onClose={hide} className="bg13">
      <StyledAssetModal className="modal-wrapper">
        <div className="modal-title">
          <TokenSymbol token={token} iconSize={20} />
          <Close onClick={hide} />
        </div>
        <div className="balance-top">
          <div className="amount">
            <div className="amount-title">{intl['info.overview']}</div>
            {isHideValue ? '****' : token.totalDisplay}
          </div>
          <BridgeBtn />
        </div>
        <DividerLine />
        <div className="multi-chain-balances">
          {(token.balances || []).map((token: BalanceToken) => {
            const chain = token.chain as Type_DAChains;
            return (
              <div
                className="multi-chain-balance-item"
                key={chain}
                onClick={() => {
                  hide();
                  showMoal({
                    modal: ModalKeys.assetModal,
                    token,
                    fromFungibleUsdc: true,
                  });
                }}
              >
                <ChainIcon size={32} chain={chain as Type_DAChains} />
                {chainInfosMap[chain as Type_DAChains]?.name}
                <div className="balance-item-amount">
                  {token?.totalDisplay || '0'}
                </div>
                <IconRightOutlined />
              </div>
            );
          })}
        </div>
      </StyledAssetModal>
    </FullModal>
  );
}

const StyledAssetModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .token-symbol {
      .token-symbol-inner {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
  .balance-top {
    padding: 0 20px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .amount {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .amount-title {
      font-size: 12px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      line-height: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    font-size: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    line-height: 26px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .multi-chain-balances {
    padding: 20px 0 0;
    width: 100%;
    max-height: ${({ theme }: { theme: ThemeType }) => {
      return theme?.isMobile ? 'auto' : theme.windowHeight - 400;
    }}px;
    overflow-y: auto;

    .multi-chain-balances-title {
      padding: 0 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium}
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      margin-bottom: 20px;
    }
    .multi-chain-balance-item {
      padding: 0 20px;
      height: 55px;
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
      line-height: 55px;
      width: 100%;
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 5px;
      .chain-icon {
        margin-right: 5px;
      }
      .balance-item-amount {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        margin-left: auto;
        font-size: 14px;
        line-height: 18px;
        text-align: right;
        .copy-trade-available {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
        }
      }
    }
  }
`;
