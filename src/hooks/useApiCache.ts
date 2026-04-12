import { useCallback, useEffect, useRef } from 'react';

interface CacheData<T> {
  data: T | null;
  timestamp: number;
}

// 全局缓存对象
const apiCache: Record<string, CacheData<any>> = {};

export default function useApiCache<T, P>(
  cacheKey: string,
  fetchFunction: (params: P) => Promise<T>,
  options?: {
    ttl?: number; // 缓存有效期（毫秒）
  }
) {
  const mountedRef = useRef(true);
  const ttl = options?.ttl || 5 * 60 * 1000; // 默认5分钟

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetch = useCallback(
    async (params?: P) => {
      const key = `${cacheKey}:${JSON.stringify(params)}`;

      // 检查是否存在有效缓存
      const cachedData = apiCache[key];
      const cacheExpired =
        !cachedData || Date.now() - cachedData.timestamp > ttl;

      // 如果有缓存且未过期，直接返回缓存数据
      if (!cacheExpired && cachedData.data) {
        // 后台刷新缓存
        fetchFunction(params as P)
          .then((result) => {
            if (mountedRef.current) {
              apiCache[key] = {
                data: result,
                timestamp: Date.now(),
              };
            }
          })
          .catch(() => {
            // console.error('Background refresh error:', error);
          });

        return cachedData.data;
      }

      // 没有缓存或已过期，执行请求
      const result = await fetchFunction(params as P);

      if (mountedRef.current) {
        apiCache[key] = {
          data: result,
          timestamp: Date.now(),
        };
      }

      return result;
    },
    [cacheKey, fetchFunction, ttl]
  );

  return fetch;
}
