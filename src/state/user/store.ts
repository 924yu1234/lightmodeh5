import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useBaseRefreshIndex from 'src/hooks/useRefreshData/useBaseRefreshIndex';
import { logger } from 'src/utils/logger';

import { AppState } from '..';
import { updateStore } from './reducer';

const STORE_KEY = 'store:trade_user';

export function useGetStoreVal(key: string, useSessionStorage = false) {
  const storeIndex = useSelector((state: AppState) => state.user.storeIndex);
  const baseIndex = useBaseRefreshIndex();
  return useMemo(() => {
    const storage = useSessionStorage ? sessionStorage : localStorage;
    const data = JSON.parse(storage.getItem(STORE_KEY) || '{}');
    return getNestedValue(data, key);
    // 触发更新值
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIndex, baseIndex, key, useSessionStorage]);
}

export function useSetStore() {
  const dispatch = useDispatch();
  return useCallback(
    (
      key: string,
      value: Record<string, unknown> | string | boolean | number[],
      isMerge = false,
      useSessionStorage = false
    ) => {
      const storage = useSessionStorage ? sessionStorage : localStorage;
      const data = JSON.parse(storage.getItem(STORE_KEY) || '{}');
      try {
        if (isMerge) {
          const pre = data[key] || {};
          storage.setItem(
            STORE_KEY,
            JSON.stringify({
              ...data,
              [key]: {
                ...pre,
                ...(value as Record<string, unknown>),
              },
            })
          );
          return;
        }
        storage.setItem(
          STORE_KEY,
          JSON.stringify({
            ...data,
            [key]: value,
          })
        );
        dispatch(updateStore());
      } catch (error) {
        logger.error(error);
      }
    },
    [dispatch]
  );
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((current, key) => {
    return current ? current[key] : undefined;
  }, obj);
}
