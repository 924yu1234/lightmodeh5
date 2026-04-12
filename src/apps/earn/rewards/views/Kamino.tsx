import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import ClaimBtn from 'src/components/Earn/claimBtn';
import Reward from 'src/components/Earn/reward';
import RewardTokenSymbol from 'src/components/Earn/RewardTokenSymbol';
import Empty from 'src/components/Empty';
import {
  useIsFetchingUserDetails,
  useKaminoRewards,
} from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

import { StyledAssetTable } from 'js/apps/components/Table/assetTable';
import { useIntl } from 'js/locals';

export default function Kamino() {
  const intl = useIntl();

  const isFetchingDetail = useIsFetchingUserDetails('Kamino');
  const showList = useKaminoRewards();

  const columns = [
    {
      dataIndex: 'vault',
      title: intl.Vault,
      width: 220,
      render: (_: any, reward: any) => {
        return <RewardTokenSymbol token={reward.token} />;
      },
    },
    {
      dataIndex: 'claimable',
      width: 220,
      title: intl.claimable,
      align: 'right',
      render: (_: any, reward: any) => {
        return (
          <Reward
            vault={reward.vault}
            amount={reward.claimableAmount}
            usd={reward.claimableUsd}
          />
        );
      },
    },
  ];

  const renderEmpty = useCallback(() => {
    if (isFetchingDetail) return <Empty />;
    const txt = intl.no_data;

    return (
      <Empty>
        <div className="empty-text">{txt}</div>
      </Empty>
    );
  }, [intl, isFetchingDetail]);

  const hasClaimable = useMemo(() => {
    return showList.some((item: any) => item.claimableAmount > 0);
  }, [showList]);

  if (!showList?.length) return null;

  return (
    <StyledEarnTable className="rewards-table">
      <div className="rewards-title">Kamino</div>
      <StyledAssetTable
        rowKey="id"
        rowClassName={() => `tr_click`}
        dataSource={showList}
        emptyText={renderEmpty}
        columns={columns}
        loading={isFetchingDetail}
      />
      <ClaimBtn
        vault={showList[0]?.vault}
        rewardToken={showList[0]?.token}
        claimOrderAddress={showList[0]?.orderAddress}
        disabled={!hasClaimable}
      />
    </StyledEarnTable>
  );
}

export const StyledEarnTable = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 260px;
  .rewards-title {
    font-size: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 20px;
  }
  .dg-primary {
    margin-top: 20px;
    min-width: 200px;
  }
`;
