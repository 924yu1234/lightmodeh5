import React, { useCallback } from 'react';

import ChainsList from 'src/components/SearchChainSelect/list';
import { Type_DAChains } from 'src/da';
import { useChains } from 'src/state/application/hooks';

export default function ManageMenuNetworkPanel({
  chain,
  setChain,
  onClose,
}: {
  chain: Type_DAChains | 'all';
  setChain: (chain: Type_DAChains | 'all') => void;
  onClose: () => void;
}) {
  const chains = useChains();

  const handleSelect = useCallback(
    (nextChain: Type_DAChains | 'all') => {
      setChain(nextChain);
      onClose();
    },
    [onClose, setChain]
  );

  return (
    <div className="manage-panel manage-panel-network">
      <div className="chain-list-shell">
        <ChainsList
          chain={chain}
          chains={chains}
          onSelect={handleSelect}
          maxHeight={420}
        />
      </div>
    </div>
  );
}
