import React, { useCallback } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

interface OverviewCardProps {
  claimDisabled: boolean;
  claimTokenChain?: string | number;
  claimTokenId?: string | number;
  commissionEarned: number;
  invitesCount: number;
  unclaimedCommission: number;
}

export default function OverviewCard({
  claimDisabled,
  claimTokenChain,
  claimTokenId,
  commissionEarned,
  invitesCount,
  unclaimedCommission,
}: OverviewCardProps) {
  const intl = useIntl();
  const showModal = useShowModal();

  const handleOpenClaim = useCallback(() => {
    showModal({
      modal: ModalKeys.kol_claim,
      claimableTokenId: claimTokenId,
      claimableTokenChain: claimTokenChain,
      unclaimedCommission,
    });
  }, [claimTokenChain, claimTokenId, showModal, unclaimedCommission]);

  const handleOpenHistory = useCallback(() => {
    showModal({ modal: ModalKeys.kol_claim_history });
  }, [showModal]);

  return (
    <StyledOverviewCard className="summary-card">
      <div className="section-title">{intl.Summary}</div>
      <div className="summary-content">
        <div className="summary-item">
          <div className="summary-value">{invitesCount}</div>
          <div className="summary-label">{intl.Invites}</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">
            ${digit.format(commissionEarned, '0,0.00')}
          </div>
          <div className="summary-label">{intl.Commission_Earned}</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">
            ${digit.format(unclaimedCommission, '0,0.00')}
          </div>
          <div className="summary-label">{intl.Unclaimed_Commission}</div>
        </div>
      </div>
      <div className="summary-actions">
        <PrimaryBtn
          eventName="btn_referral_claim"
          disabled={claimDisabled}
          onClick={handleOpenClaim}
        >
          {intl.Claim}
        </PrimaryBtn>
        <GhostBtn
          eventName="btn_referral_claim_history"
          onClick={handleOpenHistory}
        >
          {intl.history}
        </GhostBtn>
      </div>
    </StyledOverviewCard>
  );
}

const StyledOverviewCard = styled.div`
  margin-bottom: 20px;
  .summary-content {
    display: grid;
    grid-template-columns: 0.6fr 1fr 1fr;
    column-gap: 26px;
    row-gap: 18px;
    align-items: start;
  }

  .summary-item {
    min-width: 0;
    position: relative;
  }

  .summary-value {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 16px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    white-space: nowrap;
  }

  .summary-label {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }

  .summary-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 30px;
  }

  .summary-actions .dg-primary,
  .summary-actions .dg-ghost {
    min-width: 150px;
    min-height: 40px;
    height: 40px;
    padding: 0 18px;
  }
`;
