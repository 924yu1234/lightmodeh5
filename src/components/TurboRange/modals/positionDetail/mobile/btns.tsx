import React from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useHasProcessingActions } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { checkPermission } from 'src/state/turboRange/utils';
import message from 'src/utils/message';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function Btns({
  position,
  loading,
}: {
  position: TurboRangePosition;
  loading: boolean;
}) {
  const intl = useIntl();
  const showModal = useShowModal();
  const product = useTurboRangeProduct(position.poolAddress);

  const {
    hasProcessingClaim,
    hasProcessingWithdraw,
    hasLocalProcessingWithdraw,
    hasProcessingIncrease,
  } = useHasProcessingActions({
    positionAddress: position.positionAddress,
  });

  const disabledBtn =
    hasProcessingClaim || hasProcessingWithdraw || hasProcessingIncrease;

  return (
    <StyledBtns className="btns">
      <GhostBtn
        eventName="turbo_range_detail_withdraw"
        onClick={() => {
          if (!checkPermission(product, 'WITHDRAW')) {
            message.warning(intl.Coming_soon);
            return;
          }
          showModal({
            modal: ModalKeys.turboRangeWithdrawConfirm,
            position,
          });
        }}
        className="withdraw-btn dg-ghost"
        disabled={disabledBtn}
        loading={hasProcessingWithdraw || hasLocalProcessingWithdraw || loading}
      >
        {hasProcessingWithdraw
          ? `${intl.Withdrawing}...`
          : intl.turboRange.withdraw_and_close}
      </GhostBtn>
      <PrimaryBtn
        eventName="turbo_range_detail_increase"
        onClick={() => {
          if (
            !checkPermission(product, 'ADD_DEPOSIT') &&
            !checkPermission(product, 'DUAL_ADD_DEPOSIT')
          ) {
            message.warning(intl.Coming_soon);
            return;
          }
          showModal({
            modal: ModalKeys.turboRangeIncreaseInvestment,
            position,
          });
        }}
        className="increase-btn dg-primary"
        disabled={disabledBtn}
        loading={hasProcessingIncrease || loading}
      >
        {intl.turboRange.increase_investment}
      </PrimaryBtn>
    </StyledBtns>
  );
}

const StyledBtns = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .withdraw-btn {
    flex: 1;
  }
  .increase-btn {
    flex: 1;
  }
`;
