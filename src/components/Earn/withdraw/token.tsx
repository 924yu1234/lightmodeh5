import React from 'react';
import styled from 'styled-components';

import InputLimitDecimals from 'src/components/Input/InputLimitDecimals';
import TokenSymbol from 'src/components/Token/symbol';
import { ThemeType } from 'src/theme';
import { enterNumberCheck, isNumber } from 'src/utils/numberUtils';

import { useIntl } from 'js/locals';

import { useVaultWithdraw } from './dataProvider';
import DepositAvailable from './withdrawAvailable';

export default function EarnDepositToken() {
  const intl = useIntl();
  const { token, amount, setAmount, showAvailableError } = useVaultWithdraw();

  return (
    <StyledAmount className="amount">
      <div className="item-title">{intl.amount}</div>
      <InputLimitDecimals
        decimals={token?.decimals}
        placeholder="0"
        className={`amount ${showAvailableError ? 'err-border' : ''}`}
        value={amount}
        onChange={(e: any) => setAmount(enterNumberCheck(e.target.value))}
        onBlur={(e: any) => {
          if (!isNumber(e.target.value)) {
            setAmount('');
          }
        }}
        inputMode="decimal"
        rightSection={<TokenSymbol token={token} hideCode iconSize={24} />}
      />
      <DepositAvailable />
    </StyledAmount>
  );
}

const StyledAmount = styled.div`
  width: 100%;
  .item-title {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .mantine-Input-input {
    height: 50px;
  }
`;
