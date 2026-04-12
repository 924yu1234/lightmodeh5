import React from 'react';
import styled from 'styled-components';

import AddFunds from 'src/components/AddFunds';
import AddFundsGuide from 'src/components/ExternalWalletGuide/AddFundsGuide';
import IconBalance from 'src/components/Icons/balance';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import { useVaultDeposit } from './dataProvider';

export default function DepositAvailable() {
  const {
    balanceTotalDisplay,
    tokenOut,
    showBalanceError,
    solTips,
    setIsMaxModel,
    setIsTryingMax,
  } = useVaultDeposit();
  const intl = useIntl();
  const { hasAccessToken } = useDexAccount();

  return (
    <StyledAvailable onClick={(e) => e.stopPropagation()}>
      {showBalanceError && !solTips && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      {solTips && <div className="error_tips">{solTips}</div>}
      <div className="available-inner">
        <div
          className="available-text"
          onClick={() => {
            setIsMaxModel(Date.now());
            setIsTryingMax(true);
          }}
        >
          <IconBalance /> {hasAccessToken ? balanceTotalDisplay ?? '--' : '--'}
        </div>
        {tokenOut && <AddFunds token={tokenOut} />}
      </div>
      {tokenOut && <AddFundsGuide />}
    </StyledAvailable>
  );
}

const StyledAvailable = styled.div`
  margin-top: 7px;
  margin-bottom: 10px;
  .add-funds-guide {
    margin-top: 5px;
  }
  .error_tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .available-inner {
    width: 100%;
    font-size: 14px;
    line-height: 26px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    .available-text {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
