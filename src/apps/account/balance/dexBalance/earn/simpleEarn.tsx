import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from 'src/UI';

import { StyledAssetTable } from 'src/apps/components/Table/assetTable';
import MyDeposit from 'src/components/Earn/myDeposit';
import MyDepositUsd from 'src/components/Earn/myDepositUsd';
import Empty from 'src/components/Empty';
import LinkBtnWrapper from 'src/components/Icons/LinkBtnWrapper';
import TokenSymbol from 'src/components/Token/symbol';
import { Vault } from 'src/constants/interface';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import {
  useIsFetchingDetails,
  useMyVaultsSorted,
} from 'src/state/intent/earn/hooks';

export default function EarnList() {
  const intl = useIntl();
  const myVaults = useMyVaultsSorted();
  const navigate = useCustomNavigate();
  const isFetchingDetail = useIsFetchingDetails();

  const columns = [
    {
      dataIndex: 'token',
      title: intl.token,
      width: 200,
      render: (v: any, d: any) => {
        return <TokenSymbol token={d.token} hideChainIcon />;
      },
    },
    {
      dataIndex: 'vault',
      title: intl.Vault,
      width: 280,
      render: (_: any, item: any) => {
        return `${item.protocol} | ${item.name}`;
      },
    },
    {
      dataIndex: 'deposit',
      width: 150,
      title: intl.My_Deposit,
      render: (_: any, d: Vault) => {
        return <MyDeposit vault={d} />;
      },
    },
    {
      dataIndex: 'value',
      title: intl.Value,
      width: 150,
      render: (_: any, d: Vault) => {
        return <MyDepositUsd vault={d} />;
      },
    },
    {
      title: intl['account.assets_opr'],
      dataIndex: 'opr',
      align: 'left',
      className: 'th-left-12',
      render: (v: any, d: any) => {
        return (
          <StyledOprs>
            <LinkBtnWrapper
              className="opr"
              onClick={() => {
                navigate(`/simple-earn/${d.id}?type=deposit`);
              }}
            >
              {intl.Deposit}
            </LinkBtnWrapper>
            <LinkBtnWrapper
              className="opr"
              onClick={() => {
                navigate(`/simple-earn/${d.id}?type=withdraw`);
              }}
            >
              {intl.Withdraw}
            </LinkBtnWrapper>
          </StyledOprs>
        );
      },
    },
  ];

  const renderEmpty = useCallback(() => {
    if (isFetchingDetail) return <Empty />;

    return (
      <Empty>
        <div className="empty-text">
          {intl.turboRange.you_have_no_position}
          <Button
            uiVariant="ghost"
            onClick={() => navigate('/earn')}
            style={{ marginTop: '15px', minWidth: '200px' }}
          >
            {intl.go_to_earn}
          </Button>
        </div>
      </Empty>
    );
  }, [intl, isFetchingDetail, navigate]);

  return (
    <StyledEarn>
      <StyledAssetTable
        loading={isFetchingDetail}
        rowKey="id"
        dataSource={myVaults}
        columns={columns}
        bodyHeight={500}
        emptyText={renderEmpty}
      />
    </StyledEarn>
  );
}

const StyledEarn = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const StyledOprs = styled.div`
  display: flex;
  gap: 10px;
`;
