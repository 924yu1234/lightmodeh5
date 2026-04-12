import React, { useCallback, useMemo } from 'react';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import {
  useShowLoadingSkeleton,
  useTurboRangeStrategyLeaderboard,
} from 'src/state/turboRange/hooks';
import { TurboRangeStrategy } from 'src/state/turboRange/reducer';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';

import StrategyCardsDesktopSkeleton from './strategyCardsDesktopSkeleton';
import StrategyDesktopCard from './strategyDesktopCard';

export default function StrategyTabBestReturns() {
  const intl = useIntl();
  const showModal = useShowModal();
  const { positions } = useTurboRangeStrategyLeaderboard('bestReturns');
  const showSkeleton = useShowLoadingSkeleton();
  const sortedPositions = useMemo(() => positions.slice(0, 10), [positions]);

  const handleViewDetails = useCallback(
    (position: TurboRangeStrategy) => {
      showModal({
        modal: ModalKeys.turboRangeStrategyDetail,
        position,
        strategyTab: 'bestReturns',
      });
    },
    [showModal]
  );

  const createPosition = useCreatePosition();

  const handleCopy = useCallback(
    (position: TurboRangeStrategy) => {
      createPosition({
        poolAddress: position.poolAddress,
        minPrice: position.minPrice,
        maxPrice: position.maxPrice,
        source: 'strategy',
      });
    },
    [createPosition]
  );

  return (
    <div className="strategy-cards">
      {showSkeleton && <StrategyCardsDesktopSkeleton />}
      {!showSkeleton && sortedPositions.length === 0 && (
        <div className="empty-state">{intl.no_data}</div>
      )}
      {!showSkeleton &&
        sortedPositions.length > 0 &&
        sortedPositions.map((position) => (
          <StrategyDesktopCard
            key={position.id}
            position={position}
            primary={{
              label: intl.turboRange.roi,
              value: position.totalRoi_display || '--',
            }}
            secondary={[
              {
                label: intl.turboRange.principal,
                value: position.principalValue_display || '--',
              },
              {
                label: intl.turboRange.total_return,
                value: position.totalReturn_display || '--',
              },
            ]}
            onViewDetails={handleViewDetails}
            onCopy={handleCopy}
          />
        ))}
    </div>
  );
}
