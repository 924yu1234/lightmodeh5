import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import MaxAvaiableTip from 'src/components/EstNetworkFee/maxAvaiableTip';
import IconBalance from 'src/components/Icons/balance';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useDualIncrease } from './dataProvider';

export default function BaseBalance() {
  const {
    overBaseBalance,
    baseBalance,
    setBaseAmount,
    product,
    baseTokenIsGasToken,
    setIsBaseMaxModel,
    setIsTryingBaseMax,
    setIsQuoteMaxModel,
    setIsTryingQuoteMax,
    tryResp,
  } = useDualIncrease();
  const intl = useIntl();

  const baseBalanceShow = digit.formatWithMaxLength8(
    baseBalance,
    product.baseToken?.decimals,
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
        token={product.baseToken}
        onHandleMax={(num) => {
          setIsQuoteMaxModel(0);
          setIsTryingQuoteMax(false);
          setIsBaseMaxModel(0);
          setIsTryingBaseMax(false);
          setBaseAmount(num);
        }}
      />
      {overBaseBalance && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      <div className="balance-inner">
        <div
          className="balance-text"
          onClick={() => {
            if (baseTokenIsGasToken) {
              setIsQuoteMaxModel(0);
              setIsTryingQuoteMax(false);
              setIsBaseMaxModel(Date.now());
              setIsTryingBaseMax(true);
              return;
            }
            setIsBaseMaxModel(0);
            setIsTryingBaseMax(false);
            setBaseAmount(baseBalance || '0');
          }}
        >
          <IconBalance />
          <div>{baseBalanceShow || '--'}</div>
          {product.baseToken?.symbol || ''}
        </div>
        {product.baseToken && (
          <AddFunds token={product.baseToken as any} filterToken />
        )}
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
  .error_tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
