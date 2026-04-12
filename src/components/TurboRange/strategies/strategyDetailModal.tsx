import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconCandle from 'src/components/Icons/candle';
import Close from 'src/components/Icons/close';
import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import BottomModal from 'src/components/Modals/bottomModal';
import TokenIcon from 'src/components/Token/icon';
import PriceRangeBar from 'src/components/TurboRange/priceRangeBar';
import ProductName from 'src/components/TurboRange/productName';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';
import { formatStrategyDuration } from 'src/state/turboRange/utils';
import { ThemeType, useThemeParams } from 'src/theme';

export default function StrategyDetailModal() {
  const intl = useIntl();
  const { visible, hide, position, strategyTab } = useModals(
    ModalKeys.turboRangeStrategyDetail
  ) as any;
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const product = useTurboRangeProduct(position?.poolAddress || '');
  const navigate = useCustomNavigate();
  const location = useLocation();
  const isChartPage = location.pathname.includes('/turbo-range/info');

  const createPosition = useCreatePosition();
  const handleCopy = useCallback(() => {
    if (!position) return;
    hide();
    createPosition({
      poolAddress: position.poolAddress,
      minPrice: position.minPrice,
      maxPrice: position.maxPrice,
      source: 'strategy',
    });
  }, [hide, position, createPosition]);

  const highlightApy = useMemo(() => {
    if (strategyTab === 'topApy') return 'allTimeApy';
    if (strategyTab === 'hotToday') return 'yesterdayApy';
    return '';
  }, [strategyTab]);

  const durationDetail = formatStrategyDuration(position.duration || 0);

  if (isChartPage) {
    return null;
  }

  return (
    <StyledBottomModal opened={visible} onClose={hide} noHeader={isMobile}>
      <div
        className="modal-wrapper"
        style={{ padding: isMobile ? '10px 0 0 0' : '10px 0 30px' }}
      >
        {!isMobile && (
          <div className="modal-title">
            <Close onClick={hide} />
          </div>
        )}
        <div className="modal-content">
          <div className="strategy-header">
            <TokenIcon
              token={product.baseToken || position.baseToken}
              size={32}
              hideChainIcon
            />
            <span className="strategy-name">
              <ProductName poolAddress={position.poolAddress} />
            </span>

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
          </div>

          <div className="strategy-price-range">
            <PriceRangeBar position={position} />
          </div>

          <div className="strategy-metrics">
            <div className="metric-item">
              <div className="metric-value">
                {position.totalYield_display || '--'}
              </div>
              <div className="metric-label">
                {intl.turboRange.all_time_yield}
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-value">
                {position.isYesterdayUpdating
                  ? intl.turboRange.updating
                  : position.yesterdayYield_display || '--'}
              </div>
              <div className="metric-label">
                {intl.turboRange.yesterday_yield}
              </div>
            </div>
            <div
              className={`metric-item ${
                highlightApy === 'allTimeApy' ? 'highlight' : ''
              }`}
            >
              <div className="metric-value">{position.apy_display || '--'}</div>
              <div className="metric-label">{intl.turboRange.all_time_apy}</div>
            </div>
            <div
              className={`metric-item ${
                highlightApy === 'yesterdayApy' ? 'highlight' : ''
              }`}
            >
              <div className="metric-value">
                {position.isYesterdayUpdating
                  ? intl.turboRange.updating
                  : position.yesterday_apy_display || '--'}
              </div>
              <div className="metric-label">
                {intl.turboRange.yesterday_apy}
              </div>
            </div>
          </div>

          <div className="strategy-info">
            <div className="info-row">
              <span className="info-label">{intl.turboRange.principal}</span>
              <span className="info-value">
                {position.principalValue_display || '--'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">{intl.turboRange.duration}</span>
              <span className="info-value">{durationDetail}</span>
            </div>
          </div>

          <PrimaryBtn
            eventName="turbo_range_strategy_detail_copy"
            className="copy-btn"
            onClick={handleCopy}
          >
            {intl.turboRange.copy}
          </PrimaryBtn>
        </div>
      </div>
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(BottomModal)`
  .mantine-Modal-content {
    width: 460px;
    max-width: 460px;
    min-width: 460px;
  }
  .mantine-Modal-body {
    .modal-wrapper {
      background: #22223c;
      border-radius: 12px;
      overflow: hidden;

      .modal-title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 20px;
        .icon-close {
          cursor: pointer;
        }
      }
    }
  }

  .modal-content {
    padding: 10px 20px 20px;
  }

  .strategy-header {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 52px;
    margin-bottom: 16px;

    .strategy-name {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 18px;
      line-height: 24px;
      margin-right: auto;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }

  .strategy-price-range {
    margin-bottom: 16px;
  }

  .strategy-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 16px;
    overflow: hidden;

    .metric-item {
      padding: 12px 16px;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
      border-radius: 8px;

      .metric-value {
        font-size: 18px;
        line-height: 24px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        margin-bottom: 4px;
      }
      .metric-label {
        font-size: 12px;
        line-height: 16px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      }

      &.highlight .metric-value {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }

  .strategy-info {
    margin-bottom: 20px;

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;

      .info-label {
        font-size: 14px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
      }
      .info-value {
        font-size: 14px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }

  .copy-btn {
    margin-top: 10px;
    width: 100%;
  }
`;
