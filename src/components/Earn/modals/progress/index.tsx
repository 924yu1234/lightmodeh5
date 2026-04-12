import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { SwapOrderStatus } from 'src/constants/consts';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useUpdateVaultDetail } from 'src/state/intent/earn/hooks';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import DepositAndWithdrawView from '../appCreate/depositAndwithdraw';
import StatusView from './statusView';
import { useEarnOrderProgress } from './useEarnOrderProgress';

export default function EarnOrderProgressModal() {
  const intl = useIntl();
  const { order, hide, intent_id, visible, tryResp, vault } = useModals(
    ModalKeys.earnOrderProgress
  );
  const { type } = order;
  const resp = useEarnOrderProgress({ order, intent_id });
  const status = resp?.status;
  const [needRefresh, setNeedRefresh] = useState(false);
  const refrehVault = useUpdateVaultDetail();
  const refrehSwapBalance = useRefreshSwapBalance();

  useEffect(() => {
    window.earnOprTime = Date.now();
  }, []);

  useEffect(() => {
    if (
      resp?.status === SwapOrderStatus.success ||
      resp?.status === SwapOrderStatus.failed
    ) {
      if (order?.status === SwapOrderStatus.processing) {
        setNeedRefresh(true);
      }
    }
  }, [resp, order]);

  const closeModal = () => {
    if (needRefresh) {
      refrehVault(vault?.protocol);
      refrehSwapBalance();
    }
    hide();
  };

  const navigate = useCustomNavigate();

  return (
    <Modal title={null} centered onClose={closeModal} opened={!!visible}>
      <StyledOrder>
        <div className="modal-title">
          {type === 'claim' && intl.claim_rewards}
          <Close onClick={closeModal} />
        </div>
        {(type === 'deposit' || type === 'withdraw') && (
          <DepositAndWithdrawView order={order} tryResp={tryResp} />
        )}
        <StatusView status={status || SwapOrderStatus.processing} />
        {status === SwapOrderStatus.success ||
        status === SwapOrderStatus.failed ? (
          <PrimaryBtn
            eventName="btn_earn_progress_close"
            onClick={() => {
              closeModal();
              navigate('/simple-earn');
            }}
          >
            {intl.Close}
          </PrimaryBtn>
        ) : null}
      </StyledOrder>
    </Modal>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-title {
    margin-bottom: 20px;
  }

  .dg-primary {
    margin-top: 15px;
    width: 100%;
  }
`;
