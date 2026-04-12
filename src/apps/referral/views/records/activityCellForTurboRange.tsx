import React from 'react';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';

import { ReferralDetailRecord } from '../../types';

interface ActivityCellProps {
  record: ReferralDetailRecord;
}

export default function ActivityCellForTurboRange({
  record,
}: ActivityCellProps) {
  const { pool_address } = record;
  const product = useTurboRangeProduct(pool_address as string);
  const navigate = useCustomNavigate();
  return (
    <GALinkWrapper
      eventName="referral_turbo_range_link"
      className="activity-link"
      onClick={() => {
        navigate('/turbo-range');
      }}
    >
      {product?.name}
    </GALinkWrapper>
  );
}
