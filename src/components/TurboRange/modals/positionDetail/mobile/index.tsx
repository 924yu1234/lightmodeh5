import React, { useRef } from 'react';
import styled from 'styled-components';

import Loader from 'src/components/Loader';
import TokenIcon from 'src/components/Token/icon';
import PriceRangeBar from 'src/components/TurboRange/priceRangeBar';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useShare from 'src/hooks/useShare';
import { useIntl } from 'src/locals';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import ProductName from '../../../productName';
import OutOfRangeTips from '../../outOfRangeTips';
import TurboRangeSharePosterDom from '../sharePosterDom';
import BottomInfo from '../views/bottomInfo';
import MoreMenu from '../views/moreMenu';
import YieldCards from '../views/yieldCards';
import Btns from './btns';
import PositionInfo from './positionInfo';

export default function MobileDetail({
  position,
  loading,
}: {
  position: TurboRangePosition;
  loading: boolean;
}) {
  const showModal = useShowModal();
  const navigate = useCustomNavigate();
  const product = useTurboRangeProduct(position.poolAddress);
  const intl = useIntl();
  const sharePosterRef = useRef<HTMLDivElement | null>(null);
  const { loading: shareLoading, share } = useShare({
    targetRef: sharePosterRef,
    fileNamePrefix: 'turbo-range-share',
    downloadImage: false,
    width: 420,
    height: 585,
    pixelRatio: 2,
  });

  const handleShare = () => {
    share();
  };

  const handleChart = () => {
    navigate(`/turbo-range/info/${position?.poolAddress}`);
  };

  const handleHistory = () => {
    showModal({
      modal: ModalKeys.turboRangePositionHistory,
      position,
    });
  };

  return (
    <StyledMobileDetail>
      <div className="product">
        <TokenIcon token={position.baseToken} hideChainIcon />
        <div className="product-symbol">
          <ProductName poolAddress={position?.poolAddress} />
        </div>
        <div className="action-btns">
          {shareLoading && <Loader size={16} />}
          <MoreMenu
            onShare={handleShare}
            onChart={handleChart}
            onHistory={handleHistory}
          />
        </div>
      </div>
      <OutOfRangeTips position={position} />
      <PriceRangeBar position={position} />
      <YieldCards position={position} />
      <PositionInfo position={position} loading={loading} />
      <BottomInfo position={position} />
      <Btns position={position} loading={loading} />
      <div className="share-poster-container">
        <TurboRangeSharePosterDom
          ref={sharePosterRef}
          allTimeApyValue={position.apy_display}
          position={position}
          product={product}
          yesterdayApyValue={position.last24hApy_display}
        />
      </div>
    </StyledMobileDetail>
  );
}

const StyledMobileDetail = styled.div`
  width: 100%;
  .product {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    height: 52px;
    .product-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 16px;
      line-height: 20px;
      margin-right: 5px;
    }
    .action-btns {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-left: auto;
    }
  }
  .price-range-bar {
    margin-bottom: 15px;
  }
  .yield-cards {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
    border: none;
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
