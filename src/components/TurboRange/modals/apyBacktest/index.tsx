import React from 'react';
import styled from 'styled-components';

import { GhostBtn } from 'src/UI';

import IconLineChart from 'src/components/Icons/lineChart';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

export default function ApyBacktest({
  poolAddress,
  minPrice,
  maxPrice,
  onChange,
}: {
  poolAddress: string;
  minPrice: string;
  maxPrice: string;
  onChange: (val: { minPrice: string; maxPrice: string }) => void;
}) {
  const intl = useIntl();
  const showModal = useShowModal();
  return (
    <StyledApyBacktest className="apy-backtest">
      <GhostBtn
        onClick={() => {
          showModal({
            modal: ModalKeys.turboRangeApyBacktest,
            poolAddress,
            minPrice,
            maxPrice,
            onChange,
          });
        }}
      >
        <IconLineChart />
        {intl.turboRange.APY_Backtest}
      </GhostBtn>
    </StyledApyBacktest>
  );
}

const StyledApyBacktest = styled.div`
  width: 100%;
  .dg-ghost.mantine-Button-root {
    width: 100%;
    height: 36px;
    min-height: 36px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.blue}80;
    .mantine-Button-label {
      gap: 5px;
    }
  }
`;
