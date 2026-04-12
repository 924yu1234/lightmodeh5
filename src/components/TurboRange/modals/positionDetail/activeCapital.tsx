import React, { useCallback, useMemo, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import IconDown from 'src/components/Icons/downIcon';
// eslint-disable-next-line unused-imports/no-unused-imports
import IconPositionHistory from 'src/components/Icons/PositionHistory';
import { useIntl } from 'src/locals';
import {
  useHasShowedInitReturnValue,
  useSetHasShowedInitReturnValue,
} from 'src/state/turboRange/hooks';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { isNumber } from 'src/utils/digit';
import { formatUsd } from 'src/utils/format';

export default function ActiveCapital({
  position,
  showToken,
  setShowToken,
}: {
  position: TurboRangePosition;
  showToken: boolean;
  setShowToken: (showToken: boolean) => void;
}) {
  const intl = useIntl();
  const hasShowedInitReturnValue = useHasShowedInitReturnValue(
    position.positionAddress
  );
  const setHasShowedInitReturnValue = useSetHasShowedInitReturnValue();
  const [opened, setOpened] = useState(true);

  const hasOpenedOver1Day = useMemo(() => {
    return position.duration > 1000 * 60 * 60 * 24;
  }, [position.duration]);

  const hideInitReturnValue = useCallback(() => {
    if (
      hasShowedInitReturnValue ||
      !position.initReturnValue ||
      hasOpenedOver1Day
    ) {
      return;
    }
    setHasShowedInitReturnValue(position.positionAddress, true);
  }, [
    hasOpenedOver1Day,
    position.positionAddress,
    setHasShowedInitReturnValue,
    hasShowedInitReturnValue,
    position.initReturnValue,
  ]);

  const ref = useClickOutside(() => {
    hideInitReturnValue();
    setOpened(false);
  });

  if (
    hasShowedInitReturnValue ||
    !isNumber(position.initReturnValue) ||
    Number(position.initReturnValue) <= 0 ||
    hasOpenedOver1Day
  ) {
    return (
      <div
        className="item-info-value cursor-pointer"
        onClick={() => setShowToken(!showToken)}
      >
        {position.principalValue_display}
        <IconDown rotate={showToken} />
      </div>
    );
  }

  const historyDetailText = intl.turboRange.click_history_above_for_details;
  const hasIconPlaceholder = historyDetailText.includes('ICON');
  const historyDetailParts = hasIconPlaceholder
    ? historyDetailText.split('ICON')
    : [historyDetailText];

  const Tips = (
    <StyledTips>
      <div className="tips-content">
        {intl.turboRange.returned}: {formatUsd(position.initReturnValue)}
      </div>
      <div className="tips-content tips-history">
        {historyDetailParts[0]}
        <span className={`tips-icon ${hasIconPlaceholder ? '' : 'after'}`}>
          <IconPositionHistory size={14} />
        </span>
        {hasIconPlaceholder ? historyDetailParts.slice(1).join('ICON') : null}
      </div>
    </StyledTips>
  );

  return (
    <Tooltip label={Tips} position="left" opened={opened}>
      <div
        className="item-info-value cursor-pointer"
        onClick={() => setShowToken(!showToken)}
        ref={ref}
      >
        {position.principalValue_display}
        <IconDown rotate={showToken} />
      </div>
    </Tooltip>
  );
}

const StyledTips = styled.div`
  .tips-content {
    word-break: break-word;
  }
  .tips-icon {
    display: inline-flex;
    align-items: center;
    margin: 0 4px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .tips-icon.after {
    margin-left: 4px;
    margin-right: 0;
  }
`;
