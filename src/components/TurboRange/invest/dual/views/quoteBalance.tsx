import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import MaxAvaiableTip from 'src/components/EstNetworkFee/maxAvaiableTip';
import AddFundsGuide from 'src/components/ExternalWalletGuide/AddFundsGuide';
import IconBalance from 'src/components/Icons/balance';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useDualInvest } from '../dataProvider';

export default function QuoteBalance() {
  const {
    overQuoteBalance,
    overMax,
    belowQuoteMin,
    usdcToken,
    quoteBalance,
    setIsQuoteMaxModel,
    setIsTryingQuoteMax,
    setIsBaseMaxModel,
    setIsTryingBaseMax,
    tryResp,
    setQuoteAmount,
  } = useDualInvest();
  const intl = useIntl();

  const quoteBalanceShow = digit.formatWithMaxLength8(
    quoteBalance,
    usdcToken?.decimals,
    {
      precision: '#',
      groupSeparator: true,
      floor: true,
    }
  );

  return (
    <StyledBalance>
      <MaxAvaiableTip
        tryResp={tryResp}
        token={usdcToken}
        onHandleMax={(num) => setQuoteAmount(num)}
      />
      {overQuoteBalance && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      {overMax && !overQuoteBalance && (
        <div className="error_tips">{intl.turboRange.maximum_500000}</div>
      )}
      {belowQuoteMin && !overQuoteBalance && (
        <div className="error_tips">{intl.min_XXX.replace('XXX', '0.01')}</div>
      )}

      <div className="balance-inner">
        <div
          className="balance-text"
          onClick={() => {
            if (belowQuoteMin) {
              setQuoteAmount('');
            }
            setIsQuoteMaxModel(Date.now());
            setIsTryingQuoteMax(true);
            setIsBaseMaxModel(0);
            setIsTryingBaseMax(false);
          }}
        >
          <IconBalance />
          <div>{quoteBalanceShow || '--'}</div>
          {usdcToken?.symbol || ''}
        </div>
        {usdcToken && <AddFunds token={usdcToken} />}
      </div>
      {usdcToken && <AddFundsGuide />}
    </StyledBalance>
  );
}

const StyledBalance = styled.div`
  margin-top: 7px;
  margin-bottom: 10px;

  .add-funds-guide {
    margin-top: 5px;
  }

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
