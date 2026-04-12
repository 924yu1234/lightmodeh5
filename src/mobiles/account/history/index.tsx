import React, { useEffect, useMemo } from 'react';
import { isAndroid } from 'react-device-detect';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Empty from 'src/components/Empty';
import ReceiveChainSelect from 'src/components/ReceiveChainSelect';
import { useShowH5Header } from 'src/h5/utils';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useWallet, {
  useHasAccessToken,
  useIsAppH5,
  useSetTitle,
} from 'src/providers/useWallet';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

import useWindowSize from 'js/hooks/useWindowSize';
import { useIntl } from 'js/locals';
import Header from 'js/mobiles/components/header';

import ApprovalHistory from './approval';
import BridgeHistory from './bridge';
import BrowserHistory from './browser';
import EarnHistory from './earn';
import Receive from './receive';
import SelectTab from './selectTab';
import Send from './send';
import SwapHistory from './swap';
import MTurboRangeHistory from './turboRange';

export default function AccountHistory() {
  const intl = useIntl();
  const isAppH5 = useIsAppH5();
  const showH5Header = useShowH5Header();
  const { isFullVersion: appFullVersion } = useWallet();

  const isFullVersion = appFullVersion || isAndroid;

  // android 和 允许 raffle时 都显示 swap|earn|browser
  const initTab = isAppH5 && !isFullVersion ? 'receive' : 'swap';

  const { tab = initTab } = useParams();
  const navigate = useCustomNavigate();
  const hasAccessToken = useHasAccessToken();
  const setDocumentTitle = useSetTitle();

  useEffect(() => {
    setDocumentTitle(intl.history);
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl.history]);

  const { height } = useWindowSize();
  const contentHeight = height - 48 - (!showH5Header ? 0 : 52);
  const location = useLocation();
  const keys = useMemo(() => {
    if (isAppH5) {
      if (isFullVersion) {
        return [
          'swap',
          'send',
          'receive',
          'bridge',
          'simple-earn',
          'turbo-range',
          'approval',
          'contract-call',
        ];
      }
      return ['send', 'receive', 'bridge', 'turbo-range'];
    }
    return [
      'swap',
      'simple-earn',
      'send',
      'receive',
      'bridge',
      'misc',
      'turbo-range',
    ];
  }, [isAppH5, isFullVersion]);

  const allOptions = useMemo(() => {
    return [
      { label: intl.Swap, value: 'swap' },
      { label: intl.Send, value: 'send' },
      { label: intl.Receive, value: 'receive' },
      { label: intl.Bridge, value: 'bridge' },
      { label: intl.turboRange.Simple_Earn, value: 'simple-earn' },
      { label: intl.turboRange.Turbo_Range, value: 'turbo-range' },
      { label: intl.Approval, value: 'approval' },
      { label: intl.Contract_Call, value: 'contract-call' },
      // { label: intl.Miscellaneous, value: 'misc' },
    ].filter((d) => keys.includes(d.value));
  }, [intl, keys]);

  const index = useMemo(() => {
    return keys.indexOf(tab);
  }, [tab, keys]);

  useEffect(() => {
    if (tab === 'browser') {
      navigate('/account/history/contract-call', { replace: true });
      return;
    }
    if (index === -1) {
      navigate('/account/history/swap', { replace: true });
    }
  }, [index, navigate, tab]);

  const receiveChain = useUserFlag('receive_history_filter_chain');
  const setReceiveChain = useChangeFlag('receive_history_filter_chain');

  if (!hasAccessToken) {
    return (
      <StyledHistory>
        {showH5Header && (
          <Header
            title={intl.history}
            backUrl={
              location.key === 'default' ? '/account/balance' : undefined
            }
          />
        )}
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
      {showH5Header && (
        <Header
          title={intl.history}
          backUrl={location.key === 'default' ? '/account/balance' : undefined}
        />
      )}
      <div className="history-header">
        <div className="history-header-inner">
          <div className="select-tab-wrapper">
            {intl.filter}
            <SelectTab tab={tab} options={allOptions} />
          </div>
          {tab === 'receive' && (
            <ReceiveChainSelect
              value={receiveChain}
              onChange={setReceiveChain}
            />
          )}
        </div>
      </div>
      <div className="panel-inner">
        {tab === 'swap' && <SwapHistory height={contentHeight} />}
        {tab === 'simple-earn' && <EarnHistory height={contentHeight} />}
        {tab === 'receive' && <Receive height={contentHeight} />}
        {tab === 'send' && <Send height={contentHeight} />}
        {tab === 'bridge' && <BridgeHistory height={contentHeight} />}
        {tab === 'browser' && <BrowserHistory height={contentHeight} />}
        {tab === 'turbo-range' && <MTurboRangeHistory height={contentHeight} />}
        {tab === 'approval' && <ApprovalHistory height={contentHeight} />}
        {tab === 'contract-call' && <BrowserHistory height={contentHeight} />}
      </div>
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  height: ${(props) => props.theme.windowHeight}px;
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;
  .history-empty {
    margin-top: 100px;
  }
  .history-header {
    padding: 0 10px;
    margin-bottom: 15px;
    .history-header-inner {
      border-bottom: 1px solid ${(props) => props.theme.innerBorder};
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 0 10px;
    }
    .select-tab-wrapper {
      color: ${(props) => props.theme.t_b7b_80};
      display: flex;
      align-items: center;
      gap: 15px;
      height: 32px;
    }
  }
  .history-day {
    font-size: 14px;
    color: ${(props) => props.theme.t_b7b};
    margin-bottom: 10px;
    line-height: 18px;
    height: 30px;
    margin: 30px 0 0;
    padding: 0 20px;
    width: 100%;
    &.first-day {
      margin-top: 0;
    }
  }
  .history-items {
    flex-direction: column;
    .history-day {
      display: none;
    }
    &.show-time {
      .history-day {
        display: block;
      }
    }
  }
`;
