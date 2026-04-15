import React from 'react';
import styled from 'styled-components';

import { StyledAssetTable } from 'src/apps/components/Table/assetTable';
import { StyledBotsTable } from 'src/apps/components/Table/botsTable';
import { StyledMobileInfoTable } from 'src/apps/components/Table/infoTable';
import { StyledMiningTable } from 'src/apps/components/Table/miningTable';
import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

// ===== Mock Data =====
const ASSET_ROWS = [
  {
    pair: 'ETH/USDC',
    price: '3,245.67',
    change: '+2.35%',
    volume: '$12.5M',
    marketCap: '$389B',
    liquidity: '$5.6M',
  },
  {
    pair: 'BTC/USDC',
    price: '98,765.43',
    change: '-0.85%',
    volume: '$25.0M',
    marketCap: '$1.92T',
    liquidity: '$8.9M',
  },
  {
    pair: 'SOL/USDC',
    price: '178.92',
    change: '+5.12%',
    volume: '$8.7M',
    marketCap: '$92B',
    liquidity: '$3.2M',
  },
  {
    pair: 'DG/USDC',
    price: '0.156',
    change: '+12.50%',
    volume: '$4.2M',
    marketCap: '$580M',
    liquidity: '$1.5M',
  },
];

const MINING_ROWS = [
  {
    user: '0xa1...8f4d',
    level: 'L1',
    type: 'Direct',
    activity: 'Trade',
    commission: '$125.43',
    status: 'Settled',
    time: '2026-04-12 10:23',
  },
  {
    user: '0xb2...c91e',
    level: 'L2',
    type: 'Indirect',
    activity: 'Earn',
    commission: '$67.21',
    status: 'Pending',
    time: '2026-04-12 09:15',
  },
  {
    user: '0xc3...7a2b',
    level: 'L1',
    type: 'Direct',
    activity: 'Swap',
    commission: '$245.89',
    status: 'Settled',
    time: '2026-04-11 22:08',
  },
];

const BOTS_ROWS = [
  {
    name: 'ETH Grid #1',
    type: 'Grid',
    invested: '5,000 USDC',
    pnl: '+342.50',
    pnlPct: '+6.85%',
    status: 'Active',
  },
  {
    name: 'BTC DCA',
    type: 'DCA',
    invested: '10,000 USDC',
    pnl: '+1,205.00',
    pnlPct: '+12.05%',
    status: 'Active',
  },
  {
    name: 'SOL Range',
    type: 'Range',
    invested: '2,500 USDC',
    pnl: '-45.20',
    pnlPct: '-1.81%',
    status: 'Closed',
  },
];

const INFO_ROWS = [
  { token: 'ETH', amount: '1.5', value: '$4,868.50' },
  { token: 'USDC', amount: '5,000.00', value: '$5,000.00' },
  { token: 'SOL', amount: '25.0', value: '$4,473.00' },
  { token: 'BTC', amount: '0.05', value: '$4,938.27' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noopDir = (_v: any) => {};

export default function TablesSection() {
  return (
    <StyledSection>
      <h2 className="section-title">Tables</h2>

      <ComponentCard
        title="StyledAssetTable"
        description="Token pair / asset list table. Used in home, swap pairs, earn vault list."
      >
        <StyledAssetTable
          dataSource={ASSET_ROWS}
          rowKey="pair"
          columns={[
            { title: 'Pair', dataIndex: 'pair', key: 'pair', width: 120 },
            {
              title: (
                <TitleWithSort
                  dir=""
                  onChangeDir={noopDir}
                  align="right"
                  title="Price"
                />
              ),
              dataIndex: 'price',
              key: 'price',
              align: 'right' as const,
            },
            {
              title: '24h Change',
              dataIndex: 'change',
              key: 'change',
              align: 'right' as const,
              render: (val: string) => (
                <span
                  className={val.startsWith('+') ? 'color-up' : 'color-down'}
                >
                  {val}
                </span>
              ),
            },
            {
              title: 'Volume',
              dataIndex: 'volume',
              key: 'volume',
              align: 'right' as const,
            },
            {
              title: 'Market Cap',
              dataIndex: 'marketCap',
              key: 'marketCap',
              align: 'right' as const,
            },
            {
              title: 'Liquidity',
              dataIndex: 'liquidity',
              key: 'liquidity',
              align: 'right' as const,
            },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="StyledMiningTable"
        description="Referral / mining records table with status column."
      >
        <StyledMiningTable
          dataSource={MINING_ROWS}
          rowKey="time"
          columns={[
            { title: 'User', dataIndex: 'user', key: 'user' },
            { title: 'Level', dataIndex: 'level', key: 'level' },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            { title: 'Activity', dataIndex: 'activity', key: 'activity' },
            {
              title: 'Commission',
              dataIndex: 'commission',
              key: 'commission',
              align: 'right' as const,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (val: string) => (
                <span className={val === 'Settled' ? 'color-up' : ''}>
                  {val}
                </span>
              ),
            },
            { title: 'Time', dataIndex: 'time', key: 'time' },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="StyledBotsTable"
        description="Trading bots / strategies table with active/closed states."
      >
        <StyledBotsTable
          dataSource={BOTS_ROWS}
          rowKey="name"
          rowClassName={(record: any) =>
            record.status === 'Closed' ? 'tr_closed' : ''
          }
          columns={[
            { title: 'Strategy', dataIndex: 'name', key: 'name' },
            { title: 'Type', dataIndex: 'type', key: 'type' },
            {
              title: 'Invested',
              dataIndex: 'invested',
              key: 'invested',
              align: 'right' as const,
            },
            {
              title: 'PnL',
              dataIndex: 'pnl',
              key: 'pnl',
              align: 'right' as const,
              render: (val: string) => (
                <span
                  className={val.startsWith('-') ? 'color-down' : 'color-up'}
                >
                  {val}
                </span>
              ),
            },
            {
              title: 'PnL %',
              dataIndex: 'pnlPct',
              key: 'pnlPct',
              align: 'right' as const,
              render: (val: string) => (
                <span
                  className={val.startsWith('-') ? 'color-down' : 'color-up'}
                >
                  {val}
                </span>
              ),
            },
            { title: 'Status', dataIndex: 'status', key: 'status' },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="StyledMobileInfoTable"
        description="Compact info table optimized for mobile views."
      >
        <StyledMobileInfoTable
          dataSource={INFO_ROWS}
          rowKey="token"
          columns={[
            { title: 'Token', dataIndex: 'token', key: 'token' },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
              align: 'right' as const,
              className: 'td-amount',
            },
            {
              title: 'USD Value',
              dataIndex: 'value',
              key: 'value',
              align: 'right' as const,
              className: 'td-price',
            },
          ]}
        />
      </ComponentCard>

      <ComponentCard
        title="TitleWithSort"
        description="Sortable column header. Cycles through asc → desc → empty."
      >
        <div className="sort-demo">
          <TitleWithSort
            dir=""
            onChangeDir={noopDir}
            align="left"
            title="Empty (default)"
            hasEmptyState
          />
          <TitleWithSort
            dir="asc"
            onChangeDir={noopDir}
            align="left"
            title="Ascending"
            hasEmptyState
          />
          <TitleWithSort
            dir="desc"
            onChangeDir={noopDir}
            align="left"
            title="Descending"
            hasEmptyState
          />
        </div>
      </ComponentCard>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
  .color-up {
    color: ${({ theme }: { theme: ThemeType }) => theme.buy};
  }
  .color-down {
    color: ${({ theme }: { theme: ThemeType }) => theme.sell};
  }
  .sort-demo {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }
`;
