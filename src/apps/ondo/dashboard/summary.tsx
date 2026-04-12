import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import { useOndoStocks } from '../useOndoStocks';
import { useOndo } from './dataProvider';

export default function Summary() {
  const { list } = useOndoStocks();
  const { totalAum } = useOndo();
  const intl = useIntl();
  return (
    <StyledSummary>
      <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalAum, '0,0') || '--'}
        </div>
        <div className="summary-item-title">{intl.stocks.total_aum}</div>
      </div>
      {/* <div className="summary-item">
        <div className="summary-item-value">
          {digit.formatInGroupSeparator(totalHolders)}
        </div>
        <div className="summary-item-title">
          {intl.stocks.total_unique_holders}
        </div>
      </div> */}
      <div className="summary-item">
        <div className="summary-item-value">
          {digit.formatInGroupSeparator(list?.length || 0) || '--'}
        </div>
        <div className="summary-item-title">
          {intl.stocks.total_assets.replace('xStock', 'Ondo')}
        </div>
      </div>
      {/* <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalDexVolume, '0,0')}
        </div>
        <div className="summary-item-title">{intl.stocks.total_dex_volume}</div>
      </div> */}
      {/* <div className="summary-item">
        <div className="summary-item-value">
          ${digit.format(totalTvl, '0,0')}
        </div>
        <div className="summary-item-title">{intl.stocks.total_tvl}</div>
      </div> */}
    </StyledSummary>
  );
}

const StyledSummary = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }: { theme: ThemeType }) =>
    theme?.isMobile ? '1fr 1fr' : '1fr 1fr'};
  gap: 20px;
  margin-bottom: 20px;
  .summary-item {
    min-height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    .summary-item-value {
      font-size: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      line-height: 24px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .summary-item-title {
      font-size: 12px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      line-height: 16x;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
      text-align: center;
    }
  }
`;
