import React from 'react';

import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';

import AccountCheck, { StyledEmpty } from './AccountCheck';

export default function Empty({
  children,
  className = '',
  showAccountTips = true,
  signToViewTipsType,
  source,
}: {
  children?: React.ReactElement;
  className?: string;
  showAccountTips?: boolean;
  signToViewTipsType?: 'balance' | 'history' | 'security_options' | 'common';
  source?: Initialize_Source;
}) {
  return (
    <AccountCheck
      className={className}
      showAccountTips={showAccountTips}
      signToViewTipsType={signToViewTipsType}
      source={source || ''}
    >
      <StyledEmpty className={`${className} dg-empty`}>{children}</StyledEmpty>
    </AccountCheck>
  );
}

export { StyledEmpty };
