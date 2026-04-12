import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { StyledMiningTable } from 'src/apps/components/Table/miningTable';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';
import digit from 'src/utils/digit';

import { useFetchReferralMyInvites } from '../../service';
import { ReferralInviteRecord, ReferralListResponse } from '../../types';
import { ReferralTableColumn } from './types';

interface FetchParams {
  current: number;
  pageSize: number;
}

type FetchInviteListFn = (
  params: FetchParams
) => Promise<ReferralListResponse<ReferralInviteRecord>>;

export default function MyInvitesTable() {
  const intl = useIntl();
  const theme = useThemeParams() as ThemeType;
  const fetchReferralMyInvites =
    useFetchReferralMyInvites() as FetchInviteListFn;

  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<ReferralInviteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const fetchList = useCallback(() => {
    setLoading(true);
    fetchReferralMyInvites({ current, pageSize })
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
  }, [current, fetchReferralMyInvites, pageSize]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const columns = useMemo((): ReferralTableColumn<ReferralInviteRecord>[] => {
    return [
      {
        title: intl.Referee,
        width: 180,
        dataIndex: ['masked_referee'],
      },
      {
        title: `${intl.Commission}(USD)`,
        width: 180,
        dataIndex: ['estimated_usd_amount'],
        render: (value: unknown) => {
          return digit.format(Number(value || 0), '0,0.00');
        },
      },
      {
        title: intl.Time_Joined,
        width: 180,
        dataIndex: ['joined_at'],
        render: (value: unknown) => {
          const timestamp = Number(value || 0);
          if (!timestamp) {
            return '--';
          }
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
        },
      },
    ];
  }, [intl]);

  const scroll = useMemo(() => {
    if (!theme.isMobile) {
      return undefined;
    }
    return { x: 620 };
  }, [theme.isMobile]);

  const handleChangePage = useCallback((page: number) => {
    setCurrent(page);
  }, []);

  const handleChangePageSize = useCallback((size: number) => {
    setPageSize(size);
    setCurrent(1);
  }, []);

  const getRowKey = useCallback((record: ReferralInviteRecord) => {
    if (record.id) {
      return record.id;
    }
    return `${record.masked_referee || '--'}_${record.joined_at || 0}`;
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
