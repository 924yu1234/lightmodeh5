import React from 'react';

import IconStatusFailed from './Icons/StatusFailed';
import IconStatusSuccess from './Icons/StatusSuccess';
import IconStatusWaiting from './Icons/StatusWaiting';

export default function StatusIcon({ status }: { status: string }) {
  if (status === 'failed' || status === 'canceled') {
    return <IconStatusFailed />;
  }
  if (status === 'success' || status === 'completed') {
    return <IconStatusSuccess />;
  }
  return <IconStatusWaiting />;
}
