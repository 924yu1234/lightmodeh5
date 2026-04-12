import React from 'react';

import { useDexAccount } from 'src/state/dexAccount/hooks';

import Address from '../Address';

export default function SendTxSender({ data }: { data: any }) {
  const { DAs } = useDexAccount();
  const chain_to = data?.chain_to;
  if (DAs?.[chain_to]) {
    return <Address address={DAs[chain_to]?.address} chainId={chain_to} />;
  }
  return chain_to;
}
