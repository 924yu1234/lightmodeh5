import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isNumber } from 'src/utils/digit';

import { OrderDir, Pages } from 'js/constants/consts';
import { useWalletWeb3 } from 'js/providers/useWallet';
import {
  useDexChainId,
  useShowModalBlacklistTips,
} from 'js/state/application/hooks';
import log from 'js/utils/log';
import EVENTS from 'js/utils/log/EVENTS';

import { AppState } from '..';
import { useDexAccount, useShowAppFeature } from '../dexAccount/hooks';
import {
  changeChoosePairPopSelectedTab,
  changeFirstOrderIsPlaced,
  changeFlag,
  changeHideAssets,
  changeHideGridPreviewOrders,
  changeHideGridPreviewOrdersInGraph,
  changeMobileAdvancedTab,
  changeProfitsTab,
  changeShowAdvancedConfig,
  closeBanner,
  Flag,
  PageType,
  saveExportDataJob,
  setChartPeriod,
  setShowCurrentPair,
  setTheme,
  updateHideGridFreeTips,
  updateSort,
} from './reducer';
import { useGetStoreVal, useSetStore } from './store';

// theme
export function useThemeType() {
  return useSelector((state: AppState) => state?.user?.theme);
}

// referralCode 已废弃，使用url参数s=123
export function useReferralCode() {
  return useSelector((state: AppState) => state?.user?.referralCode);
}

export function useSetTheme() {
  const dispatch = useDispatch();
  return useCallback(
    ({ theme }: { theme: any }) => {
      dispatch(setTheme({ theme }));
    },
    [dispatch]
  );
}

// PairBaseNotDefaultTokenTips
export function useIsHideBaseDefaultTokenTips({ baseId }: any) {
  const pre = useGetStoreVal(`hideBaseDefaultTokenTipsMap`) || {};
  return !!pre[baseId];
}

export function useHideBaseDefaultTokenTips() {
  const set = useSetStore();
  return useCallback(
    ({ baseId }: any) => {
      set('hideBaseDefaultTokenTipsMap', { [baseId]: true }, true);
    },
    [set]
  );
}

// period
export function useChartPeriod({ page = Pages.common } = {}) {
  const periods = useSelector((state: AppState) => state?.user?.periods);
  return useMemo(() => {
    return (periods as any)?.[page] || '15';
  }, [periods, page]);
}

export function useSetChartPeriod() {
  const dispatch = useDispatch();
  return useCallback(
    ({ period, page = Pages.common }: any) => {
      dispatch(setChartPeriod({ period, page }));
    },
    [dispatch]
  );
}

// 限价单gasFee不够取消剩余订单提升
export function useIsHideLimitOrderCanceledByInsufficientFeeTips() {
  return useGetStoreVal(`hideLimitOrderCanceledByInsufficientFeeTips`);
}

export function useHideLimitOrderCanceledByInsufficientFeeTips() {
  const set = useSetStore();
  return useCallback(() => {
    set('hideLimitOrderCanceledByInsufficientFeeTips', true);
  }, [set]);
}

// 市价单滑点保护取消订单提升
export function useIsHideMarketOrderCanceledByDepthTips() {
  return useGetStoreVal(`hideMarketOrderCanceledByDepthTips`);
}

export function useHideMarketOrderCanceledByDepthTips() {
  const set = useSetStore();
  return useCallback(() => {
    set('hideMarketOrderCanceledByDepthTips', true);
  }, [set]);
}

export function useExportDataJob() {
  const dexChainId = useDexChainId();
  const { account = '' } = useWalletWeb3();

  const job = useSelector((state: AppState) => {
    return ((state?.user?.exportDataJobs as any)?.[dexChainId] as any)?.[
      account?.toLowerCase()
    ];
  });

  return useMemo(() => {
    return job || {};
  }, [job]);
}

export function useSaveExportDataJob() {
  const dexChainId = useDexChainId();
  const { account = '' } = useWalletWeb3();

  const dispatch = useDispatch();
  return useCallback(
    (job: any) => dispatch(saveExportDataJob({ job, dexChainId, account })),
    [dispatch, dexChainId, account]
  );
}

export function useChoosePairPopSelectedTab() {
  const dexChainId = useDexChainId();
  const val = useSelector(
    (state: AppState) =>
      (state.user.choosePairPopSelectedTab as any)[dexChainId]
  );
  return useMemo(() => {
    return val || 'all';
  }, [val]);
}

export function useChangeChoosePairPopSelectedTab() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (tab: any) => {
      dispatch(changeChoosePairPopSelectedTab({ dexChainId, tab }));
    },
    [dispatch, dexChainId]
  );
}

export function useIsShowCurrentPair(page: PageType) {
  const res = useSelector((state: AppState) => state.user.onlyShowCurrentPair);
  return useMemo(() => {
    return !!res[page];
  }, [res, page]);
}

export function useSetShowCurrentPair(page: PageType) {
  const dispatch = useDispatch();
  return useCallback(
    (showCurrentPair: any) => {
      dispatch(setShowCurrentPair({ showCurrentPair, page }));
    },
    [dispatch, page]
  );
}

