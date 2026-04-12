import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { OrderDirs } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { useSwapOrderDir, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import digit from 'src/utils/digit';
export default function SwapSlippageModal() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.tips_swap_slippage);

  const { minimumReceive } = useSwapTradeInfo();
  const orderDir = useSwapOrderDir();
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const buyToken = orderDir === OrderDirs.BUY ? baseToken : quoteToken;

  const hideModal = () => {
    hide();
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledSlippageModal>
        <div className="modal-title">
          {intl.max_slippage}
          <Close onClick={hideModal} />
        </div>
        <div className="title">{intl.min_receive_tips}</div>
        <div className="info-item">
          <div className="info-item-label">{intl.minimum_receive}</div>
          <div className="info-item-value">
            {`${digit.formatWithMaxLength8(
              minimumReceive,
              buyToken?.decimals
            )} `}
            {buyToken?.symbol}
          </div>
        </div>
        <PrimaryBtn eventName="btn_swap_slippage_confirm" onClick={hideModal}>
          {intl.btn_confirm}
        </PrimaryBtn>
      </StyledSlippageModal>
    </Modal>
  );
}

const StyledSlippageModal = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_fff_50};
    font-size: 14px;
    line-height: 20px;
    width: 100%;
  }

  .info-item {
    width: 100%;
    margin-top: 20px;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    .info-item-label {
      ${(props) => props.theme.fontRegular};
      color: ${(props) => props.theme.t_b7b_60};
      font-size: 14px;
      line-height: 24px;
    }
    .info-item-value {
      ${(props) => props.theme.fontMedium};
      color: ${(props) => props.theme.t_f4f};
      font-size: 14px;
      line-height: 24px;
    }
  }

  .dg-primary {
    width: 100%;
    margin-top: 20px;
  }
`;
