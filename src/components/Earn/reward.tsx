import React from 'react';
import styled from 'styled-components';

import { Vault } from 'src/constants/interface';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';

import Loader from '../Loader';
import { formatAmount, formatUsd } from './format';

export default function Reward({
  vault,
  amount,
  usd,
}: {
  vault: Vault;
  amount: number;
  usd: number;
}): any {
  const isFetchingDetail = useIsFetchingVaultDetail(vault);
  if (isFetchingDetail) return <Loader />;
  if (!isNumber(amount)) return '--';
  if (Number(amount) === 0) return 0;
  return (
    <StyledReward>
      <div className="amount">{formatAmount(amount)}</div>
      <div className="usd">{formatUsd(usd)}</div>
    </StyledReward>
  );
}

const StyledReward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  line-height: 18px;
  .amount {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .usd {
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
`;
