import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import MaxAvaiableTip from 'src/components/EstNetworkFee/maxAvaiableTip';
import IconBalance from 'src/components/Icons/balance';
import { useIntl } from 'src/locals';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useIncrease } from './dataProvider';

export default function Balance() {
  const {
    overBalance,
    overMax,
    overPriceImpact,
    belowMin,
    usdcToken,
    tryResp,
    setAmount,
    setIsMaxModel,
    setIsTryingMax,
  } = useIncrease();
  const usdcBalance = useUsdcBalance({ token: usdcToken });
  const max = usdcBalance?.available;
  const intl = useIntl();

  const quoteBalanceShow = digit.formatWithMaxLength8(
    max,
    usdcToken?.decimals,
    {
      precision: '#',
      groupSeparator: true,
      floor: true,
    }
  );

  return (
    <StyledBalance>
      <MaxAvaiableTip tryResp={tryResp} onHandleMax={(num) => setAmount(num)} />
      {overBalance && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      {overMax && !overBalance && (
        <div className="error_tips">{intl.turboRange.maximum_500000}</div>
      )}
      {overPriceImpact && !belowMin && !tryResp?.showTryAmountError && (
        <div className="error_tips">{intl.turboRange.please_reduce_amount}</div>
      )}
      {belowMin && !overBalance && (
        <div className="error_tips">{intl.min_XXX.replace('XXX', 0.01)}</div>
      )}
      <div className="balance-inner">
        <div
          className="balance-text"
          onClick={() => {
            setIsMaxModel(Date.now());
            setIsTryingMax(true);
          }}
        >
          <IconBalance />
          <div>{quoteBalanceShow || '--'}</div>
          {usdcToken?.symbol || ''}
        </div>
        {usdcToken && <AddFunds token={usdcToken} />}
      </div>
    </StyledBalance>
  );
}

const StyledBalance = styled.div`
  margin-top: 7px;
  margin-bottom: 10px;
  .balance-inner {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .balance-text {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .text-underline-dotted {
    cursor: pointer;
  }
  .error_tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
