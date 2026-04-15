import React from 'react';
import styled from 'styled-components';

import { SegmentedControl } from 'src/UI';

import DeTooltip from 'src/components/DeTooltip';
import { useIntl } from 'src/locals';
import { formatTurboRangeAPY } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';

import { useApyContext } from '../apyProvider';

export default function ApyView() {
  const { apy, aprType, setAprType } = useApyContext();
  const intl = useIntl();

  return (
    <StyledApy className="invest-apy">
      <div className="apy-inner">
        <div className="apy-item">
          <div className="apy-item-title">
            <DeTooltip
              title={intl.turboRange.Historical_APY_desc}
              childrenTitle={intl.turboRange.Historical_APY}
            />
          </div>
          <div className="apy-item-value">
            {formatTurboRangeAPY(apy)}

            <SegmentedControl
              data={[
                {
                  value: 'day',
                  label: intl.H1.replace('1', '24'),
                },
                {
                  value: 'week',
                  label: intl.D1.replace('1', '7'),
                },
                {
                  value: 'month',
                  label: intl.D1.replace('1', '30'),
                },
              ]}
              value={aprType}
              onChange={(val: string) => {
                setAprType(val as 'day' | 'week' | 'month');
              }}
            />
          </div>
        </div>
      </div>
    </StyledApy>
  );
}

const StyledApy = styled.div`
  margin-bottom: 10px;

  .apy-inner {
    background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 16px;
    line-height: 24px;
    margin-top: 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }

  .apy-item {
    .apy-item-title {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 16px;
      line-height: 24px;
    }
    .item-group {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-left: auto;
      .item {
        cursor: pointer;
        font-size: 14px;
        line-height: 20px;
        background: ${({ theme }) => theme.bg_white_05};
        padding: 5px 10px;
        border-radius: 5px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        &.selected {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
          background: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
    .apy-item-value {
      font-size: 16px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }
  .mantine-SegmentedControl-root {
    background: ${({ theme }) => theme.bg_b7b_10};
    border-radius: 15px;
    height: 28px;
    width: 180px;
    margin-left: auto;
    padding: 4px;
    .mantine-SegmentedControl-indicator {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
      border-radius: 10px;
      height: 20px;
    }
    .mantine-SegmentedControl-control {
      height: 20px;
      &:before {
        display: none;
      }
      .mantine-SegmentedControl-label {
        line-height: 20px;
        padding: 0 10px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 14px;
      }
      &[data-active] {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        .mantine-SegmentedControl-label {
          color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
  }
`;
