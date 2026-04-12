import React, { useEffect, useMemo, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components';

import { Button, Modal } from 'src/UI';

import digit from 'src/utils/digit';
import message from 'src/utils/message';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import { emitReferralSummaryRefetch } from './hooks/useReferralSummaryData';
import { useTryClaimReferralRewards } from './service';
import { useClaimReferralRewards } from './useClaimRererralRewards';

export default function ClaimModal() {
  const {
    visible,
    hide,
    claimableTokenId,
    claimableTokenChain,
    unclaimedCommission,
    onHide,
  } = useModals(ModalKeys.kol_claim);
  const intl = useIntl();
  const [gasToken, setGasToken] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const claimReferralRewards = useClaimReferralRewards();
  const showModal = useShowModal();

  const tryClaimReferralRewards = useTryClaimReferralRewards();
  const hideModal = () => {
    if (onHide) onHide();
    hide();
  };

  useEffect(() => {
    setLoading(true);
    tryClaimReferralRewards({
      tokenId: claimableTokenId,
      chain: claimableTokenChain,
    })
      .then((resp) => {
        const { gas_token } = resp;
        const amount = formatUnits(gas_token?.amount, gas_token.decimals);
        setGasToken({
          volume: gas_token?.amount,
          ...gas_token,
          amount,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [visible, claimableTokenId, claimableTokenChain, tryClaimReferralRewards]);

  const disabled = useMemo(() => {
    return (
      !gasToken ||
      Number(gasToken.amount) <= 0 ||
      Number(gasToken?.amount) > Number(unclaimedCommission)
    );
  }, [gasToken, unclaimedCommission]);

  const netAmountDisplay = useMemo(() => {
    if (!gasToken) {
      return '--';
    }
    const netAmount =
      Number(unclaimedCommission) - Number(gasToken.amount || 0);
    if (netAmount <= 0) {
      return `0 ${'USDC'}`;
    }
    return `${digit.format(netAmount, '0,0.######')} ${'USDC'}`;
  }, [gasToken, unclaimedCommission]);

  const claim = () => {
    setLoading(true);
    claimReferralRewards({
      claimableTokenId,
      claimableTokenChain,
      gasToken,
    })
      .then((resp) => {
        emitReferralSummaryRefetch();
        showModal({
          modal: ModalKeys.kol_claim_success,
          data: resp,
          netAmountDisplay,
        });
        hideModal();
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledCommonTips>
        <div className="modal-title">
          {intl.Claim}
          <Close onClick={hideModal} />
        </div>
        <div className="info-item">
          <div className="info-item-title"> {intl.claimable}</div>
          <div className="info-item-value">
            {digit.format(unclaimedCommission, '0,0.######')} USDC
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title"> {intl.est_network_fee}</div>
          <div className="info-item-value">
            {gasToken
              ? `${digit.format(gasToken?.amount, '0,0.######')} USDC`
              : '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title"> {intl.Receive}</div>
          <div className="info-item-value">{netAmountDisplay}</div>
        </div>
        <div className="modal-btns">
          <Button
            uiVariant="primary"
            onClick={claim}
            loading={loading}
            disabled={disabled}
          >
            {intl.Claim}
          </Button>
        </div>
      </StyledCommonTips>
    </Modal>
  );
}

const StyledCommonTips = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
    line-height: 20px;
    .info-item-title {
      font-size: 14px;
    }
    .info-item-value {
      text-align: right;
    }
  }

  .title {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    text-align: center;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalDesc};
    font-size: 14px;
    line-height: 24px;
    margin: 10px 0 0;
  }

  .modal-btns {
    width: 100%;
    margin-top: 30px;
  }
`;
