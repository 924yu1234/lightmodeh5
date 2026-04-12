import React from 'react';
import styled from 'styled-components';

import IconHistoryOprBridge from 'src/components/Icons/historyOprBridge';
import Loader from 'src/components/Loader';
import { IntentOrderStatus } from 'src/constants/consts';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useChainInfosMap, useShowModal } from 'js/state/application/hooks';

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

  const { token, amount, from_chain, to_chain, status } = item;
  const intl = useIntl();
  const chainInfoMap = useChainInfosMap();

  return (
    <StyledItem className={`history-items ${showTime ? 'show-time' : ''}`}>
      <div className={`history-day ${isFrstDay ? 'first-day' : ''}`}>
        {showTime}
      </div>
      <div
        className="history-item-inner"
        onClick={() => {
          showModal({ modal: ModalKeys.bridgeDetail, data: item });
        }}
      >
        {status === IntentOrderStatus?.processing ? (
          <Loader size={28} />
        ) : (
          <IconHistoryOprBridge size={28} />
        )}
        <div className="item-text">
          <div className="item-text-title">
            {intl.Bridge}
            {status === IntentOrderStatus.failed && (
              <div className="tag-failed">{intl.Failed}</div>
            )}
          </div>
          <div className="item-text-sub">
            {chainInfoMap[from_chain as Type_DAChains]?.name} ➝{' '}
            {chainInfoMap[to_chain as Type_DAChains]?.name}
          </div>
        </div>

        <div className="amount">
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
