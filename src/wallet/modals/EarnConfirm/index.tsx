/**
 * Earn Confirm Modal
 * Migrated from dg-wallet/src/modals/CreateEarnOrderModal/index.tsx
 */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import BottomModal from 'src/components/Modals/bottomModal';
import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType, useThemeParams } from 'src/theme';
import EstNetworkFee from 'src/wallet/components/EstNetworkFee';

const TYPE_TITLES: Record<string, string> = {
  deposit: 'Deposit',
  withdraw: 'Withdraw',
  claim: 'Claim',
};

export default function EarnConfirmModal() {
  const { visible, hide, ...options } = useModals(
    ModalKeys.WALLET_EARN_CONFIRM
  ) as any;
  const intl = useIntl();
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const [loading, setLoading] = useState(false);

  const order = options?.order;
  const resPromise = options?.resPromise;
  const type = order?.type || 'deposit';

  const handleConfirm = useCallback(() => {
    setLoading(true);
    hide();
    showModal({
      modal: ModalKeys.WALLET_SIGNING_PROGRESS,
      resPromise,
      mockResult: { order, intent_id: `mock-earn-${Date.now()}` },
    });
    setLoading(false);
  }, [hide, showModal, resPromise, order]);

  const handleClose = useCallback(() => {
    resPromise?.reject?.({ code: 100000000 });
    hide();
  }, [hide, resPromise]);

  if (!visible || !order) return null;

  const title = TYPE_TITLES[type] || 'Confirm';

  return (
    <StyledBottomModal
      opened={visible}
      onClose={handleClose}
      noHeader={isMobile}
    >
      <div className="modal-wrapper">
        {!isMobile && (
          <div className="modal-title">
            <span>{title}</span>
            <Close onClick={handleClose} />
          </div>
        )}
        <div className="modal-content">
          {order.amount && (
            <div className="item">
              <div className="label">{intl.amount}</div>
              <div className="value">{order.amount} USDC</div>
            </div>
          )}
          {order.tryResp && (
            <div className="item">
              <div className="label">{intl.est_network_fee}</div>
              <div className="value">
                <EstNetworkFee tryResp={order.tryResp} />
              </div>
            </div>
          )}
          <PrimaryBtn
            fullWidth
            loading={loading}
            onClick={handleConfirm}
            eventName="btn_wallet_earn_confirm"
          >
            {intl.confirm}
          </PrimaryBtn>
        </div>
      </div>
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(BottomModal)`
  .modal-wrapper {
    padding: 20px;
  }
  .modal-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
`;
