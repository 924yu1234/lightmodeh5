import React from 'react';

import { useIntl } from 'src/locals';

import EstNetworkFee from '../EstNetworkFee';
import { useSendData } from './sendDataProvider';

export default function NetworkFee() {
  const intl = useIntl();
  const { tryResp, doTry } = useSendData();

  return (
    <div className="info-item">
      <div className="info-item-label">{intl.est_network_fee}</div>
      <div className="info-item-value">
        <EstNetworkFee tryResp={tryResp} onSelectPayGasToken={doTry} />
      </div>
    </div>
  );
}
