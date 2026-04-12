import React, { useMemo } from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import FeeRefunded from 'src/components/Gas/feeRefunded';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import CommonSenseSymbol from 'src/components/TurboRange/commonSenseSymbol';
import { ThemeType } from 'src/theme';
import { plus } from 'src/utils/numberUtils';

import { useIntl } from 'js/locals';

export default function Success({
  order,
  poolAddress,
  closeModal,
}: {
  order: any;
  poolAddress: string;
  closeModal: () => void;
}) {
  const { tokens, rewards } = order;
  const showTokens = useMemo(() => {
    return tokens.concat(rewards).reduce((acc: any, token: any) => {
      const key = `${token?.chain}_${token?.code}`;
      if (!acc[key]) {
        acc[key] = token;
        return acc;
      }
      acc[key].amount = plus(acc[key]?.amount || '0', token?.amount || '0');
      return acc;
    }, [] as any[]);
  }, [tokens, rewards]);
  const intl = useIntl();
  return (
    <StyledView className="status-view">
      <IconStatusSuccess size={50} />
      <div className="text">{intl.turboRange.withdrawal_successful}</div>

      {Object.values(showTokens).map((token: any) => (
        <div className="token-info" key={token.id}>
          {token.amount}{' '}
          <CommonSenseSymbol poolAddress={poolAddress} token={token} />
        </div>
      ))}
      <div className="tips">
        {intl.turboRange.has_been_added_to_your_account}
      </div>
      <FeeRefunded refunded_fee={order?.refunded_fee} />
      <PrimaryBtn
        eventName="btn_earn_progress_close"
        onClick={() => {
          closeModal();
        }}
      >
        {intl.Close}
      </PrimaryBtn>
    </StyledView>
  );
}

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .text {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .token-info {
    gap: 5px;
    text-align: center;
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
  }

  .fee-refunded {
    width: 100%;
    margin-top: 30px;
  }

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-top: 10px;
  }
  .dg-primary {
    margin-top: 20px;
    width: 100%;
  }
`;
