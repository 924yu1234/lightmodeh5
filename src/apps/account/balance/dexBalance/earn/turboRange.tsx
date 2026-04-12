import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from 'src/UI';

import { StyledAssetTable } from 'src/apps/components/Table/assetTable';
import Empty from 'src/components/Empty';
import LinkBtnWrapper from 'src/components/Icons/LinkBtnWrapper';
import TokenIcon from 'src/components/Token/icon';
import PositionStatus from 'src/components/TurboRange/positionStatus';
import ProductName from 'src/components/TurboRange/productName';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useTurboRangeActivePositions } from 'src/state/turboRange/hooks';

export default function TurboRangeList() {
  const intl = useIntl();
  const showModal = useShowModal();
  const navigate = useCustomNavigate();

  const { positions, loadingPositions } = useTurboRangeActivePositions();

  const columns = [
    {
      dataIndex: 'pool',
      title: intl.Product,
      width: 280,
      render: (_: any, d: any) => {
        const { baseToken } = d;
        return (
          <div className="product-info">
            <TokenIcon token={baseToken} size={32} />
            <div className="item-symbol">
              <ProductName poolAddress={d.poolAddress} />
            </div>
            <PositionStatus position={d} />
          </div>
        );
      },
    },
    {
      dataIndex: 'priceRange',
      width: 200,
      title: intl.turboRange.price_range,
      render: (_: any, d: any) => {
        return `${d.minPrice} - ${d.maxPrice}`;
      },
    },
    {
      dataIndex: 'principal',
      title: intl.turboRange.position,
      width: 150,
      render: (_: any, d: any) => {
        return d.positionValue_display;
      },
    },
    {
      dataIndex: 'totalYield',
      title: intl.turboRange.all_time_yield,
      width: 150,
      render: (_: any, d: any) => {
        return `${d.totalYield_display}`;
      },
    },
    {
      dataIndex: 'yesterdayYield',
      title: intl.turboRange.yesterday_apy,
      width: 150,
      render: (_: any, d: any) => {
        if (d.isYesterdayUpdating) {
          return intl.turboRange.updating;
        }
        if (d.yesterday_apy_display === '--') {
          return '--';
        }
        return `${d.yesterday_apy_display}`;
      },
    },
    {
      title: intl['account.assets_opr'],
      dataIndex: 'opr',
      align: 'left',
      className: 'th-left-12',
      render: (v: any, d: any) => {
        return (
          <LinkBtnWrapper
            className="opr"
            onClick={() => {
              showModal({
                modal: ModalKeys.turboRangeDetail,
                position: d,
              });
            }}
          >
            {intl.Details}
          </LinkBtnWrapper>
        );
      },
    },
  ];

  const renderEmpty = useCallback(() => {
    if (loadingPositions) return <Empty />;
    return (
      <Empty>
        <div className="empty-text">
          {intl.turboRange.you_have_no_position}
          <Button
            uiVariant="ghost"
            onClick={() => navigate('/turbo-range')}
            style={{ marginTop: '15px', minWidth: '200px' }}
          >
            {intl.go_to_turbo_range}
          </Button>
        </div>
      </Empty>
    );
  }, [intl, loadingPositions, navigate]);

  return (
    <StyledTurboRange>
      <StyledAssetTable
        loading={!!loadingPositions}
        rowKey="id"
        dataSource={positions}
        columns={columns}
        bodyHeight={500}
        emptyText={renderEmpty}
      />
    </StyledTurboRange>
  );
}

const StyledTurboRange = styled.div`
  width: 100%;
  margin-top: 15px;
  .product-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
