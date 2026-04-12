import React from 'react';
import styled from 'styled-components';

import Loader from 'src/components/Loader';
import TokenIcon from 'src/components/Token/icon';
import { SendStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { formatAddress } from 'src/utils/format';

import { useShowModal } from 'js/state/application/hooks';

export default function Item({
  item,
  showTime,
  isFrstDay,
}: {
  item: any;
  showTime: string;
  isFrstDay: boolean;
}) {
  const showModal = useShowModal();
  const { token, amount, to_address, status } = item;
  const intl = useIntl();

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div
        className="history-item-inner"
        onClick={() => {
          showModal({ modal: ModalKeys.sendDetail, data: item });
        }}
      >
        {status === SendStatus?.processing ? (
          <Loader size={28} />
        ) : (
          <TokenIcon token={token} size={28} />
        )}
        <div className="item-text">
          <div className="item-text-title">
            {intl.Send}
            {status === SendStatus.failed && (
              <div className="tag-failed">{intl.Failed}</div>
            )}
          </div>
          <div className="item-text-sub">
            {intl.To} {formatAddress(to_address)}
          </div>
        </div>

        <div className="amount">
          -
          {digit.formatWithDecimalsLess8(amount, token.decimals, {
            groupSeparator: true,
          })}{' '}
          {token.symbol}
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
    line-height: 18px;
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
    font-size: 16px;
    line-height: 20px;
  }
`;
