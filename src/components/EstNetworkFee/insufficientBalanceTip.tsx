import React, { useMemo } from 'react';
import styled from 'styled-components';

import { GhostBtn, Modal, PrimaryBtn } from 'src/UI';

import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import {
  useCommonAddFunds,
  useModals,
  useShowModal,
} from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';
import { multiply } from 'src/utils/numberUtils';

import Close from '../Icons/close';
import TokenIcon from '../Token/icon';

export default function InsufficientGasPayTokenBalanceTips() {
  const intl = useIntl();
  const { visible, hide, tryResp, onSelectPayGasToken } = useModals(
    ModalKeys.insufficientGasPayTokenBalanceTips
  );
  const showModal = useShowModal();
  const commonAddFunds = useCommonAddFunds();
  const { canSwitchPayToken, gasNeedAmount, gasNeedToken } = tryResp as any;

  const payTokenNeededValue = formatUsd(
    multiply(gasNeedAmount, gasNeedToken?.price) as any
  );

  const closeModal = () => {
    hide();
  };

  const onConfirm = () => {
    commonAddFunds({ token: gasNeedToken });
  };

  const tips = useMemo(() => {
    if (gasNeedToken?.symbol === 'USDC' || gasNeedToken?.symbol === 'USDT') {
      return intl.insufficient_network_fee_tips
        .replace('$FEE', payTokenNeededValue)
        .replace(`$XXX${intl.separator_comma}`, '');
    }
    return intl.insufficient_network_fee_tips
      .replace('$FEE', payTokenNeededValue)
      .replace('$XXX', `${gasNeedToken?.symbol || ''}`);
  }, [payTokenNeededValue, gasNeedToken, intl]);

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

        <div className="title">{intl.insufficient_network_fee}</div>
        <div className="desc">{tips}</div>
        <div className="item">
          <div className="item-amount">
            <TokenIcon token={gasNeedToken} size={16} />
            <span>{gasNeedAmount}</span>
            <span>{gasNeedToken?.symbol}</span>
          </div>
          <div className="item-value">{payTokenNeededValue}</div>
        </div>

        <div className="btns">
          <PrimaryBtn onClick={onConfirm}>
            {intl.deposit_ETH.replace('ETH', gasNeedToken?.symbol || '')}
          </PrimaryBtn>
          {canSwitchPayToken && (
            <GhostBtn
              eventName="btn_insufficient_fungible_usdc_confirm"
              onClick={() => {
                showModal({
                  modal: ModalKeys.chooseGasToken,
                  payGasToken: gasNeedToken,
                  onSelectPayGasToken: (gasToken: Token) => {
                    closeModal();
                    return onSelectPayGasToken(gasToken).then((resp: any) => {
                      return resp;
                    });
                  },
                });
              }}
            >
              {intl.change_fee_token}
            </GhostBtn>
          )}
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
    line-height: 16px;
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    justify-content: space-between;
    .item-amount {
      display: flex;
      align-items: center;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      gap: 5px;
    }
    .item-value {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      display: flex;
      align-items: center;
    }
  }

  .btns {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    .dg-primary,
    .dg-ghost {
      height: 46px;
    }
  }
  .dg-primary {
    width: 100%;
  }
`;
