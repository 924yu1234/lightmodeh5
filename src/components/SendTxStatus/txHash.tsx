import React from 'react';

import { useIntl } from 'src/locals';

import Hash from '../Hash';

export default function SendTxHash({ data }: { data: any }) {
  const intl = useIntl();
  const { tx_hash, estimated_time } = data;

  if (estimated_time && !tx_hash) {
    return (
      <span>
        {intl.show_in_X_m.replace('X', Math.ceil(estimated_time / 60))}
      </span>
    );
  }

  if (!tx_hash) {
    return <span>--</span>;
  }

  return <Hash txHash={tx_hash} chainId={data.chain} />;
}
