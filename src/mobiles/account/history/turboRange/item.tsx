import React, { useMemo } from 'react';
import styled from 'styled-components';

import IconHistoryOprTurboRange from 'src/components/Icons/historyOprTurboRange';
import Loader from 'src/components/Loader';
import CommonSenseSymbol from 'src/components/TurboRange/commonSenseSymbol';
import useOpenHistoryDetail from 'src/components/TurboRange/modals/details/useOpenHistoryDetail';
import ProductName from 'src/components/TurboRange/productName';
import {
  TurboRangeHistoryType,
  TurboRangeOrderStatus,
} from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function HistoryItem({
  item,
  showTime,
  isFrstDay,
}: {
  item: any;
  showTime: string;
  isFrstDay: boolean;
}) {
  const { tokens, pool_address, type, status } = item;
  const intl = useIntl();

  const typeIntl = useMemo(() => {
    if (type === TurboRangeHistoryType.LP_DEPOSIT) {
      return intl.turboRange.create_position;
    }
    if (type === TurboRangeHistoryType.LP_WITHDRAW) {
      return intl.Withdraw;
    }
    if (type === TurboRangeHistoryType.LP_CLAIM) {
      return intl.Claim;
    }
    if (type === TurboRangeHistoryType.LP_ADD_DEPOSIT) {
      return intl.turboRange.increase_investment;
    }
    return '';
  }, [type, intl]);

  const openDetail = useOpenHistoryDetail();

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div className="history-item-inner" onClick={() => openDetail(item)}>
        {status === TurboRangeOrderStatus.processing ||
        status === TurboRangeOrderStatus.pending ? (
          <Loader size={28} />
        ) : (
          <IconHistoryOprTurboRange size={28} />
        )}
        <div className="item-text">
          <div className="item-text-title">
            {typeIntl}
            {status === TurboRangeOrderStatus.failed && (
              <div className="tag-failed">{intl.Failed}</div>
            )}
          </div>
          <div className="item-text-sub">
            {intl.turboRange.Turbo_Range} ·{' '}
            <ProductName poolAddress={pool_address} />
          </div>
        </div>

        <div className="amount">
          {tokens?.length > 0
            ? tokens.map((token: any) => {
                return (
                  <div
                    className={`amount-item ${
                      type !== TurboRangeHistoryType.LP_DEPOSIT &&
                      type !== TurboRangeHistoryType.LP_ADD_DEPOSIT
                        ? 'color-green'
                        : ''
                    }`}
                    key={token.symbol}
                  >
                    {type === TurboRangeHistoryType.LP_DEPOSIT ||
                    type === TurboRangeHistoryType.LP_ADD_DEPOSIT
                      ? '-'
                      : '+'}
                    {token.amount_display_less8}{' '}
                    <CommonSenseSymbol
                      poolAddress={pool_address}
                      token={token}
                    />
                  </div>
                );
              })
            : '--'}
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  .history-item-inner {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 30px;
    height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
  .item-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_f4f};
    .item-text-title {
      line-height: 20px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .item-text-sub {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      line-height: 18px;
    }
  }

  .tag-failed {
    background: ${({ theme }) => theme.bg_white_07};
    border-radius: 2px;
    padding: 0 10px;
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    height: 20px;
    line-height: 20px;
  }

  .amount {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    text-align: right;
    .amount-receive {
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    .amount-pay {
      font-size: 11px;
      line-height: 11px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
`;
