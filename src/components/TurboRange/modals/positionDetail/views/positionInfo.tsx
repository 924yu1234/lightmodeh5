import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import TokenIcon from 'src/components/Token/icon';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useHasProcessingActions } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { checkPermission } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';
import message from 'src/utils/message';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import CommonSenseSymbol from '../../../commonSenseSymbol';
import ActiveCapital from '../activeCapital';

export default function PositionInfo({
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
    hasLocalProcessingClaim,
    hasLocalProcessingWithdraw,
    hasProcessingIncrease,
  } = useHasProcessingActions({
    positionAddress: position.positionAddress,
  });

  const disabledBtn =
    hasProcessingClaim || hasProcessingWithdraw || hasProcessingIncrease;

  const [showToken, setShowToken] = useState(false);
  const [showUnclaimedRewards, setShowUnclaimedRewards] = useState(false);

  const hasUnclaimedRewards = useMemo(() => {
    return (
      !!position.unclaimed_rewards?.length &&
      (!hasLocalProcessingClaim || hasProcessingClaim)
    );
  }, [position.unclaimed_rewards, hasLocalProcessingClaim, hasProcessingClaim]);

  return (
    <StyledPositionInfo className="position-info">
      <div className="principal-info">
        <div className="position-value-section">
          <div className="position-label">{intl.turboRange.my_position}</div>
          <div className="position-value">{position.positionValue_display}</div>
        </div>
        <div
          className="item-info"
          style={{ marginBottom: showToken ? '15px' : '0' }}
        >
          <div className="item-info-title">
            {intl.turboRange.active_capital}
          </div>
          <ActiveCapital
            position={position}
            showToken={showToken}
            setShowToken={setShowToken}
          />
        </div>
        {showToken && (
          <div className="tokens">
            <div className="token-item">
              <TokenIcon token={position.baseToken} size={16} hideChainIcon />
              <div className="token-amount">{position.baseToken.amount}</div>
              <div className="token-symbol">
                <CommonSenseSymbol poolAddress={position?.poolAddress} />
              </div>
            </div>
            <div className="token-item">
              <TokenIcon token={position.quoteToken} size={16} hideChainIcon />
              <div className="token-amount">{position.quoteToken.amount}</div>
              <div className="token-symbol">{position.quoteToken.symbol}</div>
            </div>
          </div>
        )}
        {hasUnclaimedRewards && (
          <div className="item-info" style={{ marginTop: '15px' }}>
            <div className="item-info-title">
              {intl.turboRange.unclaimed_yield}
            </div>
            <div
              className="item-info-value cursor-pointer"
              onClick={() => setShowUnclaimedRewards((pre) => !pre)}
            >
              {position.unclaimedRewardsValue_display}
            </div>
          </div>
        )}
        {hasUnclaimedRewards && showUnclaimedRewards && (
          <div className="tokens">
            {position.unclaimed_rewards?.map((reward) => (
              <div className="token-item" key={reward.address}>
                <TokenIcon token={reward} size={16} hideChainIcon />
                <div className="token-amount">{reward.amount}</div>
                <div className="token-symbol">
                  <CommonSenseSymbol
                    poolAddress={position?.poolAddress}
                    token={reward}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {hasUnclaimedRewards && (
          <div
            className="item-info claim-btn-container"
            style={{ margin: '0' }}
          >
            <PrimaryBtn
              eventName="turbo_range_detail_claim"
              className="claim-btn"
              disabled={disabledBtn}
              loading={hasProcessingClaim || hasLocalProcessingClaim}
              onClick={() => {
                if (!checkPermission(product, 'CLAIM')) {
                  message.warning(intl.Coming_soon);
                  return;
                }
                showModal({
                  modal: ModalKeys.turboRangeClaimConfirm,
                  position,
                });
              }}
            >
              {hasProcessingClaim || hasLocalProcessingClaim
                ? `${intl.Claiming}...`
                : intl.Claim}
            </PrimaryBtn>
          </div>
        )}
      </div>
      <div className="btns">
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
          loading={
            hasProcessingWithdraw || hasLocalProcessingWithdraw || loading
          }
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
      </div>
    </StyledPositionInfo>
  );
}

const StyledPositionInfo = styled.div`
  .position-value-section {
    margin-bottom: 15px;
    .position-label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      margin-bottom: 5px;
    }
    .position-value {
      font-size: 24px;
      line-height: 30px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
  .tokens {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding: 15px 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .token-item {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 20px;
    }
  }
  .principal-info {
    padding: 15px;
    margin-bottom: 15px;
    background: ${({ theme }) => theme.bg_white_02};
    border-radius: 8px;
  }
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    .item-info-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .item-info-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .claim-btn.mantine-Button-root {
    height: 30px;
    min-height: 30px;
    margin-left: auto;
    border-radius: 18px;
  }
  .btns {
    display: flex;
    gap: 10px;
    align-items: center;
    .withdraw-btn {
      flex: 1;
    }
    .increase-btn {
      flex: 1;
    }
  }
`;
