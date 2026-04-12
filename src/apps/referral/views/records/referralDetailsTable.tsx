import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useTheme } from 'styled-components';

import { StyledMiningTable } from 'src/apps/components/Table/miningTable';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import { useFetchReferralDetails } from '../../service';
import { ReferralDetailRecord, ReferralListResponse } from '../../types';
import { parseType } from '../../utils';
import ActivityCellForSwap from './activityCellForSwap';
import ActivityCellForTurboRange from './activityCellForTurboRange';
import StatusCell from './statusCell';
import { ReferralTableColumn } from './types';

interface FetchParams {
  current: number;
  pageSize: number;
}

type FetchDetailListFn = (
  params: FetchParams
) => Promise<ReferralListResponse<ReferralDetailRecord>>;

function asText(value: unknown, fallback = '--'): string {
  if (typeof value === 'string' && value) {
    return value;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  return fallback;
}

export default function ReferralDetailsTable() {
  const intl = useIntl();
  const theme = useTheme() as ThemeType;
  const fetchReferralDetails = useFetchReferralDetails() as FetchDetailListFn;

  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<ReferralDetailRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const fetchList = useCallback(() => {
    setLoading(true);
    fetchReferralDetails({ current, pageSize })
      .then((res) => {
        setData(res?.list || []);
        setTotal(res?.total || 0);
      })
      .catch(() => {
        setData([]);
        setTotal(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [current, fetchReferralDetails, pageSize]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const columns = useMemo((): ReferralTableColumn<ReferralDetailRecord>[] => {
    return [
      {
        title: intl.Referee,
        width: 160,
        dataIndex: ['masked_referee'],
      },
      {
        title: intl.Level,
        width: 120,
        dataIndex: ['level'],
        render: (value: unknown) => {
          if (value === 1) {
            return intl.Level_1;
          }
          if (value === 2) {
            return intl.Level_2;
          }
          return '--';
        },
      },
      {
        title: intl.Type,
        width: 140,
        dataIndex: ['transaction'],
        render: (value: unknown) => {
          if (value === 'swap') {
            return intl.Swap;
          }
          if (value === 'turbo-range') {
            return intl.turboRange.Turbo_Range;
          }
          return '--';
        },
      },
      {
        title: intl.Activity,
        width: 220,
        dataIndex: ['activity'],
        render: (value: unknown, record: ReferralDetailRecord) => {
          if (record.type === 'turbo-range') {
            return <ActivityCellForTurboRange record={record} />;
          }

          return <ActivityCellForSwap record={record} />;
        },
      },
      {
        title: intl.Commission,
        width: 160,
        dataIndex: ['amount_display'],
        render: (value: unknown, record: ReferralDetailRecord) => {
          const status = parseType(record.status);
          const displayValue = asText(
            value ||
              record.commission_amount_display ||
              record.commission_display,
            '0'
          );
          const symbol = asText(
            record.token?.symbol ||
              record.commission_token?.symbol ||
              record.token_symbol,
            status.includes('pending') ? '' : 'USDC'
          );
          return symbol ? `${displayValue} ${symbol}` : displayValue;
        },
      },
      {
        title: intl.status,
        width: 160,
        dataIndex: ['status'],
        render: (value: unknown) => {
          return (
            <StatusCell isPending={parseType(value).includes('pending')} />
          );
        },
      },
      {
        title: intl.time,
        width: 180,
        dataIndex: ['rebated_at'],
        render: (value: unknown) => {
          const timestamp = Number(value || 0);
          if (!timestamp) {
            return '--';
          }
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ];
  }, [intl]);

  const scroll = useMemo(() => {
    if (!theme.isMobile) {
      return undefined;
    }
    return { x: 1140 };
  }, [theme.isMobile]);

  const handleChangePage = useCallback((page: number) => {
    setCurrent(page);
  }, []);

  const handleChangePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrent(1);
  }, []);

  const getRowKey = useCallback((record: ReferralDetailRecord) => {
    if (record.id) {
      return record.id;
    }
    return `${record.masked_referee || '--'}_${record.rebated_at || 0}_${
      record.level || '--'
    }`;
  }, []);

  return (
    <div className="records-table-card">
      <StyledMiningTable
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={getRowKey}
        scroll={scroll}
        disabledHideScrollBar={!!scroll}
      />

      <PaginationWithTotal
        current={current}
        onChange={handleChangePage}
        total={total}
        pageSize={pageSize}
        setPageSize={handleChangePageSize}
      />
    </div>
  );
}