export function useShowAdvancedConfig() {
  const dexChainId = useDexChainId();
  const val = useSelector(
    (state: AppState) => (state.user.showAdvancedConfig as any)[dexChainId]
  );
  const firstOrderIsPlaced = useSelector(
    (state: AppState) => (state.user.firstOrderIsPlaced as any)[dexChainId]
  );
  return useMemo(() => {
    return val === undefined ? !firstOrderIsPlaced : val;
  }, [val, firstOrderIsPlaced]);
}

export function useChangeShowAdvancedConfig() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (flag: any) => {
      dispatch(changeShowAdvancedConfig({ dexChainId, flag }));
    },
    [dispatch, dexChainId]
  );
}

export function useChangeFirstOrderIsPlaced() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (flag: any) => {
      dispatch(changeFirstOrderIsPlaced({ dexChainId, flag }));
    },
    [dispatch, dexChainId]
  );
}

export function useIsHideGridPreviewOrders() {
  const dexChainId = useDexChainId();
  const flag = useSelector(
    (state: AppState) => (state.user.hideGridPreviewOrders as any)[dexChainId]
  );
  return useMemo(() => {
    return !!flag;
  }, [flag]);
}

export function useChangeHideGridPreviewOrders() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (flag: any) => {
      dispatch(changeHideGridPreviewOrders({ dexChainId, flag }));
    },
    [dispatch, dexChainId]
  );
}

export function useIsHideGridPreviewOrdersInGraph() {
  const dexChainId = useDexChainId();
  const flag = useSelector(
    (state: AppState) =>
      (state.user.hideGridPreviewOrdersInGraph as any)[dexChainId]
  );
  return useMemo(() => {
    return !!flag;
  }, [flag]);
}

export function useChangeHideGridPreviewOrdersInGraph() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (flag: any) => {
      dispatch(changeHideGridPreviewOrdersInGraph({ dexChainId, flag }));
    },
    [dispatch, dexChainId]
  );
}

export function useIsHideAssets() {
  const dexChainId = useDexChainId();
  const flag = useSelector(
    (state: AppState) => (state.user.hideAssets as any)[dexChainId]
  );
  return useMemo(() => {
    return !!flag;
  }, [flag]);
}

export function useChangeHideAssets() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();

  return useCallback(
    (flag: any) => {
      dispatch(changeHideAssets({ dexChainId, flag }));
    },
    [dispatch, dexChainId]
  );
}

export function useCheckBlacklist() {
  const dexAccount = useDexAccount();
  const showModal = useShowModalBlacklistTips();
  return useCallback(() => {
    if (dexAccount.isInBlacklist) {
      showModal();

      log([
        {
          id: EVENTS.show_blacklist_tips,
          event: 'show_blacklist_tips',
          log: JSON.stringify({
            log_error: 'blacklist err',
            account: dexAccount?.account,
          }),
        },
      ]);
      return false;
    }
    return true;
  }, [showModal, dexAccount?.isInBlacklist, dexAccount?.account]);
}

export function useCloseBanner() {
  const dispatch = useDispatch();

  return useCallback(
    ({ id }: any) => {
      dispatch(closeBanner({ id }));
    },
    [dispatch]
  );
}

// hideEnableQuickTradingTips
export function useIsHideEnableQuickTradingTipsForever() {
  return useGetStoreVal(`hideEnableQuickTradingTips`);
}

export function useHideEnableQuickTradingTipsForever() {
  const set = useSetStore();
  return useCallback(() => {
    set('hideEnableQuickTradingTips', true);
  }, [set]);
}

// sort

export function useSort(
  key:
    | 'asset_balances'
    | 'm_home_topPairs'
    | 'swap_hots'
    | 'swap_favorites'
    | 'swap_stocks'
    | `pairs_${string}`
): {
  orderBy: any;
  orderDir: OrderDir;
} {
  return useSelector(
    (state: AppState) => (state.user.sortMap as any)?.[key] || {}
  ) as any;
}

export function useUpdateSort(
  key:
    | 'asset_balances'
    | 'm_home_topPairs'
    | 'choose_swap_pairs'
    | 'swap_hots'
    | 'swap_favorites'
    | 'swap_stocks'
    | `pairs_${string}`
) {
  const dispatch = useDispatch();

  return useCallback(
    ({ orderBy, orderDir }: { orderBy: string; orderDir: OrderDir }) => {
      dispatch(updateSort({ key, orderBy, orderDir }));
    },
    [dispatch, key]
  );
}

// updateHideGridFreeTips
export function useIsHideGridFreeTips() {
  return useSelector((state: AppState) => !!state.user.hideGridFreeTips);
}

export function useChangeHideGridFreeTips() {
  const dispatch = useDispatch();

  return useCallback(
    (hideGridFreeTips: boolean) => {
      dispatch(updateHideGridFreeTips({ hideGridFreeTips }));
    },
    [dispatch]
  );
}

export function useMobileAdvancedTab() {
  const val = useSelector(
    (state: AppState) => state.user.mobileAdvancedTab as any
  );
  return useMemo(() => {
    return val || 'grid';
  }, [val]);
}

