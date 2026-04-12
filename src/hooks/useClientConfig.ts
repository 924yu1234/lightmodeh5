import { useEffect, useMemo, useState } from 'react';

import { fetchConfigs } from 'src/state/application/service';

// 全局缓存对象
const configCache = new Map<
  string,
  {
    data: any;
    timestamp: number;
    promise?: Promise<any>;
  }
>();

// 缓存过期时间（60分钟）
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;

export default function useClientConfig(key: string) {
  const [clientConfig, setClientConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!key) {
      setLoading(false);
      return;
    }

    const now = Date.now();
    const cached = configCache.get(key);

    // 检查缓存是否有效
    if (cached && now - cached.timestamp < CACHE_EXPIRY_TIME) {
      setClientConfig(cached.data);
      setLoading(false);
      setError(null);
      return;
    }

    // 如果已经有正在进行的请求，复用该请求
    if (cached?.promise) {
      cached.promise
        .then((res) => {
          setClientConfig(res);
          setError(null);
        })
        .catch((err) => {
          setError(err);
          setClientConfig(null);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    // 发起新的请求
    setLoading(true);
    setError(null);

    const promise = fetchConfigs(key);

    // 将请求promise存储到缓存中，避免重复请求
    configCache.set(key, {
      data: cached?.data || null,
      timestamp: cached?.timestamp || 0,
      promise,
    });

    promise
      .then((res) => {
        // 更新缓存
        configCache.set(key, {
          data: res,
          timestamp: now,
        });
        setClientConfig(res);
        setError(null);
      })
      .catch((err) => {
        // 请求失败时清除promise，但保留旧数据（如果有的话）
        const currentCache = configCache.get(key);
        if (currentCache) {
          configCache.set(key, {
            data: currentCache.data,
            timestamp: currentCache.timestamp,
          });
        }
        setError(err);
        setClientConfig(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  return useMemo(() => {
    return {
      data: clientConfig,
      loading,
      error,
    };
  }, [clientConfig, loading, error]);
}

export function useCommonConfig(key: string) {
  return useClientConfig(`commonConfig_${key}`);
}
