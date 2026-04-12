import React from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function MaxAvaiableTip({
  tryResp,
  token,
  onHandleMax,
}: {
  tryResp: any;
  token?: CommonToken;
  onHandleMax: (num: string) => void;
}) {
  const intl = useIntl();
  if (!tryResp) return null;
  const {
    gasTokenIsOrderOutToken,
    showTryAmountError,
    gasNeedAmount,
    gasNeedToken,
    maxAmount,
  } = tryResp as any;

  if (!showTryAmountError) return null;

  // 触发rebalance时候提示最大数量
  if (maxAmount && Number(maxAmount) > 0) {
    return (
      <StyledMaxAvailableTip className="max-available-tip">
        <div
          className="max-text cursor-pointer"
          onClick={() => {
            if (onHandleMax) {
              onHandleMax(maxAmount as string);
            }
          }}
        >
          {intl.maximum_XXX.replace('$XXX', `${maxAmount} USDC`)}
        </div>
      </StyledMaxAvailableTip>
    );
  }

  if (gasNeedAmount && Number(gasNeedAmount) > 0 && gasTokenIsOrderOutToken)
    if (
      token &&
      (token.chain !== gasNeedToken?.chain || token.code !== gasNeedToken?.code)
    ) {
      return null;
    }
  return (
    <StyledMaxAvailableTip className="max-available-tip">
      <div className="max-text">
        {intl.est_gas_needed_for_network_fee
          .replace('$EST_GAS', `${gasNeedAmount}`)
          .replace('USDC', gasNeedToken?.symbol)}
      </div>
    </StyledMaxAvailableTip>
  );

  return null;
}

const StyledMaxAvailableTip = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.red};
  font-size: 14px;
  line-height: 20px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: flex-start;
`;
