import { useCallback, useEffect, useMemo, useState } from 'react';
import { orderBy as orderByFn } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useSetLocale } from 'src/locals';
import { useThemeParams } from 'src/theme';
import { isNumber } from 'src/utils/digit';

import { AppState } from '..';
import { useModals } from '../application/hooks';
import ModalKeys from '../application/modalKeys';
import {
  refreshTurboRangePostions,
  setHasShowedInitReturnValue,
  TurboRangePosition,
  TurboRangeProduct,
  TurboRangeRangeStatusTarget,
  TurboRangeStrategy,
  updateRecentTrades,
  updateTurboRangeState,
} from './reducer';
import { useGetAllTurboRangePositions } from './service';

export function useTurboRangeState() {
  return useSelector((state: AppState) => state.turboRange);
}

export function useSetTurboRangeState() {
  const dispatch = useDispatch();
  return useCallback(
    (params: any) => {
      dispatch(updateTurboRangeState(params));
    },
    [dispatch]
  );
}

export function useIsLoadingTurboRangeProducts() {
  return useSelector((state: AppState) => state.turboRange.loadingProducts);
}

export function useTurboRangeProducts({ search }: { search: string }) {
  const products = useSelector((state: AppState) => state.turboRange.products);
  const productsSettings = useSelector(
    (state: AppState) => state.turboRange.productsSettings
  );
  const loadingProducts = useSelector(
    (state: AppState) => state.turboRange.loadingProducts
  );
  const { locale } = useSetLocale();
  return useMemo(() => {
    const searchLower = search.toLowerCase();
    return {
      products: (products || [])
        .map((product: TurboRangeProduct) => {
          return {
            ...product,
            ...productsSettings[product.poolAddress],
            tvl: product.tvl,
          };
        })
        .filter((product: TurboRangeProduct) => {
          if (!search) return true;
          const productName =
            product.productName?.[locale] ||
            product.productName?.['en-US'] ||
            product.name;
          if (productName?.toLowerCase().includes(searchLower)) return true;
          if (product.baseToken.symbol?.toLowerCase().includes(searchLower))
            return true;
          if (product.name?.toLowerCase().includes(searchLower)) return true;
          return false;
        }),
      loadingProducts,
    };
  }, [products, loadingProducts, search, productsSettings, locale]);
}

export function useShowLoadingSkeleton() {
  const loadingProducts = useSelector(
    (state: AppState) => state.turboRange.loadingProducts
  );
  const loadingStrategyLeaderboards = useSelector(
    (state: AppState) => state.turboRange.loadingStrategyLeaderboards
  );
  const loadingPositions = useSelector(
    (state: AppState) => state.turboRange.loadingPositions
  );
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (loadingProducts || loadingStrategyLeaderboards) {
      setShowSkeleton(true);
      return;
    }
    // 产品与榜单已完成；只有当持仓也完成后才关闭
    if (!loadingProducts && !loadingStrategyLeaderboards && !loadingPositions) {
      setShowSkeleton(false);
    }
  }, [loadingProducts, loadingStrategyLeaderboards, loadingPositions]);

  return showSkeleton;
}

export function useTurboRangeActivePositions() {
  const positions = useSelector(
    (state: AppState) => state.turboRange.positions
  );
  const loadingPositions = useSelector(
    (state: AppState) => state.turboRange.loadingPositions
  );
  return useMemo(() => {
    return {
      positions: orderByFn(positions || [], 'created_at', 'desc'),
      loadingPositions: !!loadingPositions,
    };
  }, [positions, loadingPositions]);
}

export function useTurboRangeStrategyLeaderboards() {
  const strategyLeaderboards = useSelector(
    (state: AppState) => state.turboRange.strategyLeaderboards
  );
  const loadingStrategyLeaderboards = useSelector(
    (state: AppState) => state.turboRange.loadingStrategyLeaderboards
  );

  return useMemo(() => {
    return {
      updatedAt: strategyLeaderboards.updatedAt,
      currentPriceSnapshotAt: strategyLeaderboards.currentPriceSnapshotAt,
      topApy: strategyLeaderboards.topApy || [],
      hotToday: strategyLeaderboards.hotToday || [],
      bestReturns: strategyLeaderboards.bestReturns || [],
      loadingStrategyLeaderboards: !!loadingStrategyLeaderboards,
    };
  }, [loadingStrategyLeaderboards, strategyLeaderboards]);
}

export function useTurboRangeStrategyLeaderboard(
  board: 'topApy' | 'hotToday' | 'bestReturns'
): {
  positions: TurboRangeStrategy[];
  loadingStrategyLeaderboards: boolean;
} {
  const strategyLeaderboards = useTurboRangeStrategyLeaderboards();

  return useMemo(
    () => ({
      positions: strategyLeaderboards[board] || [],
      loadingStrategyLeaderboards:
        strategyLeaderboards.loadingStrategyLeaderboards,
    }),
    [board, strategyLeaderboards]
  );
}

