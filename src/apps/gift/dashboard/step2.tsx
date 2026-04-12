import React from 'react';
import styled from 'styled-components';

import { useDexAccount } from 'src/state/dexAccount/hooks';

import Step2Claim from './step2Claim';
import TipsConnect from './step2TipsConnect';

export default function Step2({ giftInfo }: { giftInfo: any }) {
  const dexAccount = useDexAccount();
  const hasSyncDA = dexAccount?.hasSyncDA;

  return (
    <StyledGiftBox>
      {hasSyncDA && <Step2Claim giftInfo={giftInfo} />}
      {!hasSyncDA && <TipsConnect giftInfo={giftInfo} />}
    </StyledGiftBox>
  );
}

const StyledGiftBox = styled.div``;
