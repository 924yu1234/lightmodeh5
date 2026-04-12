import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';

import { DailyTotalAumApiItem, getDailyTokenSupply } from './service';

export function useDailyTokenSupply() {
  const { list } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 100,
    orderBy: 'index',
    orderDir: 'asc',
    noRefresh: true,
  });
  const { data: apiData = [] } = useQuery<DailyTotalAumApiItem[]>({
    queryKey: ['xstocks', 'dailyTotalAum'],
    queryFn: () => getDailyTokenSupply() as Promise<any>,
  });

  const codesString = useMemo(() => {
    return list
      .map((item) => item.baseToken?.code)
      .filter(Boolean)
      .join(',');
  }, [list]);
  return useMemo(() => {
    if (!apiData?.length || !codesString) {
      return { dailyTotalAumData: [], latestAumData: [] };
    }
    const rawDailyTotalAumData: DailyTotalAumApiItem[] = apiData || [];

    const codes = codesString.split(',');
    const data: DailyTotalAumApiItem[] = rawDailyTotalAumData;

    // 按token和日期组织数据
    const tokenDataMap = new Map<string, Map<string, DailyTotalAumApiItem>>();
    for (const item of data) {
      if (!tokenDataMap.has(item.token_mint_address)) {
        tokenDataMap.set(item.token_mint_address, new Map());
      }
      const tokenMap = tokenDataMap.get(item.token_mint_address);
      if (tokenMap) {
        tokenMap.set(item.date, item);
      }
    }

    // 获取所有日期并排序
    const allDates = Array.from(
      new Set(data.map((item: DailyTotalAumApiItem) => item.date))
    ).sort();

    // 为每个token进行前向填充
    const filledData: DailyTotalAumApiItem[] = [];

    tokenDataMap.forEach((tokenData, tokenAddress) => {
      let lastValidAum = 0; // 保存最后一个有效的AUM值

      for (const date of allDates as string[]) {
        const currentData = tokenData.get(date);

        if (currentData) {
          // 如果当天有数据且aum_usd有值，使用当天的值
          if (
            typeof currentData.aum_usd === 'number' &&
            currentData.aum_usd > 0
          ) {
            lastValidAum = currentData.aum_usd;
            filledData.push(currentData);
          } else {
            // 如果当天有数据但aum_usd无值，使用前一天的值
            filledData.push({
              ...currentData,
              aum_usd: lastValidAum,
            });
          }
        } else {
          // 如果当天没有数据，创建一个使用前一天aum_usd的记录
          const sampleData = data.find(
            (item: DailyTotalAumApiItem) =>
              item.token_mint_address === tokenAddress
          );
          if (sampleData) {
            filledData.push({
              date,
              symbol: sampleData.symbol,
              name: sampleData.name,
              token_mint_address: tokenAddress,
              raw_supply: sampleData.raw_supply || 0,
              price_usd: sampleData.price_usd || 0,
              aum_usd: lastValidAum,
              price_available: sampleData.price_available || false,
              price_source: sampleData.price_source || '',
            });
          }
        }
      }
    });

    const lastDate = filledData[filledData.length - 1]?.date;

    const calculatedLatestAumData = filledData
      .filter(
        (item) =>
          codes.includes(item.token_mint_address) && item.date === lastDate
      )
      .map((d) => ({
        address: d.token_mint_address,
        aum: d.aum_usd || 0,
      }));

    // 按日期汇总所有token的AUM
    const res = filledData.reduce(
      (
        acc: Record<string, { date: string; aum_usd: number }>,
        item: DailyTotalAumApiItem
      ) => {
        let pre = acc[item.date];
        if (pre) {
          pre.aum_usd += item.aum_usd || 0;
        } else {
          pre = {
            date: item.date,
            aum_usd: item.aum_usd || 0,
          };
        }
        acc[item.date] = pre;
        return acc;
      },
      {}
    );

    // 按日期排序并设置数据
    const sortedData = Object.values(res).sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const totalAum = sortedData[sortedData.length - 1]?.aum_usd || 0;
    return {
      dailyTotalAumData: sortedData,
      latestAumData: calculatedLatestAumData,
      totalAum,
    };
  }, [apiData, codesString]);
}
