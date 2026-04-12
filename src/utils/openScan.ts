import { useCallback, useMemo } from 'react';

import { DG_SCAN } from 'src/constants/dex';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import WindowOpen from './windowOpen';

export default function useOpenScan(address: string, showWarning?: boolean) {
  const showModal = useShowModal();
  const url = getScanUrl({ address });
  const openScan = useCallback(() => {
    if (!url) return;
    if (showWarning) {
      showModal({ modal: ModalKeys.tips_scan, link: url });
      return;
    }
    WindowOpen(url);
  }, [showModal, url, showWarning]);

  return useMemo(() => {
    return {
      scanUrl: url,
      openScan,
    };
  }, [url, openScan]);
}

export function getScanUrl({ address }: { address?: string }) {
  if (address) {
    return `${DG_SCAN}/address/${address}`;
  }
  return '';
}
