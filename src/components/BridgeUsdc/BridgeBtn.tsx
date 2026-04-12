import React from 'react';

import { PrimaryBtn } from 'src/UI';

import IconBridge from 'src/components/Icons/bridge';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import useBridgeUsdc from 'src/state/dexAccount/opr/useBridgeUsdc';

export default function BridgeBtn() {
  const intl = useIntl();
  const bridgeUsdc = useBridgeUsdc();
  const { hide } = useModals(ModalKeys.fungibleUsdcModal);

  return (
    <PrimaryBtn
      eventName="usdc_bridge"
      className="usdc-bridge-btn"
      style={{ height: '40px', minHeight: '40px' }}
      onClick={() => {
        hide();
        bridgeUsdc({ fromToken: undefined });
      }}
    >
      <IconBridge size={20} />
      <span style={{ marginLeft: '5px' }}>{intl.Bridge}</span>
    </PrimaryBtn>
  );
}
