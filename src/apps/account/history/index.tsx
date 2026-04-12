import React from 'react';
import { useParams } from 'react-router-dom';

import { Tabs } from 'src/UI';

import Empty from 'src/components/Empty';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useHasAccessToken } from 'src/providers/useWallet';

import { useIntl } from 'js/locals';

import BridgeHistory from './bridge';
import EarnOrders from './earn';
import Receive from './receive';
import Send from './send';
import { StyledHistory } from './style';
import SwapOrders from './swap';
import TurboRangeOrders from './turboRange';

export default function AccountHistory() {
  const intl = useIntl();
  const { tab = 'swap' } = useParams();
  const navigate = useCustomNavigate();
  const hasAccessToken = useHasAccessToken();

  if (!hasAccessToken) {
    return (
      <StyledHistory>
        <Empty
          source="account_history"
          className="history-empty"
          signToViewTipsType="history"
        />
      </StyledHistory>
    );
  }
  return (
    <StyledHistory>
      <div className="title">{intl.history}</div>

      <Tabs
        keepMounted={false}
        className="history-tabs"
        value={tab}
        onChange={(v) => navigate(`/account/history/${v}`, { replace: true })}
      >
        <Tabs.List>
          <Tabs.Tab value="swap">{intl.Swap}</Tabs.Tab>
          <Tabs.Tab value="send">{intl.Send}</Tabs.Tab>
          <Tabs.Tab value="receive">{intl.Receive}</Tabs.Tab>
          <Tabs.Tab value="bridge">{intl.Bridge}</Tabs.Tab>
          <Tabs.Tab value="simple-earn">{intl.turboRange.Simple_Earn}</Tabs.Tab>
          <Tabs.Tab value="turbo-range">{intl.turboRange.Turbo_Range}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="swap">
          <SwapOrders />
        </Tabs.Panel>
        <Tabs.Panel value="bridge">
          <BridgeHistory />
        </Tabs.Panel>
        <Tabs.Panel value="simple-earn">
          <EarnOrders />
        </Tabs.Panel>
        <Tabs.Panel value="turbo-range">
          <TurboRangeOrders />
        </Tabs.Panel>
        <Tabs.Panel value="send">
          <Send />
        </Tabs.Panel>
        <Tabs.Panel value="receive">
          <Receive />
        </Tabs.Panel>
      </Tabs>
    </StyledHistory>
  );
}
