import React from 'react';

import DeTooltip from 'src/components/DeTooltip';
import IconInfo from 'src/components/Icons/info';
import { useIntl } from 'src/locals';

interface StatusCellProps {
  isPending: boolean;
}

export default function StatusCell({ isPending }: StatusCellProps) {
  const intl = useIntl();

  return (
    <div className={`status-cell ${isPending ? 'pending' : 'credited'}`}>
      <DeTooltip
        title={isPending ? intl.referral_pending_commission_tips : null}
      >
        <span>{isPending ? intl.pending : intl.Credited}</span>
        {isPending && (
          <span className="status-icon" style={{ marginLeft: 4 }}>
            <IconInfo size={12} />
          </span>
        )}
      </DeTooltip>
    </div>
  );
}
