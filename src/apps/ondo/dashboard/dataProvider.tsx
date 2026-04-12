import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
  DailyHoldersApiItem,
  DailyTokenSupplyApiItem,
  DailyTransactionVolumeApiItem,
  DexPoolDailyDataApiItem,
  fetchDailyHolders,
  getDailyTotalAum,
} from './service';

export interface VaultDepositContext {
  poolDailyData: DexPoolDailyDataApiItem[];
  holdersData: DailyHoldersApiItem[];
  dailyTransactionVolumeData: DailyTransactionVolumeApiItem[];
  pre7DaysTransactionVolumeData: DailyTransactionVolumeApiItem[];
  latestAumData: DailyTokenSupplyApiItem[];
  latestHoldersData: DailyHoldersApiItem[];
  dailyTotalAumData: { date: string; aum_usd: number }[];
  totalAum: number;
  totalHolders: number;
  totalDexVolume: number;
  totalTvl: number;
  totalAssets: number;
}

const SetContext = React.createContext<VaultDepositContext>(
  {} as VaultDepositContext
);

export default function OndoDataProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [dailyTransactionVolumeData] = useState<any[]>([]);
  const [pre7DaysTransactionVolumeData] = useState<any[]>([]);
  const [poolDailyData] = useState<any[]>([]);
  const [holdersData, setHoldersData] = useState<any[]>([]);
  const [latestAumData, setLatestAumData] = useState<any[]>([]);
  const [totalHolders, setTotalUniqueHolders] = useState<number>(0);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [dailyTotalAumData, setDailyTotalAumData] = useState<any[]>([]);

  useEffect(() => {
    // 使用Promise.allSettled来并行请求所有数据，避免一个失败影响其他
    Promise.allSettled([
      // fetchDexPoolDailyData(),
      fetchDailyHolders(),
      // getDailyTransactionVolumeByAssets(),
      // fetchTotalUniqHolders(),
      getDailyTotalAum(),
    ])
      .then(
        ([
          // poolRes,
          holdersRes,
          // volumeRes,
          // totalUniqHoldersRes,
          getDailyTotalAumRes,
        ]) => {
          // 处理持有者数据
          if (holdersRes.status === 'fulfilled') {
            const filledData = holdersRes.value || [];
            setHoldersData(filledData || []);

            const lastDay = filledData[filledData.length - 1]?.day;
            const lastDayHolders = filledData.filter(
              (item: any) => item.day === lastDay
            );
            setTotalAssets(lastDayHolders?.length);
            setTotalUniqueHolders(
              lastDayHolders.reduce(
                (acc: number, item: any) => acc + item.holders,
                0
              )
            );
          }

          // // 处理交易量数据
          // if (volumeRes.status === 'fulfilled') {
          //   const daily = volumeRes.value || [];

          //   setDailyTransactionVolumeData(daily);

          //   // 优化7天数据计算
          //   const pre7DayTime = dayjs().subtract(7, 'day').valueOf();
          //   const pre7DaysData = daily
          //     .filter(
          //       (item: DailyTransactionVolumeApiItem) => item.time > pre7DayTime
          //     )
          //     .reduce(
          //       (
          //         acc: Record<string, DailyTransactionVolumeApiItem>,
          //         item: DailyTransactionVolumeApiItem
          //       ) => {
          //         const key = item.token_address;
          //         if (acc[key]) {
          //           acc[key].volume_usd += item.volume_usd;
          //           acc[key].transactions += item.transactions;
          //         } else {
          //           acc[key] = { ...item };
          //         }
          //         return acc;
          //       },
          //       {}
          //     );

          //   setPre7DaysTransactionVolumeData(Object.values(pre7DaysData));
          // }

          // if (totalUniqHoldersRes.status === 'fulfilled') {
          //   const holdersData = totalUniqHoldersRes.value || [];
          //   setTotalUniqueHolders(
          //     holdersData.find((d: any) => d.symbol === 'All xStock')
          //       ?.unique_holders
          //   );
          //   if (holdersData?.length > 0) {
          //     setTotalAssets((holdersData?.length || 0) - 1);
          //   }
          // }

          if (getDailyTotalAumRes.status === 'fulfilled') {
            const data = getDailyTotalAumRes.value;

            // 按token和日期组织数据
            const tokenDataMap = new Map<string, Map<string, any>>();

            // 首先按token分组数据
            for (const item of data) {
              if (!tokenDataMap.has(item.token_symbol)) {
                tokenDataMap.set(item.token_symbol, new Map());
              }
              const tokenMap = tokenDataMap.get(item.token_symbol);
              if (tokenMap) {
                tokenMap.set(item.date, item);
              }
            }

            // 获取所有日期并排序
            const allDates = Array.from(
              new Set(data.map((item: any) => item.date))
            ).sort();

            // 为每个token进行前向填充
            const filledData: any[] = [];

            tokenDataMap.forEach((tokenData, tokenSymbol) => {
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
                    (item: any) => item.token_symbol === tokenSymbol
                  );
                  if (sampleData) {
                    filledData.push({
                      date,
                      token_symbol: tokenSymbol,
                      aum_usd: lastValidAum,
                    });
                  }
                }
              }
            });

            const lastDate = filledData[filledData.length - 1]?.date;

            setLatestAumData(
              filledData
                .filter((item) => item.date === lastDate)
                .map((d) => ({
                  token_symbol: d.token_symbol,
                  aum_usd: d.aum_usd || 0,
                }))
            );

            // 按日期汇总所有token的AUM
            const res = filledData.reduce((acc: any, item: any) => {
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
            }, {});

            // 按日期排序并设置数据
            const sortedData = Object.values(res).sort(
              (a: any, b: any) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            setDailyTotalAumData(sortedData);
          }
        }
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch Ondo data:', error);
      });
  }, []);

  const value = useMemo(() => {
    const latestHoldersDate = holdersData[0]?.date;
    const latestHoldersData = holdersData.filter(
      (item) => item.date === latestHoldersDate
    );
    const totalAum = dailyTotalAumData[dailyTotalAumData.length - 1]?.aum_usd;
    const laseDate = dailyTransactionVolumeData[0]?.date;
    const totalDexVolume = dailyTransactionVolumeData
      .filter((item) => item.date === laseDate)
      .reduce((acc, item) => acc + item.volume_usd, 0);
    const latestDate = poolDailyData[0]?.date;
    const totalTvl = poolDailyData
      .filter((item) => item.date === latestDate)
      .reduce((acc, item) => acc + item.liquidity, 0);

    return {
      poolDailyData,
      holdersData,
      dailyTransactionVolumeData,
      pre7DaysTransactionVolumeData,
      dailyTotalAumData,
      latestAumData,
      latestHoldersData,
      totalAum,
      totalHolders,
      totalDexVolume,
      totalTvl,
      totalAssets,
    };
  }, [
    poolDailyData,
    holdersData,
    dailyTransactionVolumeData,
    pre7DaysTransactionVolumeData,
    dailyTotalAumData,
    latestAumData,
    totalHolders,
    totalAssets,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useOndo() {
  return useContext(SetContext);
}
