import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { formatTurboRangeDuration } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useIntl } from 'js/locals';

export default function BottomInfo({
  position,
}: {
  position: TurboRangePosition;
}) {
  const intl = useIntl();
  const product = useTurboRangeProduct(position.poolAddress);

  return (
    <StyledBottomInfo>
      <div className="item-info">
        <div className="item-info-title">
          {intl.turboRange.initial_entry_price}
        </div>
        <div className="item-info-value">
          ${digit.formatWithDecimals(position.entryPrice, product.showDecimals)}
        </div>
      </div>
      <div className="item-info">
        <div className="item-info-title">{intl.turboRange.duration}</div>
        <div className="item-info-value text-underline-dotted cursor-pointer">
          <Tooltip
            label={`${intl.turboRange.created_at} ${dayjs(
              position.created_at
            ).format('YYYY-MM-DD HH:mm')}`}
            position="bottom"
            events={{ hover: true, touch: true, focus: false }}
          >
            <div>{formatTurboRangeDuration(position.duration)}</div>
          </Tooltip>
        </div>
      </div>
    </StyledBottomInfo>
  );
}

const StyledBottomInfo = styled.div`
  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    .item-info-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .item-info-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
`;
