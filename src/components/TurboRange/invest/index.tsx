import React from 'react';
import styled from 'styled-components';

import { useInvestMode } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

import ApyProvider from './apyProvider';
import DualInvest from './dual';
import SingleInvest from './single';

function InvestInner() {
  const investMode = useInvestMode();
  return (
    <StyledInvest className="turbo-range-invest">
      {investMode === 'single' ? <SingleInvest /> : <DualInvest />}
    </StyledInvest>
  );
}

export default function Invest({
  poolAddress,
  initialMinPrice,
  initialMaxPrice,
}: {
  poolAddress: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
}) {
  return (
    <ApyProvider
      poolAddress={poolAddress}
      initialMinPrice={initialMinPrice}
      initialMaxPrice={initialMaxPrice}
    >
      <InvestInner />
    </ApyProvider>
  );
}

const StyledInvest = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
  }
  .item-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 22px;
  }

  .invest-btn.mantine-Button-root {
    margin-top: 12px;
    min-height: 50px;
    width: 100%;
  }

  .apy-backtest {
    margin-top: 10px;
  }

  .account-check-wrapper {
    padding: 30px 0 0;
    width: 100%;
    .empty-text {
      margin: 0 0 5px 0;
    }
    .empty-btn {
      width: 100%;
      .mantine-Button-root {
        width: 100%;
      }
    }
  }
`;
