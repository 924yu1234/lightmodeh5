import React, { useMemo } from 'react';
import styled from 'styled-components';

import PositionStatusIcon from 'src/components/TurboRange/positionStatusIcon';
import { useIntl } from 'src/locals';
import {
  usePositionRangeStatus,
  useTurboRangeProduct,
} from 'src/state/turboRange/hooks';
import { TurboRangeRangeStatusTarget } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

export default function PriceRangeBar({
  position,
}: {
  position: TurboRangeRangeStatusTarget;
}) {
  const { minPrice, maxPrice } = position;
  const product = useTurboRangeProduct(position.poolAddress);
  const minPriceDisplay = digit.formatWithDecimals(
    minPrice,
    product.showDecimals
  );
  const maxPriceDisplay = digit.formatWithDecimals(
    maxPrice,
    product.showDecimals
  );
  const currentPrice = position.currentPrice || product?.currentPrice;
  const intl = useIntl();
  const rangeStatus = usePositionRangeStatus(position);

  const leftPercent = useMemo(() => {
    if (!currentPrice || !minPrice || !maxPrice) return 50;
    if (Number(currentPrice) > Number(maxPrice)) return 100;
    if (Number(currentPrice) < Number(minPrice)) return 0;
    return (
      ((Number(currentPrice) - Number(minPrice)) /
        (Number(maxPrice) - Number(minPrice))) *
      100
    );
  }, [currentPrice, maxPrice, minPrice]);

  return (
    <Wrapper
      leftPercent={leftPercent}
      className={`price-range-bar ${rangeStatus}`}
    >
      {currentPrice && (
        <div className="bar-current">
          {intl.turboRange.current}: ${currentPrice}
        </div>
      )}
      <div className="bar-track">
        <div className="bar-pointer">
          <PositionStatusIcon position={position} />
        </div>
      </div>
      <div className="bar-values">
        <span>${minPriceDisplay}</span>
        <span>${maxPriceDisplay}</span>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ leftPercent: number }>`
  .bar-current {
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 6px;
  }

  &.out-of-range {
    .bar-track {
      background: linear-gradient(
        90deg,
        #febe2f7f 0%,
        #febe2f33 50%,
        #febe2f7f 100%
      );
    }
  }
  .bar-track {
    background-image: linear-gradient(
      -89deg,
      rgba(80, 228, 162, 0.4) 24%,
      rgba(80, 228, 162, 0.7) 47%,
      rgba(80, 228, 162, 0.4) 72%
    );
    border-radius: 5px;
    height: 5px;
    width: 100%;
    position: relative;

    .bar-pointer {
      position: absolute;
      left: ${({ leftPercent }) => leftPercent}%;
      transform: translate(-50%, -4px);
      .position-status-icon {
        left: auto;
        transform: none;
      }
    }
  }

  .bar-values {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    margin-top: 6px;
  }
`;
