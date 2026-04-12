import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'src/state';
import { useRegionInfo, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import { useCurrentSwapPair } from './hooks';
import { setSwapPairBlacklist } from './reducer';
import { getSwapPairBlacklist } from './services/ticker';

const fetchingMap: Record<string, boolean> = {};

export default function useCheckPairBlacklist() {
  const showModal = useShowModal();
  const pair = useCurrentSwapPair();
  const pairBlacklist = useSelector(
    (state: AppState) => state.swapPair.pairBlacklist
  );
  const key = `${pair?.baseToken?.code}_${pair?.baseToken?.chain}`;
  const { regionCode } = useRegionInfo();
  const dispatch = useDispatch();

  const currentPairBlacklist = useMemo(() => {
    return pairBlacklist[key];
  }, [pairBlacklist, key]);

  useEffect(() => {
    if (!currentPairBlacklist) {
      if (fetchingMap[key]) {
        return;
      }
      fetchingMap[key] = true;
      getSwapPairBlacklist({
        chain: pair?.baseToken?.chain,
        code: pair?.baseToken?.code,
      }).then((res) => {
        dispatch(setSwapPairBlacklist({ key, blacklist: res }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const showTips = useMemo(() => {
    if (currentPairBlacklist?.length > 0) {
      if (
        currentPairBlacklist.some((item) => item.regions?.includes(regionCode))
      ) {
        return true;
      }
    }
    return false;
  }, [currentPairBlacklist, regionCode]);

  return useCallback(() => {
    if (showTips) {
      showModal({ modal: ModalKeys.tips_xstocks, baseToken: pair?.baseToken });
      return false;
    }
    return true;
  }, [showModal, showTips, pair?.baseToken]);
}
