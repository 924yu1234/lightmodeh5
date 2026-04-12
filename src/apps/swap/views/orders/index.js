import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Checkbox as DeCheckbox, Tabs } from 'src/UI';

import BalanceTab from 'src/apps/components/BalanceTab';

import useWindowSize from 'js/hooks/useWindowSize';
import { useIntl } from 'js/locals';
import {
  useChangeFlag,
  useIsShowCurrentPair,
  useSetShowCurrentPair,
  useUserFlag,
} from 'js/state/user/hooks';

import OrderHistory from './orderHistory';

export default function SpotOrders() {
  const intl = useIntl();
  const showCurrentPair = useIsShowCurrentPair('swap');
  const setShowCurrentPair = useSetShowCurrentPair('swap');
  const ref = useRef();
  const { height, width } = useWindowSize();
  const [currentTab, setCurrentTab] = useState('my_history');
  const hideSmallbalances = useUserFlag('hide_small_balances');
  const updateFlag = useChangeFlag('hide_small_balances');

  const maxHeight = useMemo(() => {
    if (ref?.current) return ref.current.clientHeight - 50;
    return 266;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current, height]);

  const tableWidth = useMemo(() => {
    if (ref?.current) return ref.current.clientWidth - 40;
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current, width]);

  return (
    <StyledSpotOrders ref={ref} tableWidth={tableWidth}>
      <Tabs value={currentTab} onChange={setCurrentTab}>
        <Tabs.List>
          <Tabs.Tab value="my_history">{intl.history}</Tabs.Tab>
          <Tabs.Tab value="balance">{intl.balance}</Tabs.Tab>
          {currentTab === 'my_history' && (
            <div className="tabs-extra">
              <DeCheckbox
                showHoverBg
                checked={showCurrentPair}
                onChange={(e) => {
                  setShowCurrentPair(e.target.checked);
                }}
                label={intl.hide_other_tokens}
              />
            </div>
          )}
          {currentTab === 'balance' && (
            <div className="tabs-extra">
              <DeCheckbox
                showHoverBg
                checked={hideSmallbalances}
                onChange={(e) => updateFlag(e.target.checked)}
                label={intl.hide_balances_less_than_10.replace('10', '0.1')}
              />
            </div>
          )}
        </Tabs.List>
        <Tabs.Panel value="my_history">
          <OrderHistory maxHeight={maxHeight} tableWidth={tableWidth} />
        </Tabs.Panel>
        <Tabs.Panel value="balance">
          <BalanceTab maxHeight={maxHeight} />
        </Tabs.Panel>
      </Tabs>
    </StyledSpotOrders>
  );
}

SpotOrders.propTypes = {};

export const StyledSpotOrders = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 16px;
  .mantine-Tabs-root {
    .mantine-Tabs-list {
      display: flex;
      margin-bottom: 10px;
      padding: 0;
      height: 40px;
      align-items: center;
      .mantine-Tabs-tab {
        line-height: 39px;
        min-height: 39px;
        padding: 0;
        display: flex;
        align-items: center;
        .mantine-Tabs-tabLabel {
          white-space: normal;
          text-align: center;
          line-height: 16px;
        }
        & + .mantine-Tabs-tab {
          margin-left: ${({ tableWidth }) => (tableWidth < 1090 ? 15 : 32)}px;
        }
        padding-top: 5px;
      }
      .tabs-extra {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
  .history-orders {
    padding: 20px;
  }
  .dg-empty {
    padding-top: 150px;
  }
`;
