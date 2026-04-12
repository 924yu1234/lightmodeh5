import React from 'react';
import styled, { css } from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { FUNGIBLE_USDC_ID } from 'src/da';
import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useSwapQuoteTokens } from 'src/state/swap/pair/hooks';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';
import IconRightOutlined from '../Icons/RightOutlined';
import TokenSymbol from '../Token/symbol';

export default function SwapQuoteTokenBalance() {
  const intl = useIntl();
  const { hide, visible } = useModals(ModalKeys.swapQuoteTokenBalance);

  const quoteTokens = useSwapQuoteTokens();
  const showModal = useShowModal();

  return (
    <Modal opened={visible} onClose={hide}>
      <StyledSwapTokenBalance>
        <div className="modal-title">
          {intl.available_balance}
          <Close onClick={hide} />
        </div>
        <div className="token-list">
          {quoteTokens.map((token: any) => (
            <div
              className="token-item"
              key={token.id}
              onClick={() => {
                if (token.id === FUNGIBLE_USDC_ID) {
                  showModal({
                    modal: ModalKeys.fungibleUsdcModal,
                  });
                } else {
                  showModal({
                    modal: ModalKeys.assetModal,
                    token,
                  });
                }
              }}
            >
              <TokenSymbol token={token} hideCode />
              <div className="balance">{token.availableDisplay}</div>
              <IconRightOutlined />
            </div>
          ))}
        </div>
        <PrimaryBtn
          eventName="btn_swap_quote_token_balance_modal_close"
          onClick={hide}
        >
          {intl.Close}
        </PrimaryBtn>
      </StyledSwapTokenBalance>
    </Modal>
  );
}

const StyledSwapTokenBalance = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.isMobile && MobileStyle};
  padding: 0 20px 30px;
  .modal-title {
    margin-bottom: 20px;
  }
  .token-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 48px;
    &:not(:last-child) {
      border-bottom: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.border_01};
    }
    .balance {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      font-size: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
      margin-right: 4px;
      margin-left: auto;
    }
  }

  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

const MobileStyle = css`
  .address {
    border-top: 4px solid #030303;
  }
`;
