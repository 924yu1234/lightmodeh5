import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

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

  const { token, status } = item;
  const intl = useIntl();

  const showDetail = useCallback(() => {
    showModal({
      modal: ModalKeys.receiveDetail,
      data: item,
    });
  }, [showModal, item]);

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div className="history-item-inner" onClick={showDetail}>
        <TokenIcon token={token} size={28} />
        <div className="item-text">
          <div className="item-text-title">
            {intl.Receive}
            {status === SwapOrderStatus.failed && (
              <div className="tag-failed">{intl.Failed}</div>
            )}
          </div>
        </div>

        <div className="amount color-green">
          {item.amount_display_less8} {token.symbol}
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
        theme.windowWidth - 230}px;
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
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
  }
`;
