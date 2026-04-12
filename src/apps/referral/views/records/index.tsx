import React, { useCallback, useState } from 'react';

import { Tabs } from 'src/UI';

import { useIntl } from 'src/locals';

import { ReferralTab } from '../../types';
import MyInvitesTable from './myInvitesTable';
import ReferralDetailsTable from './referralDetailsTable';
import { StyledRecords } from './styles';

export default function TableContent() {
  const intl = useIntl();
  const [tab, setTab] = useState<ReferralTab>('details');

  const handleChangeTab = useCallback((value: string | null) => {
    if (value === 'invites') {
      setTab('invites');
      return;
    }
    setTab('details');
  }, []);

  return (
    <StyledRecords>
      <Tabs value={tab} onChange={handleChangeTab} keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="details">{intl.Referral_Details}</Tabs.Tab>
          <Tabs.Tab value="invites">{intl.My_Invites}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <ReferralDetailsTable />
        </Tabs.Panel>
        <Tabs.Panel value="invites">
          <MyInvitesTable />
        </Tabs.Panel>
      </Tabs>
    </StyledRecords>
  );
}
