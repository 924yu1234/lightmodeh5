import React, { useCallback, useMemo } from 'react';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import {
  useShowLoadingSkeleton,
  useTurboRangeStrategyLeaderboard,
} from 'src/state/turboRange/hooks';
import { TurboRangeStrategy } from 'src/state/turboRange/reducer';

import StrategyCardsMobileSkeleton from './strategyCardsMobileSkeleton';
import StrategyMobileCard from './strategyMobileCard';

export default function StrategyTabTopApy() {
  const intl = useIntl();
  const showModal = useShowModal();
  const { positions } = useTurboRangeStrategyLeaderboard('topApy');
  const showSkeleton = useShowLoadingSkeleton();
  const sortedPositions = useMemo(() => positions.slice(0, 10), [positions]);

  const handleViewDetails = useCallback(
    (position: TurboRangeStrategy) => {
      showModal({
        modal: ModalKeys.turboRangeStrategyDetail,
        position,
        strategyTab: 'topApy',
      });
    },
    [showModal]
  );

  return (
    <div className="strategy-list">
      {showSkeleton && <StrategyCardsMobileSkeleton />}
      {!showSkeleton && sortedPositions.length === 0 && (
        <div className="empty-state">
          {intl.turboRange.you_have_no_position}
        </div>
      )}
      {!showSkeleton &&
        sortedPositions.length > 0 &&
        sortedPositions.map((position) => (
          <StrategyMobileCard
            key={position.id}
            position={position}
            primary={{
              label: intl.turboRange.all_time_apy,
              value: position.apy_display || '--',
            }}
            secondary={[
              {
                label: intl.turboRange.principal,
                value: position.principalValue_display || '--',
              },
              {
                label: intl.turboRange.all_time_yield,
                value: position.totalYield_display || '--',
              },
            ]}
            onViewDetails={handleViewDetails}
          />
        ))}
    </div>
  );
}
