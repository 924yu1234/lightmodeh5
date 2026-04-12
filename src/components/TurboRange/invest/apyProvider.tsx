import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import calcAPR from 'src/apps/xstocks/utils/apyCalculatorV2';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangeProduct } from 'src/state/turboRange/reducer';
import { useThemeParams } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import { multiply } from 'src/utils/numberUtils';

export interface ApyContext {
  product: TurboRangeProduct;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  setPrice: ({
    minPrice,
    maxPrice,
  }: {
    minPrice: string;
    maxPrice: string;
  }) => void;
  apy: string;
  aprType: 'day' | 'week' | 'month';
  setAprType: (aprType: 'day' | 'week' | 'month') => void;
}

const ApyContext = React.createContext<ApyContext>({} as ApyContext);

export default function ApyProvider({
  children,
  poolAddress,
  initialMinPrice,
  initialMaxPrice,
}: {
  children: React.ReactElement;
  poolAddress: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
}) {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [apy, setApy] = useState<string>('');
  const [aprType, setAprType] = useState<'day' | 'week' | 'month'>('week');

  const location = useLocation();
  const product = useTurboRangeProduct(poolAddress);
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();

  const { minPrice: minPriceQuery, maxPrice: maxPriceQuery } =
    queryString.parse(location.search) ?? {};

  const { currentPrice, showDecimals, percent_min, percent_max } = product;

  // 初始化价格范围
  useEffect(() => {
    if (initialMinPrice) {
      setMinPrice(initialMinPrice);
    } else if (isNumber(minPriceQuery)) {
      setMinPrice(minPriceQuery as string);
    } else {
      setMinPrice(
        digit.formatWithDecimals(
          multiply(currentPrice, 1 + Number(percent_min)),
          showDecimals,
          {
            floor: true,
          }
        )
      );
    }
    if (initialMaxPrice) {
      setMaxPrice(initialMaxPrice);
    } else if (isNumber(maxPriceQuery)) {
      setMaxPrice(maxPriceQuery as string);
    } else {
      setMaxPrice(
        digit.formatWithDecimals(
          multiply(currentPrice, 1 + Number(percent_max)),
          showDecimals,
          {
            ceil: true,
          }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.poolAddress]);

  // 设置价格范围（带路由更新）
  const setPrice = useCallback(
    ({ minPrice, maxPrice }: { minPrice: string; maxPrice: string }) => {
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      if (isMobile && product?.poolAddress) {
        navigate(
          `/turbo-range/invest/${product?.poolAddress}?minPrice=${minPrice}&maxPrice=${maxPrice}`,
          { replace: true }
        );
      }
    },
    [isMobile, product?.poolAddress, navigate]
  );

  // 计算 APY
  useEffect(() => {
    if (
      !product?.poolAddress ||
      !minPrice ||
      !maxPrice ||
      !currentPrice ||
      Number(minPrice) >= Number(maxPrice)
    ) {
      setApy('0');
      return;
    }
    calcAPR({
      poolId: product?.poolAddress,
      minPrice,
      maxPrice,
      aprType,
      currentPrice,
    } as any).then((res) => {
      setApy(res?.totalNetAPR as any);
    });
  }, [
    minPrice,
    maxPrice,
    product?.poolAddress,
    currentPrice,
    aprType,
    product.poolUrl,
  ]);

  const value = useMemo(() => {
    return {
      product,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      setPrice,
      apy,
      aprType,
      setAprType,
    };
  }, [product, minPrice, maxPrice, setPrice, apy, aprType]);

  return <ApyContext.Provider value={value}>{children}</ApyContext.Provider>;
}

export function useApyContext() {
  return useContext(ApyContext);
}
