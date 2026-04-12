import { useCallback } from 'react';

import { Type_DAChains } from 'src/da';
import { useChains, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import { useDexAccount } from '../hooks';

export function useCheckDAs() {
  const chains = useChains();
  const { DAs, hasFetchedDA } = useDexAccount();
  const showModal = useShowModal();

  return useCallback(
    (chain: Type_DAChains) => {
      const missingDAs = chains.filter((chain) => !DAs?.[chain]);
      if (hasFetchedDA && missingDAs.includes(chain) && missingDAs.length > 0) {
        showModal({
          modal: ModalKeys.sync_da_tips,
          syncChains: missingDAs,
        });
        return false;
      }
      return true;
    },
    [chains, DAs, showModal, hasFetchedDA]
  );
}
