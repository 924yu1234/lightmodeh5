import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { StyledTable } from 'src/apps/components/Table';
import DeTooltip from 'src/components/DeTooltip';
import ClaimBtn from 'src/components/Earn/claimBtn';
import Reward from 'src/components/Earn/reward';
import RewardTokenSymbol from 'src/components/Earn/RewardTokenSymbol';
import Empty from 'src/components/Empty';
import { useIsFetchingUserDetails } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function MorphoList({ list }: { list: any[] }) {
  const intl = useIntl();
  const isFetchingDetail = useIsFetchingUserDetails('Morpho');

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
      dataIndex: 'claimableAmount',
      width: 220,
      align: 'right',
      title: intl.claimable,
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
    {
      dataIndex: 'accruingAmount',
      align: 'right',
      title: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <DeTooltip
            title={intl.It_becomes_claimable_upon_maturity}
            position="top"
            childrenTitle={intl.Accruing}
            align="left"
          />
        </div>
      ),
      width: 220,
      render: (_: any, reward: any) => {
        return (
          <Reward
            vault={reward.vault}
            amount={reward.accruingAmount}
            usd={reward.accruingUsd}
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
    return list.some((item: any) => item.claimableAmount > 0);
  }, [list]);

  return (
    <StyledEarnTable className="rewards-table">
      <StyledTable
        rowKey="id"
        rowClassName={() => `tr_click`}
        dataSource={list}
        columns={columns}
        rowHeight={48}
        emptyText={renderEmpty}
        loading={isFetchingDetail}
      />
      <ClaimBtn vault={list[0]?.vault} disabled={!hasClaimable} />
    </StyledEarnTable>
  );
}

export const StyledEarnTable = styled.div`
  padding: 10px 20px 20px;
  .rewards-title {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .dg-primary {
    width: 100%;
    margin-top: 20px;
  }
`;
