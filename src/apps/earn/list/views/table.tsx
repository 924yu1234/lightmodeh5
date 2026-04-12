import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Apy from 'src/components/Earn/apy';
import MyDeposit from 'src/components/Earn/myDeposit';
import Tvl from 'src/components/Earn/tvl';
import VaultSymbol from 'src/components/Earn/vault';
import Empty from 'src/components/Empty';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import { Vault } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useChainInfosMap } from 'src/state/application/hooks';
import { useMyVaults, useVaults } from 'src/state/intent/earn/hooks';

import { StyledAssetTable } from 'js/apps/components/Table/assetTable';
import { useIntl } from 'js/locals';

export default function EarnTable({ type }: { type: 'all' | 'my' }) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const navigate = useCustomNavigate();

  const vaults = useVaults();
  const myVaults = useMyVaults();
  const showList = type === 'all' ? vaults : myVaults;
  const total = showList.length;
  const loading = !showList;
  const chainInfosMap = useChainInfosMap();

  const columns = [
    {
      dataIndex: 'vault',
      title: intl.Vault,
      width: 280,
      render: (_: any, d: Vault) => {
        return <VaultSymbol vault={d} />;
      },
    },
    {
      dataIndex: 'chain',
      width: 100,
      title: intl.Network,
      render: (v: Type_DAChains) => {
        return <span>{chainInfosMap[v]?.name || v}</span>;
      },
    },
    {
      dataIndex: 'deposit',
      width: 120,
      title: intl.My_Deposit,
      render: (_: any, d: Vault) => {
        return <MyDeposit vault={d} />;
      },
    },
    {
      dataIndex: 'tvl',
      align: 'right',
      title: intl.TVL,
      width: 100,
      render: (_: any, d: Vault) => {
        return <Tvl vault={d} />;
      },
    },
    {
      dataIndex: 'apy',
      width: 120,
      align: 'right',
      title: intl.APY,
      render: (_: any, d: Vault) => {
        return <Apy vault={d} />;
      },
    },
    {
      dataIndex: 'apy',
      width: 120,
      align: 'right',
      title: '',
      render: () => {
        return null;
      },
    },
  ];

  const onRow = useCallback(
    (d: any) => {
      return {
        onClick: () => {
          navigate(`/simple-earn/${d.id}`);
        },
      };
    },
    [navigate]
  );

  const renderEmpty = useCallback(() => {
    if (type === 'my') return <Empty />;
    const txt = intl.no_data;

    return txt;
  }, [intl, type]);

  return (
    <StyledEarnTable className="top-pairs-table">
      <StyledAssetTable
        rowKey="id"
        rowClassName={() => `tr_click`}
        dataSource={showList}
        columns={columns}
        loading={loading}
        bodyHeight={500}
        emptyText={renderEmpty}
        onRow={onRow}
      />
      <PaginationWithTotal
        total={total}
        current={current}
        pageSize={pageSize}
        setPageSize={(v) => {
          setCurrent(1);
          setPageSize(v);
        }}
        onChange={setCurrent}
      />
    </StyledEarnTable>
  );
}

export const StyledEarnTable = styled.div``;
