import React, { useCallback } from 'react';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import Spin from 'src/components/Spin';
import useOpenHistoryDetail from 'src/components/TurboRange/modals/details/useOpenHistoryDetail';
import { TurboRangeHistoryType } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { formatTurboRangeDuration } from 'src/state/turboRange/utils';

import { usePositionHistoryData } from './data';
import {
  HistoryDot,
  HistoryItemLeft,
  HistoryItemRight,
  HistoryItemRow,
  HistoryListWrap,
  HistoryTime,
  HistoryTitle,
} from './styles';

type PositionHistoryListProps = {
  position: TurboRangePosition;
};

export default function PositionHistoryList({
  position,
}: PositionHistoryListProps) {
  const intl = useIntl();
  const { items, loading } = usePositionHistoryData(position);

  const getTypeLabel = useCallback(
    (type?: keyof typeof TurboRangeHistoryType) => {
      if (type === TurboRangeHistoryType.LP_DEPOSIT) {
        return intl.turboRange.create_position;
      }
      if (type === TurboRangeHistoryType.LP_ADD_DEPOSIT) {
        return intl.turboRange.increase_investment;
      }
      if (type === TurboRangeHistoryType.LP_WITHDRAW) {
        return intl.Withdraw;
      }
      if (type === TurboRangeHistoryType.LP_CLAIM) {
        return intl.Claim;
      }
      return '--';
    },
    [intl]
  );

  const openDetail = useOpenHistoryDetail();

  const handleItemClick = useCallback(
    (item: any) => () => openDetail(item),
    [openDetail]
  );

  const renderItem = useCallback(
    (item: any) => {
      const timeLabel = item.timestamp
        ? formatTurboRangeDuration(
            Math.max(0, Date.now() - item.timestamp * 1000)
          )
        : '--';
      return (
        <HistoryItemRow
          key={`${item.intent_id || item.timestamp}-${item.type}`}
          onClick={handleItemClick(item)}
        >
          <HistoryItemLeft>
            <HistoryDot />
            <HistoryTitle>{getTypeLabel(item.type)}</HistoryTitle>
          </HistoryItemLeft>
          <HistoryItemRight>
            <HistoryTime>{timeLabel}</HistoryTime>
            <IconRightOutlined size={12} />
          </HistoryItemRight>
        </HistoryItemRow>
      );
    },
    [getTypeLabel, handleItemClick]
  );

  return (
    <Spin spinning={loading}>
      <HistoryListWrap>{items.map(renderItem)}</HistoryListWrap>
    </Spin>
  );
}
