import { useEffect, useMemo, useState } from 'react';

import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { useFetchTurboRangePositionHistory } from 'src/state/turboRange/service';

export function usePositionHistoryData(position?: TurboRangePosition) {
  const fetchHistory = useFetchTurboRangePositionHistory();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!position?.positionAddress) {
      setItems([]);
      return;
    }
    setLoading(true);
    fetchHistory({
      position: position.positionAddress,
    })
      .then((resp) => {
        const list = (resp?.list || []).filter(Boolean);
        setItems(list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [fetchHistory, position?.positionAddress]);

  return useMemo(
    () => ({
      items,
      loading,
    }),
    [items, loading]
  );
}
