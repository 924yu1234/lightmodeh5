import React, { useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn, Tooltip } from 'src/UI';

import IconCandle from 'src/components/Icons/candle';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconInfo from 'src/components/Icons/info';
import IconPositionHistory from 'src/components/Icons/PositionHistory';
import IconShare from 'src/components/Icons/share';
import Loader from 'src/components/Loader';
import TokenIcon from 'src/components/Token/icon';
import PriceRangeBar from 'src/components/TurboRange/priceRangeBar';
import { useShowShareButton } from 'src/h5/utils';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useShare from 'src/hooks/useShare';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useHasProcessingActions } from 'src/state/turboRange/useTurboRangeOrderProgress';
import {
  checkPermission,
  formatTurboRangeDuration,
} from 'src/state/turboRange/utils';
import { ThemeType, useThemeParams } from 'src/theme';
import digit from 'src/utils/digit';
import message from 'src/utils/message';

import { useIntl } from 'js/locals';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import CommonSenseSymbol from '../../commonSenseSymbol';
import ProductName from '../../productName';
import OutOfRangeTips from '../outOfRangeTips';
import ActiveCapital from './activeCapital';
import TurboRangeSharePosterDom from './sharePosterDom';

export default function TurboRangeDetailActive({
  position,
  loading,
  toggleHistory,
  historyVisible,
}: {
  position: TurboRangePosition;
  loading: boolean;
  toggleHistory: () => void;
  historyVisible: boolean;
}) {
  const intl = useIntl();

  const showModal = useShowModal();

  const {
    hasProcessingClaim,
    hasProcessingWithdraw,
    hasLocalProcessingClaim,
    hasLocalProcessingWithdraw,
    hasProcessingIncrease,
  } = useHasProcessingActions({
    positionAddress: position.positionAddress,
  });

  const product = useTurboRangeProduct(position.poolAddress);

  const disabledBtn =
    hasProcessingClaim || hasProcessingWithdraw || hasProcessingIncrease;

  const {
    entryPrice,
    baseToken,
    quoteToken,
    apy_display,
    unclaimed_rewards,
    firstYesterdayApyCalculatedTime,
    allTimeApyCalculatedTime,
  } = (position || {}) as TurboRangePosition;

  const [showToken, setShowToken] = useState(false);
  const [showUnclaimedRewards, setShowUnclaimedRewards] = useState(false);
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();

  // detai接口有未领取的奖励，如果历史接口返回processing则显示claiming，否则本地有10分钟内记录则不显示
  const hasUnclaimedRewards = useMemo(() => {
    return (
      !!unclaimed_rewards?.length &&
      (!hasLocalProcessingClaim || hasProcessingClaim)
    );
  }, [unclaimed_rewards, hasLocalProcessingClaim, hasProcessingClaim]);

  const allTimeApyTips = useMemo(() => {
    return intl.turboRange.will_be_calculated_on_DATE.replace(
      'DATE',
      dayjs(allTimeApyCalculatedTime).format('YYYY-MM-DD HH:mm')
    );
  }, [allTimeApyCalculatedTime, intl.turboRange.will_be_calculated_on_DATE]);

  const yesterdayTips = useMemo(() => {
    return intl.turboRange.will_be_calculated_on_DATE.replace(
      'DATE',
      dayjs(firstYesterdayApyCalculatedTime).format('YYYY-MM-DD HH:mm')
    );
  }, [
    intl.turboRange.will_be_calculated_on_DATE,
    firstYesterdayApyCalculatedTime,
  ]);

  const yesterdayApyValue = useMemo(() => {
    if (position.isYesterdayUpdating) {
      return intl.turboRange.updating;
    }
    if (position.yesterday_apy_display === '--') {
      return '--';
    }
    return `${position.yesterday_apy_display}`;
  }, [
    intl.turboRange.updating,
    position.isYesterdayUpdating,
    position.yesterday_apy_display,
  ]);
  const allTimeApyValue = useMemo(() => {
    return position.duration >= 4 * 60 * 60 * 1000 ? apy_display : '--';
  }, [apy_display, position.duration]);

  const sharePosterRef = useRef<HTMLDivElement | null>(null);
  const { loading: shareLoading, share } = useShare({
    targetRef: sharePosterRef,
    fileNamePrefix: 'turbo-range-share',
    downloadImage: false,
    width: 420,
    height: 585,
    pixelRatio: 2,
  });

  const showShareButton = useShowShareButton();

  return (
    <StyledDetail>
      <div className="product">
        <TokenIcon token={baseToken} hideChainIcon />
        <div className="product-symbol">
          <ProductName poolAddress={position?.poolAddress} />
        </div>
        <div className="action-btns">
          {showShareButton &&
            (shareLoading ? (
              <Loader size={16} />
            ) : (
              <IconWrapper2 size={32} onClick={share}>
                <IconShare size={16} />
              </IconWrapper2>
            ))}
          {isMobile && (
            <IconWrapper2
              size={32}
              onClick={() => {
                navigate(`/turbo-range/info/${position?.poolAddress}`);
              }}
            >
              <IconCandle size={16} />
            </IconWrapper2>
          )}
          {isMobile && (
            <IconWrapper2
              size={32}
              onClick={toggleHistory}
              className={historyVisible ? 'active' : ''}
            >
              <IconPositionHistory size={16} />
            </IconWrapper2>
          )}
        </div>
      </div>
      <OutOfRangeTips position={position} />
      <PriceRangeBar position={position} />

      <div className="yields-infos">
        <div className="yield-info">
          <div className="yield-info-value">{position.totalYield_display}</div>
          <div className="yield-info-title">
            {intl.turboRange.all_time_yield}
          </div>
        </div>
        <div className="yield-info">
          <div
            className={`yield-info-value ${
              Number(position.yesterdayYield) > 0 ? 'color-green' : ''
            } ${position.isYesterdayUpdating ? 'updating' : ''}`}
          >
            {position.isYesterdayUpdating
              ? intl.turboRange.updating
              : `${position.yesterdayYield_display}`}
          </div>
          <div className="yield-info-title with-info">
            {intl.turboRange.yesterday_yield}
            {firstYesterdayApyCalculatedTime > Date.now() && (
              <Tooltip
                label={yesterdayTips}
                position="bottom"
                events={{ hover: true, touch: true, focus: false }}
              >
                <div className="yield-info-icon">
                  <IconInfo />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="yield-info">
          <div className="yield-info-value">{allTimeApyValue}</div>
          <div className="yield-info-title with-info">
            {intl.turboRange.all_time_apy}
            {position.duration < 4 * 60 * 60 * 1000 && (
              <Tooltip
                label={allTimeApyTips}
                position="bottom"
                events={{ hover: true, touch: true, focus: false }}
              >
                <div className="yield-info-icon">
                  <IconInfo />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="yield-info">
          <div
            className={`yield-info-value  ${
              Number(position.yesterday_apy) > 0 ? 'color-green' : ''
            } ${position.isYesterdayUpdating ? 'updating' : ''}`}
          >
            {yesterdayApyValue}
          </div>
          <div className="yield-info-title with-info">
            {intl.turboRange.yesterday_apy}
            {!position.isYesterdayUpdating &&
              position.yesterday_apy_display === '--' && (
                <Tooltip
                  label={yesterdayTips}
                  position="bottom"
                  events={{ hover: true, touch: true, focus: false }}
                >
                  <div className="yield-info-icon">
                    <IconInfo />
                  </div>
                </Tooltip>
              )}
          </div>
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.entry_price}</div>
        <div className="item-info-value">
          ${digit.formatWithDecimals(entryPrice, product.showDecimals)}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.duration}</div>
        <div className="item-info-value text-underline-dotted cursor-pointer">
          <Tooltip
            label={`${intl.turboRange.created_at} ${dayjs(
              position.created_at
            ).format('YYYY-MM-DD HH:mm')}`}
            position="bottom"
            events={{ hover: true, touch: true, focus: false }}
          >
            <div>{formatTurboRangeDuration(position.duration)}</div>
          </Tooltip>
        </div>
      </div>

      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.position}</div>
        <div className="item-info-value">{position.positionValue_display}</div>
      </div>
      <div className="principal-info">
        <div
          className="item-info"
          style={{
            marginBottom: showToken ? '15px' : '0',
          }}
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
              <TokenIcon token={baseToken} size={16} hideChainIcon />
              <div className="token-amount">{baseToken.amount}</div>
              <div className="token-symbol">
                <CommonSenseSymbol poolAddress={position?.poolAddress} />
              </div>
            </div>
            <div className="token-item">
              <TokenIcon token={quoteToken} size={16} hideChainIcon />
              <div className="token-amount">{quoteToken.amount}</div>
              <div className="token-symbol">{quoteToken.symbol}</div>
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
            {unclaimed_rewards?.map((reward) => (
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
          eventName="turbo_range_detail_withdraw"
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
      <div className="share-poster-container">
        <TurboRangeSharePosterDom
          ref={sharePosterRef}
          allTimeApyValue={allTimeApyValue}
          position={position}
          product={product}
          yesterdayApyValue={yesterdayApyValue}
        />
      </div>
    </StyledDetail>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  .price-range-bar {
    margin-bottom: 15px;
  }
  .tokens {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding: 15px 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .token-tips {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 16px;
    }
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

  .position-status-wrapper {
    margin-bottom: 10px;
    display: flex;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .claim-btn.mantine-Button-root {
    height: 30px;
    min-height: 30px;
    margin-left: auto;
    border-radius: 18px;
  }
  .withdraw-btn {
    margin-top: auto;
    width: 100%;
  }

  .yields-infos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
    .yield-info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      background: ${({ theme }) => theme.bg_white_05};
      border-radius: 8px;
      padding: 10px 15px;
      .yield-info-title {
        font-size: 12px;
        line-height: 16px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        &.with-info {
          display: flex;
          align-items: center;
          gap: 3px;
        }
      }
      .yield-info-icon {
        display: flex;
        align-items: center;
        .icon-info {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        }
      }
      .yield-info-value {
        font-size: 18px;
        line-height: 24px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        &.updating {
          font-size: 14px;
          color: ${({ theme }: { theme: ThemeType }) => theme.green};
        }
      }
    }
  }
  .principal-info {
    border: 1px solid ${({ theme }) => theme.border_white_10};
    border-radius: 5px;
    padding: 15px 15px;
    margin-bottom: 15px;
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
  .share-poster-container {
    position: fixed;
    top: -99999px;
    left: -99999px;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }
`;
