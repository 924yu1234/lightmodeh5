import React from 'react';

import Address from '../Address';

export default function Recipient({ data }: { data: any }) {
  const chain_to = data?.chain_to;
  const address = data?.to_address;
  return <Address address={address} chainId={chain_to} />;
}