export function useChangeMobileAdvancedTab() {
  const dispatch = useDispatch();

  return useCallback(
    (tab: any) => {
      dispatch(changeMobileAdvancedTab({ tab }));
    },
    [dispatch]
  );
}

export function useProfitsTab() {
  const val = useSelector((state: AppState) => state.user.profitsTab as any);
  return useMemo(() => {
    return val || 'grid';
  }, [val]);
}

export function useChangeProfitsTab() {
  const dispatch = useDispatch();

  return useCallback(
    (tab: any) => {
      dispatch(changeProfitsTab({ tab }));
    },
    [dispatch]
  );
}

export function useUserFlag(key: Flag | string): any {
  return useSelector((state: AppState) => state.user.flag[key as Flag]);
}

export function useChangeFlag(key: Flag | string) {
  const dispatch = useDispatch();

  return useCallback(
    (value: any) => {
      dispatch(changeFlag({ key, value }));
    },
    [dispatch, key]
  );
}

export function useGridInvestmentType(): 'singleQuote' | 'quoteBase' {
  const val = useSelector(
    (state: AppState) => state.user.gridInvestmentType as any
  );
  return useMemo(() => {
    return val;
  }, [val]);
}

// 本地环境链接过的用户的最早的开户时间
export function useEarliestUserCreateTime() {
  const pre = useGetStoreVal(`earliestUserCreateTime`);
  if (pre) {
    return Number(pre);
  }
  return 0;
}

export function useSaveEarliestUserCreateTime() {
  const set = useSetStore();
  const pre = useEarliestUserCreateTime();
  return useCallback(
    (time: number) => {
      if (!pre || pre <= 0) {
        set('earliestUserCreateTime', `${time}`);
      } else {
        set('earliestUserCreateTime', `${time < pre ? time : pre}`);
      }
    },
    [set, pre]
  );
}

// 运营类已读消息
export function useReadedOperationMessageIds() {
  return useGetStoreVal(`readedOperationMessageIds`) || [];
}

export function useSaveReadedOperationMessageIds() {
  const set = useSetStore();
  const pre = useReadedOperationMessageIds();
  return useCallback(
    (ids: number[]) => {
      set('readedOperationMessageIds', [...pre, ...ids]);
    },
    [set, pre]
  );
}

// 资产类已读消息，前端额外记录一份用于Tab间同步
export function useReadedAssetMessageIds() {
  const { account } = useDexAccount();

  return useGetStoreVal(`readedAssetMessageIds_${account}`) || [];
}

export function useSaveReadAssetMessageIds() {
  const { account } = useDexAccount();

  const pre = useReadedAssetMessageIds();
  const set = useSetStore();
  return useCallback(
    (ids: number[]) => {
      set(`readedAssetMessageIds_${account}`, [...(pre || []), ...ids]);
    },
    [pre, set, account]
  );
}

// 资产类已读订单消息
export function useReadedAssetOrderMessageIds() {
  const { account } = useDexAccount();

  return useGetStoreVal(`readedAssetOrderMessageIds_${account}`) || [];
}

export function useSaveReadAssetOrderMessageIds() {
  const { account } = useDexAccount();

  const pre = useReadedAssetOrderMessageIds();
  const set = useSetStore();
  return useCallback(
    (ids: number[]) => {
      set(`readedAssetOrderMessageIds_${account}`, [...(pre || []), ...ids]);
    },
    [pre, set, account]
  );
}

// 资产类全部已读时记录时间，小于此时间的都做为已读
export function useReadedAllAssetMessageTime() {
  const { account } = useDexAccount();
  return useGetStoreVal(`readedAllAssetMessageTime_${account}`) || 0;
}

export function useSaveReadAllAssetMessageTime() {
  const { account } = useDexAccount();
  const pre = useReadedAllAssetMessageTime();
  const set = useSetStore();
  return useCallback(
    (time: number) => {
      if (!pre || pre <= 0 || !isNumber(pre)) {
        set(`readedAllAssetMessageTime_${account}`, `${time}`);
      } else {
        set(
          `readedAllAssetMessageTime_${account}`,
          `${time > pre ? time : pre}`
        );
      }
    },
    [pre, set, account]
  );
}

export function useUserSessionStorage(key: string) {
  return useGetStoreVal(key, true);
}

export function useSetUserSessionStorage(key: string) {
  const set = useSetStore();
  return useCallback(
    (value: any) => {
      set(key, value, false, true);
    },
    [set, key]
  );
}

export function useShowMHomeDownloadBanner() {
  const flag = useUserFlag('m_home_download_banner');
  const set = useChangeFlag('m_home_download_banner');
  const showApp = useShowAppFeature();
  const show = useMemo(() => {
    if (!showApp) return false;
    if (!flag) return true;
    const time = Date.now();
    return time > flag;
  }, [flag, showApp]);
  const close = useCallback(() => {
    if (!flag) {
      set(Date.now() + 2592000000); // 30天
      return;
    }
    if (flag) {
      set(Date.now() + 3110400000000); // 100年
    }
  }, [flag, set]);
  return useMemo(() => {
    return { show, close };
  }, [show, close]);
}
