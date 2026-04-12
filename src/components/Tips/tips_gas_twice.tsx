import React, { useMemo } from 'react';
import styled from 'styled-components';

import { getEffectiveSize } from 'src/utils/numberUtils';

import { useIntl } from 'js/locals';

import DeTooltip from '../DeTooltip';

export default function TipsGasTwice({
  infoSize = 24,
  amount,
}: {
  infoSize: number;
  amount: string;
}) {
  const showTips = useMemo(() => {
    return getEffectiveSize(amount) > 6;
  }, [amount]);
  const intl = useIntl();
  if (!showTips) return null;
  return (
    <StyledTips className="tips-gas-twice">
      <DeTooltip
        infoSize={infoSize}
        title={intl.gas_tips_for_amount_exceed_6_digits}
        modalTitle={null}
        childrenTitle={null}
      />
    </StyledTips>
  );
}

const StyledTips = styled.span`
  display: flex;
  align-items: center;
`;
