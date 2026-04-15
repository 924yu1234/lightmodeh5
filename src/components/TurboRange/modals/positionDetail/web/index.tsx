import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconShare from 'src/components/Icons/share';
import Loader from 'src/components/Loader';
import TokenIcon from 'src/components/Token/icon';
import PriceRangeBar from 'src/components/TurboRange/priceRangeBar';
import { useShowShareButton } from 'src/h5/utils';
import useShare from 'src/hooks/useShare';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';

import ProductName from '../../../productName';
import OutOfRangeTips from '../../outOfRangeTips';
import TurboRangeSharePosterDom from '../sharePosterDom';
import HistoryTab from '../views/historyTab';
import Last24hTab from '../views/last24hTab';
import AllTab from './allTab';
import PositionInfo from './positionInfo';

type TabKey = 'all' | 'last24h' | 'history';

export default function PCDetail({
  position,
  loading,
  onClose,
}: {
  position: TurboRangePosition;
  loading: boolean;
  onClose: () => void;
}) {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const product = useTurboRangeProduct(position.poolAddress);

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
    <StyledPCDetail>
      <div className="left-panel">
        <div className="product">
          <TokenIcon token={position.baseToken} hideChainIcon />
          <div className="product-symbol">
            <ProductName poolAddress={position?.poolAddress} />
          </div>
        </div>
        <OutOfRangeTips position={position} />
        <PriceRangeBar position={position} />
        <PositionInfo position={position} loading={loading} />
      </div>
      <div className="right-panel">
        <div className="tabs-row">
          <Tabs
            value={activeTab}
            onChange={(v) => v && setActiveTab(v as TabKey)}
          >
            <Tabs.List>
              <Tabs.Tab value="all">{intl.all}</Tabs.Tab>
              <Tabs.Tab value="last24h">{intl.turboRange.last_24h}</Tabs.Tab>
              <Tabs.Tab value="history">{intl.history}</Tabs.Tab>
              <div className="tabs-actions">
                {showShareButton &&
                  (shareLoading ? (
                    <Loader size={16} />
                  ) : (
                    <IconWrapper2 size={28} onClick={share}>
                      <IconShare size={14} />
                    </IconWrapper2>
                  ))}
                <Close onClick={onClose} />
              </div>
            </Tabs.List>
          </Tabs>
        </div>
        <div className="tab-content">
          {activeTab === 'all' && <AllTab position={position} />}
          {activeTab === 'last24h' && <Last24hTab position={position} />}
          {activeTab === 'history' && <HistoryTab position={position} />}
        </div>
      </div>
      <div className="share-poster-container">
        <TurboRangeSharePosterDom
          ref={sharePosterRef}
          allTimeApyValue={position.apy_display}
          position={position}
          product={product}
          yesterdayApyValue={position.last24hApy_display}
        />
      </div>
    </StyledPCDetail>
  );
}

const StyledPCDetail = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 10px 10px;

  .position-info .principal-info {
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.07);
  }

  .mantine-Tabs-root {
    width: 100%;
    .mantine-Tabs-list {
      padding: 0;
      .mantine-Tabs-tab {
        padding: 0 5px;
        font-size: 14px;
        height: 40px;
        padding: 0;
        border-bottom: 2px solid transparent;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
        &[data-active] {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        }
      }
    }
  }

  .left-panel {
    width: 420px;
    min-width: 420px;
    flex-shrink: 0;
    .product {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
      height: 42px;
      .product-symbol {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        font-size: 16px;
        line-height: 20px;
      }
    }
    .price-range-bar {
      margin-bottom: 15px;
    }
  }
  .right-panel {
    flex: 1;
    min-width: 0;
  }
  .tabs-row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .tabs-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-left: auto;
      .icon-close {
        font-size: 18px;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        &:hover {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
          background: ${({ theme }) => theme.bg_white_10};
        }
      }
    }
  }
  .tab-content {
    overflow-y: auto;
    max-height: ${(props: any) =>
      props.theme.windowHeight - props.theme.modalTop - 150}px;
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
