import React from 'react';

import useReferralSummaryData from 'src/apps/referral/hooks/useReferralSummaryData';

import CommissionRateCard from './commissionRateCard';
import LinkCard from './linkCard';
import OverviewCard from './overviewCard';
import { StyledSummary } from './styles';

export default function ReferralSummary() {
  const {
    claimDisabled,
    claimTokenChain,
    claimTokenId,
    commissionEarned,
    invitesCount,
    link,
    swapLevel1Rate,
    swapLevel2Rate,
    turboLevel1Rate,
    turboRangeLevel2Rate,
    unclaimedCommission,
  } = useReferralSummaryData();

  return (
    <StyledSummary>
      <LinkCard link={link} disabled={!link} />

      <div className="summary-grid ">
        <OverviewCard
          claimTokenChain={claimTokenChain}
          claimTokenId={claimTokenId}
          invitesCount={invitesCount}
          commissionEarned={commissionEarned}
          unclaimedCommission={unclaimedCommission}
          claimDisabled={claimDisabled}
        />

        <CommissionRateCard
          level1Rate={swapLevel1Rate}
          swapLevel2Rate={swapLevel2Rate}
          turboRangeRate={turboLevel1Rate}
          turboRangeLevel2Rate={turboRangeLevel2Rate}
        />
      </div>
    </StyledSummary>
  );
}
