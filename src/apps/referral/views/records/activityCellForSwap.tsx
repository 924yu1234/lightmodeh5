import React from 'react';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import { useToSwap } from 'src/hooks/navigate';

import { ReferralDetailRecord } from '../../types';

interface ActivityCellProps {
  record: ReferralDetailRecord;
}

export default function ActivityCell({ record }: ActivityCellProps) {
  const { base_token, activity } = record;
  const toSwap = useToSwap();

  return (
    <GALinkWrapper
      eventName="referral_swap_link"
      className="activity-link"
      onClick={() => {
        toSwap({ token: base_token });
      }}
    >
      {activity}
    </GALinkWrapper>
  );
}
