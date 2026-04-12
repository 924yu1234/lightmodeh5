import React from 'react';

const DEFAULT_COUNT = 3;

interface StrategyCardsMobileSkeletonProps {
  count?: number;
}

export default function StrategyCardsMobileSkeleton({
  count = DEFAULT_COUNT,
}: StrategyCardsMobileSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`skeleton-${index}`} className="strategy-card skeleton">
          <div className="skeleton-line w60" />
          <div className="skeleton-line w100" />
          <div className="skeleton-line w40" />
        </div>
      ))}
    </>
  );
}
