import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconHistoryOprEarn from 'src/components/Icons/historyOprEarn';
import Loader from 'src/components/Loader';
import { IntentOrderStatus, SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';
import { formatAmountDisplayLess8 } from 'src/utils/format';

import { useShowModal } from 'js/state/application/hooks';

export default function HistoryItem({
  item,
  showTime,
  isFrstDay,
}: {
  item: any;
  showTime: string;
  isFrstDay: boolean;
}) {
  const showModal = useShowModal();

  const { tokens, protocol, vault_name, type, status } = item;
  const intl = useIntl();

  const typeIntl = useMemo(() => {
    if (type === 'deposit') {
      return intl.Deposit;
    }
    if (type === 'withdraw') {
      return intl.Withdraw;
    }
    if (type === 'reward') {
      return intl.Claim;
    }
    return '';
  }, [type, intl]);

  const showDetail = useCallback(() => {
    if (type === 'deposit') {
      showModal({
        modal: ModalKeys.earnDepositDetail,
        order: item,
      });
    }
    if (type === 'withdraw') {
      showModal({
        modal: ModalKeys.earnWithdrawDetail,
        order: item,
      });
    }
    if (type === 'reward') {
      showModal({
        modal: ModalKeys.earnClaimDetail,
        order: item,
      });
    }
  }, [showModal, item, type]);

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div className="history-item-inner" onClick={showDetail}>
        {status === IntentOrderStatus?.processing ? (
          <Loader size={28} />
        ) : (
          <IconHistoryOprEarn size={28} />
        )}
        <div className="item-text">
          <div className="item-text-title">
            {typeIntl}
            {status === SwapOrderStatus.failed && (
              <div className="tag-failed">{intl.Failed}</div>
            )}
          </div>
          <div className="item-text-sub ellipsis">{`${protocol} · ${vault_name}`}</div>
        </div>

        <div className="amount">
          {tokens.map((token: any) => {
            return (
              <div
                className={`amount-item ${
                  type !== 'deposit' ? 'color-green' : ''
                }`}
                key={token.symbol}
              >
                {type === 'deposit' ? '-' : '+'}
                {formatAmountDisplayLess8(token.amount, token.decimals)}{' '}
                {token.symbol}
              </div>
            );
          })}
        </div>
      </div>
    </StyledItem>
  );
}

HistoryItem.propTypes = {
  item: PropTypes.object,
};

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
      max-width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? theme.windowWidth - 280 : 180}px;
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
    font-size: 16px;
    line-height: 20px;
  }
`;