export function useIsFetchingTurboRangeDetails() {
  return useSelector((state: AppState) => state.intentEarn.loadingDetail);
}

export function useTurboRangeProduct(poolAddress: string): TurboRangeProduct {
  const { products } = useTurboRangeProducts({ search: '' });
  return useMemo(() => {
    return (
      products.find(
        (product: TurboRangeProduct) => product.poolAddress === poolAddress
      ) || ({} as TurboRangeProduct)
    );
  }, [products, poolAddress]);
}

export function useTurboRangeProductName(poolAddress: string): string {
  const product = useTurboRangeProduct(poolAddress);
  const { locale } = useSetLocale();
  const name = useMemo(() => {
    if (!product) return '';
    return (
      product.productName?.[locale] ||
      product.productName?.['en-US'] ||
      product.name
    );
  }, [product, locale]);
  return name;
}

export function useTurboRangeProductCommonSenseSymbol(
  poolAddress: string
): string {
  const product = useTurboRangeProduct(poolAddress);
  return useMemo(() => product.commonSenseSymbol || product?.name, [product]);
}

export function useTurboRangePositionByIntentId(
  intentId: number,
  status?: 'FAILED' | 'SUCCESS'
): TurboRangePosition | undefined {
  const getAllTurboRangePositions = useGetAllTurboRangePositions();
  const positions = useSelector(
    (state: AppState) => state.turboRange.positions
  );
  const closedPositions = useSelector(
    (state: AppState) => state.turboRange.closedPositions
  );
  const [position, setPosition] = useState<TurboRangePosition | undefined>(
    undefined
  );
  const setState = useSetTurboRangeState();
  useEffect(() => {
    if (!intentId) return;
    if (status === 'FAILED') {
      return;
    }
    const activePosition = positions.find(
      (position: TurboRangePosition) => position.intentId === intentId
    );
    const closedPosition = closedPositions.find(
      (position: TurboRangePosition) => position.intentId === intentId
    );
    if (activePosition) {
      setPosition(activePosition);
    } else if (closedPosition) {
      setPosition(closedPosition);
    } else {
      setPosition(undefined);
      if (Date.now() - lastFetchClosedPositionsTimestamp < 1000 * 5) {
        return;
      }
      lastFetchClosedPositionsTimestamp = Date.now();
      getAllTurboRangePositions({
        status: 'CLOSED',
      }).then((resp: any) => {
        setState({
          closedPositions: resp.list,
        });
      });
    }
  }, [
    positions,
    intentId,
    status,
    closedPositions,
    setState,
    getAllTurboRangePositions,
  ]);

  return useMemo(() => {
    if (position?.intentId === intentId) {
      return position;
    }
    return undefined;
  }, [position, intentId]);
}

let lastFetchClosedPositionsTimestamp = 0;
export function useTurboRangePositionByPositionAddress(
  positionAddress: string
): TurboRangePosition | undefined {
  const positions = useSelector(
    (state: AppState) => state.turboRange.positions
  );
  const closedPositions = useSelector(
    (state: AppState) => state.turboRange.closedPositions
  );
  const getAllTurboRangePositions = useGetAllTurboRangePositions();

  const [position, setPosition] = useState<TurboRangePosition | undefined>(
    undefined
  );
  const setState = useSetTurboRangeState();
  useEffect(() => {
    if (!positionAddress) return;
    const activePosition = positions.find(
      (position: TurboRangePosition) =>
        position.positionAddress === positionAddress
    );
    const closedPosition = closedPositions.find(
      (position: TurboRangePosition) =>
        position.positionAddress === positionAddress
    );
    if (activePosition) {
      setPosition(activePosition);
    } else if (closedPosition) {
      setPosition(closedPosition);
    } else {
      setPosition(undefined);
      if (Date.now() - lastFetchClosedPositionsTimestamp < 1000 * 5) {
        return;
      }
      lastFetchClosedPositionsTimestamp = Date.now();
      getAllTurboRangePositions({
        status: 'CLOSED',
      }).then((resp: any) => {
        setState({
          closedPositions: resp.list,
        });
      });
    }
  }, [
    positions,
    getAllTurboRangePositions,
    positionAddress,
    closedPositions,
    setState,
  ]);

  return useMemo(() => {
    if (position?.positionAddress === positionAddress) {
      return position;
    }
    return undefined;
  }, [position, positionAddress]);
}

export function useRefreshTurboRangePostions() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshTurboRangePostions());
  }, [dispatch]);
}

export function useRefreshTurboRangePostionsIndex() {
  return useSelector(
    (state: AppState) => state.turboRange.refreshPostionsIndex
  );
}

