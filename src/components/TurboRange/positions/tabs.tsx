import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useTurboRangePositionByPositionAddress } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import HistoryLink from '../historyLink';
import ActiveList from './activeList';
import ClosedList from './closedList';

export default function PositionsTabs() {
  const intl = useIntl();
  const location = useLocation();

  const {
    tab = 'active',
    position,
    ...rest
  } = queryString.parse(location.search) ?? {};
  const [_tab, setTab] = useState<'active' | 'closed'>(
    tab as 'active' | 'closed'
  );
  const [initOpenPosition, setInitOpenPosition] = useState<boolean>(false);
  const _position = useTurboRangePositionByPositionAddress(position as string);
  const showModal = useShowModal();
  const navigate = useCustomNavigate();

  useEffect(() => {
    if (_position && !initOpenPosition) {
      setInitOpenPosition(true);
      navigate(
        `${location.pathname}?${queryString.stringify({
          ...rest,
        })}`,
        { replace: true }
      );
      showModal({
        modal: ModalKeys.turboRangeDetail,
        position: _position,
      });
      setTab(_position.status === 'OPEN' ? 'active' : 'closed');
    }
  }, [
    _position,
    initOpenPosition,
    showModal,
    location.pathname,
    rest,
    navigate,
  ]);
  return (
    <StyledTopsPairs className="positions-tabs">
      <Tabs
        value={_tab}
        onChange={(v) => setTab(v as 'active' | 'closed')}
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab value="active">{intl.active}</Tabs.Tab>
          <Tabs.Tab value="closed">{intl.Closed}</Tabs.Tab>
          <HistoryLink />
        </Tabs.List>
        <Tabs.Panel value="active">
          <ActiveList inBalancePage={false} />
        </Tabs.Panel>
        <Tabs.Panel value="closed">
          <ClosedList inBalancePage={false} />
        </Tabs.Panel>
      </Tabs>
    </StyledTopsPairs>
  );
}

export const StyledTopsPairs = styled.div`
  .mantine-Tabs-root .mantine-Tabs-list {
    border-bottom: 1px solid ${({ theme }) => theme.bg_white_10};
    padding: 0 0 0 20px;
    .mantine-Tabs-tab {
      padding: 0 5px;
      font-size: 14px;
      height: 40px;
      padding: 0;
      border-bottom: 2px solid transparent;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      &[data-active] {
        border-bottom: 2px solid
          ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
  .empty-text {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
`;
