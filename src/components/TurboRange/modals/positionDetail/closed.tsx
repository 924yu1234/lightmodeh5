import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import DeTooltip from 'src/components/DeTooltip';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconInfo from 'src/components/Icons/info';
import IconPositionHistory from 'src/components/Icons/PositionHistory';
import TokenIcon from 'src/components/Token/icon';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { formatTurboRangeDuration } from 'src/state/turboRange/utils';
import { ThemeType, useThemeParams } from 'src/theme';

import { useIntl } from 'js/locals';

import CommonSenseSymbol from '../../commonSenseSymbol';
import PositionStatus from '../../positionStatus';
import ProductName from '../../productName';

export default function TurboRangeDetailClosed({
  position,
  historyVisible,
  toggleHistory,
}: {
  position: TurboRangePosition;
  historyVisible: boolean;
  toggleHistory: () => void;
}) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();

  const {
    baseToken,
    quoteToken,
    minPrice,
    maxPrice,
    totalPrincipalBaseAmount,
    totalPrincipalQuoteAmount,
    withdrawalAndClaimedBaseAmount,
    withdrawalAndClaimedQuoteAmount,
  } = (position || {}) as TurboRangePosition;

  return (
    <StyledDetail>
      <div className="product">
        <TokenIcon token={baseToken} hideChainIcon />
        <div className="product-symbol">
          <ProductName poolAddress={position?.poolAddress} />
        </div>
        {!isMobile && <PositionStatus position={position} />}
        <div className="action-btns">
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
      {isMobile && (
        <div className="position-status-wrapper">
          <PositionStatus position={position} />
        </div>
      )}
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.price_range}</div>
        <div className="item-info-value">
          {minPrice} - {maxPrice}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.total_principal}</div>
      </div>
      <div className="tokens">
        <div className="token-item">
          <TokenIcon token={baseToken} size={16} hideChainIcon />
          <div className="token-amount">{totalPrincipalBaseAmount}</div>
          <div className="token-symbol">
            <CommonSenseSymbol poolAddress={position?.poolAddress} />
          </div>
          {Number(totalPrincipalBaseAmount) < 0 && (
            <DeTooltip title={intl.turboRange.nagative_invest_tips}>
              <IconInfo />
            </DeTooltip>
          )}
        </div>
        <div className="token-item">
          <TokenIcon token={quoteToken} size={16} hideChainIcon />
          <div className="token-amount">{totalPrincipalQuoteAmount}</div>
          <div className="token-symbol">{quoteToken.symbol}</div>
          {Number(totalPrincipalQuoteAmount) < 0 && (
            <DeTooltip title={intl.turboRange.nagative_invest_tips}>
              <IconInfo />
            </DeTooltip>
          )}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">
          {intl.turboRange.total_withdrawal_and_claim}
        </div>
      </div>
      <div className="tokens">
        <div className="token-item">
          <TokenIcon token={baseToken} size={16} hideChainIcon />
          <div className="token-amount">{withdrawalAndClaimedBaseAmount}</div>
          <div className="token-symbol">
            <CommonSenseSymbol poolAddress={position?.poolAddress} />
          </div>
        </div>
        <div className="token-item">
          <TokenIcon token={quoteToken} size={16} hideChainIcon />
          <div className="token-amount">{withdrawalAndClaimedQuoteAmount}</div>
          <div className="token-symbol">{quoteToken.symbol}</div>
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.all_time_apy}</div>
        <div
          className={`item-info-value ${
            Number(position.apy) > 0 ? 'color-green' : ''
          }`}
        >
          {position.apy_display}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.all_time_yield}</div>
        <div
          className={`item-info-value ${
            Number(position.totalYield) > 0 ? 'color-green' : ''
          }`}
        >
          {position.totalYield_display}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.duration}</div>
        <div className="item-info-value">
          {formatTurboRangeDuration(position.duration)}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.created_at}</div>
        <div className="item-info-value">
          {dayjs(position.created_at).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.closed_at}</div>
        <div className="item-info-value">
          {dayjs(position.closed_at).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </StyledDetail>
  );
}

const StyledDetail = styled.div`
  width: 100%;
  .tokens {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.bg_white_05};
    border-radius: 8px;
    padding: 15px 10px;
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

  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 15px;
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
  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .claim-btn {
    height: 30px;
    margin-left: auto;
  }
  .withdraw-btn {
    margin-top: auto;
    width: 100%;
  }
`;
