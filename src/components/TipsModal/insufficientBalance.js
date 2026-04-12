import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useCommonAddFunds, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function InsufficientBalanceModal() {
  const { visible, hide, type, baseBalanceErr, quoteBalanceErr } = useModals(
    ModalKeys.err_insufficientBalance
  );
  const intl = useIntl();
  const refreshSwapBalance = useRefreshSwapBalance();
  const commonAddFunds = useCommonAddFunds();

  const { baseToken: swapBaseToken, quoteToken: swapQuoteToken } =
    useCurrentSwapPair();

  let message;
  let depositToken;
  if (type === 'swap') {
    if (baseBalanceErr) {
      message = intl.err_insufficient_balance_TOKEN1.replace(
        'TOKEN1',
        swapBaseToken?.symbol
      );
      depositToken = swapBaseToken;
    } else if (quoteBalanceErr) {
      message = intl.err_insufficient_balance_TOKEN1.replace(
        'TOKEN1',
        swapQuoteToken?.symbol
      );
      depositToken = swapQuoteToken;
    }
  }

  useEffect(() => {
    refreshSwapBalance();
  }, [refreshSwapBalance]);

  const doDeposit = useCallback(() => {
    commonAddFunds({ token: depositToken });
    hide();
  }, [depositToken, commonAddFunds, hide]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledInsufficientBalance>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{message}</div>
        <div className="desc">{intl.please_add_funds_before_ordering}</div>
        <PrimaryBtn
          eventName="btn_insufficient_balance_deposit"
          onClick={doDeposit}
        >
          {intl.deposit_ETH.replace('ETH', depositToken?.symbol ?? '')}
        </PrimaryBtn>
      </StyledInsufficientBalance>
    </Modal>
  );
}

const StyledInsufficientBalance = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontMedium};
    color: ${(props) => props.theme.modalTitle};
    font-size: 16px;
    line-height: 22px;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalDesc};
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;
