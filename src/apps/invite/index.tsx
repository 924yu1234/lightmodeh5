import React from 'react';

import InviteContent from 'src/components/invite/content';
import { useIntl } from 'src/locals';

import { StyledCardDetail } from './style';

export default function CardDetail() {
  const intl = useIntl();

  return (
    <StyledCardDetail>
      <InviteContent width={440} />
      <div className="invite-tips">
        {intl.please_open_this_page_on_your_mobile_phone}
      </div>
    </StyledCardDetail>
  );
}
