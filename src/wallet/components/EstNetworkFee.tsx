/**
 * Estimated Network Fee display.
 * Migrated from dg-wallet/src/components/EstNetworkFee/index.tsx
 */
import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { formatNetworFeeValue } from 'src/utils/format';

export default function EstNetworkFee({ tryResp }: { tryResp: any }) {
  const { totalFeeValue, accoutRentValue } = tryResp || {};
  const intl = useIntl();
  const totalFee_display = formatNetworFeeValue(totalFeeValue);
  let accountRent_display = formatNetworFeeValue(accoutRentValue);
  if (!accountRent_display || Number(accountRent_display) === 0) {
    accountRent_display = '';
  }

  return (
    <StyledNetworkFeeValue className="est-network-fee-value-wrap">
      {isNumber(totalFeeValue) ? (
        <div className="est-network-fee-value">${totalFee_display}</div>
      ) : (
        <div>--</div>
      )}
      {Number(accoutRentValue) > 0 && (
        <div className="refundable-tips">
          {(intl as any).XXX_Refundable?.replace(
            'XXX',
            `$${accountRent_display}`
          ) || `$${accountRent_display} Refundable`}
        </div>
      )}
    </StyledNetworkFeeValue>
  );
}

const StyledNetworkFeeValue = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  .est-network-fee-value {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }
  .refundable-tips {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
`;
