import React, { useCallback, useEffect, useMemo, useState } from 'react';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import { OrderDir } from 'src/constants/consts';
import { FUNGIBLE_USDC_ID } from 'src/da';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import { StyledAssetTable } from 'js/apps/components/Table/assetTable';
import Loader from 'js/components/Loader';
import Pagination from 'js/components/Pagination';
import ItemSymbol from 'js/components/Token/symbol';
import { useIntl } from 'js/locals';
import { useIsHideAssets } from 'js/state/user/hooks';

export default function AssetsTable({
  dataSource,
  loading,
  orderBy,
  orderDir,
  updateSort,
}: {
  dataSource: any[];
  loading: boolean;
  orderBy: 'available' | 'totalValue' | 'locked' | 'symbol' | 'total';
  orderDir: OrderDir;
  updateSort: any;
}) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const isHide = useIsHideAssets();

  const columns = [
    {
      dataIndex: 'symbol',
      width: 300,
      title: (
        <TitleWithSort
          title={intl['account.assets_symbol']}
          dir={orderBy === 'symbol' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'symbol', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      align: 'left',
      render: (v: any, d: any) => {
        return (
          <ItemSymbol
            token={d}
            showTokenTag
            iconSize={28}
            chainIconSize={14}
            hideCode
          />
        );
      },
    },
    {
      dataIndex: 'totalDisplay',
      title: (
        <TitleWithSort
          title={intl.total}
          dir={orderBy === 'total' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'total', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      width: 220,
      render: (v: any, d: any) => {
        if (d.loadingBalance) return <Loader />;
        return <div>{isHide ? '****' : d.totalDisplay}</div>;
      },
    },
    {
      dataIndex: 'totalValueDisplay',
      width: 220,
      title: (
        <TitleWithSort
          title={intl['account.assets_market']}
          dir={orderBy === 'totalValue' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'totalValue', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any, d: any) => {
        if (d.loading) return <Loader />;
        return <div>{isHide ? '****' : `${v}`}</div>;
      },
    },
    {
      dataIndex: 'x',
      title: null,
      render: () => {
        return null;
      },
    },
  ];

  const pageSize = 20;

  const total = dataSource.length;
  const hasNext = total > current * pageSize;
  const showData = useMemo(() => {
    return dataSource.slice((current - 1) * pageSize, current * pageSize);
  }, [dataSource, pageSize, current]);

  // 筛选后造成无数据，页码置为1
  useEffect(() => {
    if (current > 1 && !showData?.length) {
      setCurrent(1);
    }
  }, [showData, current]);

  const showModal = useShowModal();

  const onRow = useCallback(
    (d: any) => {
      return {
        onClick: () => {
          if (d.id === FUNGIBLE_USDC_ID) {
            showModal({
              modal: ModalKeys.fungibleUsdcModal,
            });
          } else {
            showModal({
              modal: ModalKeys.assetModal,
              token: d,
            });
          }
        },
      };
    },
    [showModal]
  );

  return (
    <>
      <StyledAssetTable
        loading={loading}
        columns={columns as any}
        dataSource={showData}
        bodyHeight={total > pageSize ? pageSize * 50 + 40 : undefined}
        rowKey="id"
        onRow={onRow}
        rowClassName={() => {
          return 'tr_click';
        }}
      />
      <Pagination
        hasData={dataSource?.length > pageSize}
        current={current}
        onChange={setCurrent}
        hasNext={hasNext}
      />
    </>
  );
}
