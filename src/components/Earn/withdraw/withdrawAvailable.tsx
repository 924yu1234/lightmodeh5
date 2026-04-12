import React from 'react';
import styled from 'styled-components';

import Loader from 'src/components/Loader';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { multiply } from 'src/utils/numberUtils';

import { useVaultWithdraw } from './dataProvider';

export default function WithdrawAvailable() {
  const {
    token,
    setAmount,
    available,
    availableDisplay,
    vault,
    showAvailableError,
  } = useVaultWithdraw();
  const { hasAccessToken } = useDexAccount();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);

  const intl = useIntl();
  return (
    <StyledAvailable>
      {showAvailableError && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      <div className="available-inner">
        <div className="available-text">
          {intl.available}:{' '}
          {hasAccessToken ? (
            <>{isFetchingDetail ? <Loader /> : availableDisplay ?? '0'}</>
          ) : (
            '--'
          )}
        </div>

        <div
          className="percent-item"
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            setAmount(
              digit.formatWithDecimals(
                multiply(available, 0.5),
                token?.decimals,
                {
                  floor: true,
                }
              )
            );
          }}
        >
          50%
        </div>
        <div className="percent-item" onClick={() => setAmount(available)}>
          100%
        </div>
      </div>
    </StyledAvailable>
  );
}

const StyledAvailable = styled.div`
  margin-top: 7px;
  margin-bottom: 10px;
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
  .available-inner {
    font-size: 14px;
    line-height: 26px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    .available-text {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .percent-item {
      cursor: pointer;
      background: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_10};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      border-radius: 2px;
      width: 46px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
