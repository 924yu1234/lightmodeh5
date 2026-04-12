/* eslint-disable react/no-danger */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useToggleWalletTradeBtn } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { formatNetworFeeValue } from 'src/utils/format';

import IconRightOutlined from '../Icons/RightOutlined';
import EstNetworkFeeDetailModal from './detailModal';

export default function EstNetworkFee({
  tryResp,
  onSelectPayGasToken,
  showRefundableTips = false,
}: {
  tryResp: any;
  onSelectPayGasToken: (payGasToken: Token) => Promise<any>;
  showRefundableTips?: boolean;
}) {
  const toogleWalletTrade = useToggleWalletTradeBtn();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const intl = useIntl();
  const { totalFeeValue, accoutRentValue } = tryResp || {};
  // fee足够
  const totalFee_display = formatNetworFeeValue(totalFeeValue);
  let accountRent_display = formatNetworFeeValue(accoutRentValue);
  if (!accountRent_display || Number(accountRent_display) === 0) {
    accountRent_display = '';
  }

  const hide = useCallback(() => {
    toogleWalletTrade(false);
    setShowDetailModal(false);
  }, [toogleWalletTrade]);

  return (
    <StyledNetworkFeeValue className="est-network-fee-value-wrap">
      {isNumber(totalFeeValue) ? (
        <>
          <div
            className="est-network-fee-value"
            onClick={() => {
              setShowDetailModal(true);
              toogleWalletTrade(true);
            }}
          >
            ${totalFee_display}
            <IconRightOutlined />
          </div>
          {showRefundableTips && Number(accoutRentValue) > 0 && (
            <div className="refundable-tips">
              {intl.XXX_Refundable.replace('XXX', `$${accountRent_display}`)}
            </div>
          )}
        </>
      ) : (
        <div>--</div>
      )}
      <EstNetworkFeeDetailModal
        tryResp={tryResp}
        showDetailModal={showDetailModal}
        hide={hide}
        onSelectPayGasToken={onSelectPayGasToken}
        showRefundableTips={showRefundableTips}
      />
    </StyledNetworkFeeValue>
  );
}

export const StyledNetworkFeeValue = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  .est-network-fee-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
  .est-network-fee-value {
    cursor: pointer;
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
