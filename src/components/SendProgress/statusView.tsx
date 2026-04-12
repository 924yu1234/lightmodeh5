import React, { useMemo } from 'react';
import styled from 'styled-components';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { WithdrawStatus } from 'src/constants/consts';
import { CommonToken } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconStatusProcessingAni from '../Icons/StatusProcessingAni';

export default function ProcessSendView({
  status,
  amount,
  token,
}: {
  status: string;
  amount: string;
  token: CommonToken;
}) {
  const intl = useIntl();
  const Icon =
    {
      [WithdrawStatus.processing]: IconStatusProcessingAni,
      [WithdrawStatus.success]: IconStatusSuccess,
      [WithdrawStatus.completed]: IconStatusSuccess,
      [WithdrawStatus.failed]: IconStatusFailed,
    }[status] ?? IconStatusProcessingAni;

  const statusStr = useMemo(
    () =>
      ({
        [WithdrawStatus.processing]: intl.status_processing,
        [WithdrawStatus.success]: intl.status_success,
        [WithdrawStatus.completed]: intl.status_success,
        [WithdrawStatus.failed]: intl.status_failed,
      }[status] || intl.status_processing),
    [intl, status]
  );

  return (
    <StyledProcessView>
      <Icon size={50} />
      <div className="status-str">{statusStr}</div>
      <div className="title">
        {intl.withdraw_ETH.replace('ETH', `${amount} ${token?.symbol}`)}
      </div>
    </StyledProcessView>
  );
}

const StyledProcessView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dg-icon {
    margin: 0 0 30px;
    width: 50px;
    height: 50px;
  }

  .status-str {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 5px;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 26px;
    font-size: 14px;
    margin-bottom: 5px;
    text-align: center;
  }
`;
