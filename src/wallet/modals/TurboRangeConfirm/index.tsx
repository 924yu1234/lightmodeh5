/**
 * TurboRange Confirm Modal (dispatcher)
 * Migrated from dg-wallet/src/modals/TurboRange/index.tsx
 *
 * Dispatches to deposit/withdraw/claim views based on order.type.
 * On confirm: shows SigningProgress modal → mock sign → resolve.
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

import ClaimView from './claim';
import DepositView from './deposit';
import WithdrawView from './withdraw';

const TYPE_TITLES: Record<string, string> = {
  deposit: 'Deposit',
  dualDeposit: 'Deposit',
  withdraw: 'Withdraw',
  claim: 'Claim Rewards',
  increaseInvestment: 'Increase Investment',
  dualIncreaseInvestment: 'Increase Investment',
};

export default function TurboRangeConfirmModal() {
  const { visible, hide, ...options } = useModals(
    ModalKeys.WALLET_TURBO_RANGE_CONFIRM
  ) as any;
  const intl = useIntl();
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const [loading, setLoading] = useState(false);

  const order = options?.order;
  const type = order?.type || 'deposit';
  const resPromise = options?.resPromise;

  const handleConfirm = useCallback(() => {
    setLoading(true);
    hide();

    // Show signing progress → mock sign → resolve
    showModal({
      modal: ModalKeys.WALLET_SIGNING_PROGRESS,
      resPromise,
      mockResult: {
        order,
        intent_id: `mock-turborange-${Date.now()}`,
      },
    });
    setLoading(false);
  }, [hide, showModal, resPromise, order]);

  const handleClose = useCallback(() => {
    resPromise?.reject?.({ code: 100000000 }); // UserCancel
    hide();
  }, [hide, resPromise]);

  if (!visible || !order) return null;

  const title =
    (intl as any).turboRange?.[`confirm_${type}`] ||
    TYPE_TITLES[type] ||
    'Confirm';

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
        {isMobile && <div className="mobile-title">{title}</div>}

        <div className="modal-content">
          {(type === 'deposit' || type === 'dualDeposit') && (
            <DepositView order={order} />
          )}
          {type === 'withdraw' && <WithdrawView order={order} />}
          {type === 'claim' && <ClaimView order={order} />}
          {(type === 'increaseInvestment' ||
            type === 'dualIncreaseInvestment') && <DepositView order={order} />}

          <PrimaryBtn
            fullWidth
            loading={loading}
            onClick={handleConfirm}
            eventName="btn_wallet_turbo_range_confirm"
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
  .mobile-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;
