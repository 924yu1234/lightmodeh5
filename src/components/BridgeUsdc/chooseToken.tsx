import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import {
  useFungibleUsdc,
  useIsLoadingDABalance,
} from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import BottomModal from '../Modals/bottomModal';
import Spin from '../Spin';
import TokenItem from './tokenItem';

export default function BridgeUsdcChooseTokenModal() {
  const intl = useIntl();
  const { visible, hide, token, onSelectToken } = useModals(
    ModalKeys.bridgeUsdcChooseToken
  );
  const fungibleUsdc = useFungibleUsdc();
  const isLoading = useIsLoadingDABalance();

  const balances = fungibleUsdc?.balances || [];

  const hideModal = () => {
    hide();
  };

  return (
    <BottomModal onClose={hideModal} opened={visible} zIndex={201}>
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.Select_Token}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content" style={{ padding: '0 0 30px 0' }}>
          <Spin spinning={balances.length === 0 || isLoading}>
            <div className="token-list">
              {balances.map((item: any) => {
                return (
                  <TokenItem
                    className={`${item.id === token?.id ? 'selected' : ''}`}
                    key={item.id}
                    token={item}
                    onClick={() => {
                      if (item.id === token?.id) {
                        return;
                      }
                      onSelectToken(item);
                      hideModal();
                    }}
                  />
                );
              })}
            </div>
          </Spin>
        </div>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  width: 100%;

  .modal-content {
    .token-list {
      margin-bottom: 15px;
      min-height: 300px;
    }
    .total {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 15px;
      border-top: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
      .total-title {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
      .total-value {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        line-height: 20px;
      }
    }
    .account-rent {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      line-height: 20px;
    }
    .dg-primary {
      margin-top: 20px;
      width: 100%;
    }
  }
`;
