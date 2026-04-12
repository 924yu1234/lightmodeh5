import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { StyledTable } from 'src/apps/components/Table';
import ClaimBtn from 'src/components/Earn/claimBtn';
import Reward from 'src/components/Earn/reward';
import RewardTokenSymbol from 'src/components/Earn/RewardTokenSymbol';
import Empty from 'src/components/Empty';
import {
  useIsFetchingUserDetails,
  useKaminoRewards,
} from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

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
      <StyledTable
        rowKey="id"
        rowClassName={() => `tr_click`}
        dataSource={showList}
        emptyText={renderEmpty}
        columns={columns}
        rowHeight={48}
      />
      <ClaimBtn
        vault={showList[0]?.vault}
        rewardToken={showList[0]?.token}
        disabled={!hasClaimable}
        claimOrderAddress={showList[0]?.orderAddress}
      />
    </StyledEarnTable>
  );
}

export const StyledEarnTable = styled.div`
  border-top: 4px solid #030303;
  padding: 20px 20px;

  .rewards-title {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }

  .dg-primary {
    margin-top: 20px;
    width: 100%;
  }
`;
