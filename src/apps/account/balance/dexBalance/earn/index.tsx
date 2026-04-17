import React, { useMemo } from 'react';
import styled from 'styled-components';

import { SegmentedControl } from 'src/UI';

import { useIntl } from 'src/locals';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import SimpleEarn from './simpleEarn';
import TurboRangeList from './turboRange';

/** Align with `user/reducer` + mobile balance (`turboRange` | `simpleEarn`). */
type EarnSubTab = 'turboRange' | 'simpleEarn';

function normalizeEarnSubTab(raw: string | undefined): EarnSubTab {
  if (raw === 'simpleEarn' || raw === 'simple-earn') return 'simpleEarn';
  if (raw === 'turboRange' || raw === 'turbo-range') return 'turboRange';
  return 'simpleEarn';
}

export default function EarnList() {
  const intl = useIntl();
  const rawFlag = useUserFlag('earn_tab');
  const tab = useMemo(() => normalizeEarnSubTab(rawFlag), [rawFlag]);
  const changeTab = useChangeFlag('earn_tab');

  return (
    <StyledEarnList>
      <div className="earn-tier2-toolbar">
        <SegmentedControl
          className="earn-tier2-segment"
          appearance="compact"
          value={tab}
          onChange={(v) => {
            if (v === 'turboRange' || v === 'simpleEarn') changeTab(v);
          }}
          data={[
            { value: 'turboRange', label: intl.turboRange.Turbo_Range },
            { value: 'simpleEarn', label: intl.turboRange.Simple_Earn },
          ]}
        />
      </div>
      <div className="earn-tier2-body">
        {tab === 'simpleEarn' && <SimpleEarn />}
        {tab === 'turboRange' && <TurboRangeList />}
      </div>
    </StyledEarnList>
  );
}

const StyledEarnList = styled.div`
  .earn-tier2-toolbar {
    display: flex;
    align-items: center;
    margin: 0 0 14px;
    padding-bottom: 12px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  }

  .earn-tier2-segment.mantine-SegmentedControl-root {
    flex: 0 1 auto;
    max-width: 320px;
  }

  .earn-tier2-body {
    width: 100%;
  }

  .turbo-range-list {
    padding: 0 10px;
    .item {
      max-width: 500px;
    }
  }
`;