// positionValue = principalValue + unclaimedRewardsValue
export function useTurboRangePositionSummary() {
  const positions = useTurboRangeActivePositions();
  const loadingPositions = useSelector(
    (state: AppState) => state.turboRange.loadingPositions
  );
  return useMemo(() => {
    return positions.positions.reduce(
      (acc, position) => {
        return {
          loadingPositions: acc.loadingPositions,
          positionValue:
            acc.positionValue + Number(position.positionValue || 0),
          yesterdayYield:
            acc.yesterdayYield +
            (isNumber(position.yesterdayYield)
              ? Number(position.yesterdayYield || '0')
              : 0),
          totalYield: acc.totalYield + Number(position.totalYield || 0),
          isYesterdayYieldUpdating:
            acc.isYesterdayYieldUpdating || position.isYesterdayUpdating,
          unclaimedRewardsValue:
            acc.unclaimedRewardsValue +
            Number(position.unclaimedRewardsValue || 0),
        };
      },
      {
        loadingPositions,
        positionValue: 0,
        yesterdayYield: 0,
        totalYield: 0,
        isYesterdayYieldUpdating: false,
        unclaimedRewardsValue: 0,
      }
    );
  }, [positions, loadingPositions]);
}

export function useNavigatePositionAndShowHistory() {
  const navigate = useCustomNavigate();
  const { isMobile } = useThemeParams();
  const updateTurboRangeState = useSetTurboRangeState();
  const { positioPageShowHistoryTimestamp } = useTurboRangeState();
  const { hide } = useModals(ModalKeys.turboRangeCreatePosition) as any;
  return useCallback(
    (time: number) => {
      window.turboRangeOprTime = time;
      let newTime = time;
      if (positioPageShowHistoryTimestamp) {
        // 如果时间差小于1小时，则微调触发查询历史
        if (time - positioPageShowHistoryTimestamp < 1000 * 60 * 60) {
          newTime = positioPageShowHistoryTimestamp - 1;
        }
      }
      updateTurboRangeState({
        positioPageShowHistoryTimestamp: newTime,
      });
      if (isMobile) {
        navigate(`/turbo-range/positions`, { replace: true });
      } else {
        navigate(`/turbo-range?tab=positions`);
        hide();
      }
    },
    [
      navigate,
      isMobile,
      updateTurboRangeState,
      positioPageShowHistoryTimestamp,
      hide,
    ]
  );
}

export function useProductSettingByPoolAddress(poolAddress: string) {
  const productsSettings = useSelector(
    (state: AppState) => state.turboRange.productsSettings
  );
  return useMemo(
    () => productsSettings[poolAddress] || {},
    [productsSettings, poolAddress]
  );
}

export function usePositionRangeStatus(
  position: TurboRangeRangeStatusTarget
): 'in-range' | 'out-of-range' | '' {
  const product = useTurboRangeProduct(position.poolAddress);
  return useMemo(() => {
    const currentPrice = position.currentPrice || product?.currentPrice;
    if (!currentPrice) return '';
    if (
      Number(position.minPrice) <= Number(currentPrice) &&
      Number(position.maxPrice) >= Number(currentPrice)
    ) {
      return 'in-range';
    }
    return 'out-of-range';
  }, [
    position.currentPrice,
    position.maxPrice,
    position.minPrice,
    product.currentPrice,
  ]);
}

export function useSaveRecentTrades() {
  const dispatch = useDispatch();
  return useCallback(
    ({
      positionAddress,
      withdrawTime,
      claimTime,
      increaseTime,
    }: {
      positionAddress: string;
      withdrawTime?: number;
      claimTime?: number;
      increaseTime?: number;
    }) => {
      dispatch(
        updateRecentTrades({
          positionAddress,
          withdrawTime,
          claimTime,
          increaseTime,
        } as any)
      );
    },
    [dispatch]
  );
}

export function useHasShowedInitReturnValue(positionAddress: string) {
  const hasShowedInitReturnValue = useSelector(
    (state: AppState) =>
      state.turboRange.hasShowedInitReturnValue[positionAddress]
  );
  return hasShowedInitReturnValue;
}

export function useSetHasShowedInitReturnValue() {
  const dispatch = useDispatch();
  return useCallback(
    (positionAddress: string, hasShowedInitReturnValue: boolean) => {
      dispatch(
        setHasShowedInitReturnValue({
          positionAddress,
          hasShowedInitReturnValue,
        } as any)
      );
    },
    [dispatch]
  );
}

export function useInvestMode() {
  return useSelector((state: AppState) => state.turboRange.investMode);
}

export function useSetInvestMode() {
  const dispatch = useDispatch();
  return useCallback(
    (investMode: 'single' | 'dual') => {
      dispatch(updateTurboRangeState({ investMode } as any));
    },
    [dispatch]
  );
}
