import React from 'react';
import styled from 'styled-components';

import { Button, Modal, PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useSwapTypeInput } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import { minus } from 'src/utils/numberUtils';

import Close from '../Icons/close';

export default function InsufficientGasPayTokenBalanceTipsForSwap() {
  const intl = useIntl();
  const { visible, hide, tryResp, balance } = useModals(
    ModalKeys.insufficientGasPayTokenBalanceTipsForSwap
  );
  const { gasNeedToken } = tryResp as any;
  const onUserInput = useSwapTypeInput();
  const gasAmount = gasNeedToken?.amount;

  let maxAmount = minus(balance, gasAmount);
  if (Number(maxAmount) < 0) {
    maxAmount = 0;
  }

  const closeModal = () => {
    hide();
  };

  const onConfirm = () => {
    onUserInput({
      fields: [
        { field: 'isMaxModel', val: true },
        { field: 'isTryingMax', val: Date.now() },
      ],
    });
    closeModal();
  };

  const onEditAmount = () => {
    closeModal();
  };

  return (
    <Modal
      title={null}
      onClose={closeModal}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledInsufficientBalanceModal>
        <div className="modal-title">
          <Close onClick={closeModal} />
        </div>

        <div className="title">{intl.available_amount}</div>
        <div className="item">
          <div className="item-label">{intl.current_balance}</div>
          <div className="item-value">
            {balance}
            <span>{gasNeedToken?.symbol}</span>
          </div>
        </div>
        <div className="item">
          <div className="item-label">{intl.reserved_for_network_fee}</div>
          <div className="item-value">
            {gasAmount}
            <span>{gasNeedToken?.symbol}</span>
          </div>
        </div>
        <div className="item">
          <div className="item-label">{intl.maximum_available}</div>
          <div className="item-value">
            {maxAmount}
            <span>{gasNeedToken?.symbol}</span>
          </div>
        </div>

        <div className="btns">
          <PrimaryBtn onClick={onConfirm}>{intl.use_max}</PrimaryBtn>
          <Button uiVariant="ghost" onClick={onEditAmount}>
            {intl.edit_amount}
          </Button>
        </div>
      </StyledInsufficientBalanceModal>
    </Modal>
  );
}

const StyledInsufficientBalanceModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
    text-align: center;
  }

  .desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 30px;
    b {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  .item {
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .item-label {
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      white-space: nowrap;
      margin-right: 10px;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .item-value {
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      justify-content: flex-end;
      white-space: nowrap;
      text-align: right;
      gap: 5px;
    }
  }

  .btns {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-direction: column;
    .dg-primary,
    .dg-ghost {
      width: 100%;
      height: 46px;
    }
  }
`;
