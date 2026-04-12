import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useXStocks } from './dataProvider';
import { useDailyTokenSupply } from './hooks';
import {
  DexPoolDailyDataApiItem,
  fetchDexPoolDailyData,
  fetchTotalUniqHolders,
} from './service';

type TotalUniqueHoldersApiItem = {
  symbol: string;
  unique_holders: number;
};

export default function Summary() {
  useXStocks();
  const intl = useIntl();

  // Fetch total unique holders
  const { data: totalUniqHoldersRes = [] } = useQuery<
    TotalUniqueHoldersApiItem[]
  >({
    queryKey: ['xstocks', 'totalUniqHolders'],
    queryFn: () => fetchTotalUniqHolders(),
  });

  const totalHolders = useMemo(() => {
    if (!totalUniqHoldersRes?.length) return 0;
    return (
      totalUniqHoldersRes.find((d: any) => d.symbol === 'All xStock')
        ?.unique_holders || 0
    );
  }, [totalUniqHoldersRes]);

  const totalAssets = useMemo(() => {
    if (!totalUniqHoldersRes?.length) return 0;
    return (totalUniqHoldersRes?.length || 0) - 1;
  }, [totalUniqHoldersRes]);

  const { dailyTotalAumData } = useDailyTokenSupply();

  const totalAum =
    dailyTotalAumData?.[dailyTotalAumData.length - 1]?.aum_usd || 0;

  // Fetch Dex Pool Daily Data
  const { data: poolDailyData = [] } = useQuery<DexPoolDailyDataApiItem[]>({
    queryKey: ['xstocks', 'poolDailyData'],
    queryFn: () =>
      fetchDexPoolDailyData() as Promise<DexPoolDailyDataApiItem[]>,
  });

  const totalTvl = useMemo(() => {
    const latestDate = poolDailyData?.[0]?.date;
    return poolDailyData
      .filter((item: DexPoolDailyDataApiItem) => item.date === latestDate)
      .reduce(
        (acc: number, item: DexPoolDailyDataApiItem) => acc + item.liquidity,
        0
      );
  }, [poolDailyData]);

  return (
    <StyledSummary>
      <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalAum, '0,0')}
        </div>
        <div className="summary-item-title">{intl.stocks.total_aum}</div>
      </div>
      <div className="summary-item">
        <div className="summary-item-value">
          {digit.formatInGroupSeparator(totalHolders)}
        </div>
        <div className="summary-item-title">
          {intl.stocks.total_unique_holders}
        </div>
      </div>
      <div className="summary-item">
        <div className="summary-item-value">
          {digit.formatInGroupSeparator(totalAssets)}
        </div>
        <div className="summary-item-title">{intl.stocks.total_assets}</div>
      </div>
      {/* <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalDexVolume, '0,0')}
        </div>
        <div className="summary-item-title">{intl.stocks.total_dex_volume}</div>
      </div> */}
      <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalTvl, '0,0')}
        </div>
        <div className="summary-item-title">{intl.stocks.total_tvl}</div>
      </div>
    </StyledSummary>
  );
}

const StyledSummary = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }: { theme: ThemeType }) =>
    theme?.isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'};
  gap: 20px;
  margin-bottom: 20px;
  .summary-item {
    min-height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    .summary-item-value {
      font-size: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      line-height: 24px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .summary-item-title {
      font-size: 12px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      line-height: 16x;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
      text-align: center;
    }
  }
`;
