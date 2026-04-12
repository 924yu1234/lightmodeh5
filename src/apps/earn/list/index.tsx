import React, { useEffect } from 'react';

import { useCheckGetEarnDetail } from 'src/state/intent/earn/hooks';
import useCheckRegion from 'src/state/regionCheck/hooks';

import { StyledList } from './style';
import EarnTabs from './views/tabs';
import Portfolio from './views/top';

export default function Earns() {
  useCheckGetEarnDetail();
  const checkRegion = useCheckRegion();

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  return (
    <StyledList>
      <div className="list-inner">
        <Portfolio />
        <EarnTabs />
      </div>
    </StyledList>
  );
}
