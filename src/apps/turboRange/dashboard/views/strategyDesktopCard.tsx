import React from 'react';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import TokenIcon from 'src/components/Token/icon';
import PriceRangeBarForStrategy from 'src/components/TurboRange/priceRangeBar';
import ProductName from 'src/components/TurboRange/productName';
import { useIntl } from 'src/locals';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangeStrategy } from 'src/state/turboRange/reducer';
import { formatStrategyDuration } from 'src/state/turboRange/utils';

export interface StrategyDesktopCardProps {
  position: TurboRangeStrategy;
  primary: { label: string; value: string };
  secondary: { label: string; value: string }[];
  onViewDetails: (position: TurboRangeStrategy) => void;
  onCopy: (position: TurboRangeStrategy) => void;
}

export default function StrategyDesktopCard({
  position,
  primary,
  secondary,
  onViewDetails,
  onCopy,
}: StrategyDesktopCardProps) {
  const intl = useIntl();
  const product = useTurboRangeProduct(position.poolAddress || '');
  const duration = formatStrategyDuration(position.duration || 0);

  return (
    <div className="strategy-card">
      <div className="card-header">
        <TokenIcon token={product.baseToken} size={24} hideChainIcon />
        <span className="card-name">
          <ProductName poolAddress={position.poolAddress} />
        </span>
        <span className="card-duration">{duration}</span>
      </div>

      <PriceRangeBarForStrategy position={position} />

      <div className="card-primary">
        <div className="primary-label">{primary.label}</div>
        <div className="primary-value">{primary.value}</div>
      </div>

      <div className="card-secondary">
        {secondary.map((item) => (
          <div key={item.label} className="secondary-item">
            <div className="secondary-label">{item.label}</div>
            <div className="secondary-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <GhostBtn
          eventName="turboRange_strategy_view_details"
          className="btn-details"
          onClick={() => onViewDetails(position)}
        >
          {intl.turboRange.view_details}
        </GhostBtn>
        <PrimaryBtn
          eventName="turboRange_strategy_copy"
          className="btn-copy"
          onClick={() => onCopy(position)}
        >
          {intl.turboRange.copy}
        </PrimaryBtn>
      </div>
    </div>
  );
}
