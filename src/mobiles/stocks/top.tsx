import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useOndo } from 'src/apps/ondo/dashboard/dataProvider';
import { useDailyTokenSupply } from 'src/apps/xstocks/dashboard/hooks';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import IconOndo from 'src/imgs/ondo@3x.png';
import IconXStocks from 'src/imgs/xStocks@3x.png';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

export default function StocksTop() {
  const navigate = useCustomNavigate();
  const tab = useUserFlag('stocks_tab');
  const changeTab = useChangeFlag('stocks_tab');

  const [totalAumOndo, setTotalAumOndo] = useState<string>(
    localStorage.getItem('totalAumOndo') || ''
  );
  const [totalAumXStocks, setTotalAumXStocks] = useState<string>(
    localStorage.getItem('totalAumXStocks') || ''
  );

  const { totalAum: ondoTotalAum } = useOndo();

  const { totalAum: xStocksTotalAum } = useDailyTokenSupply();

  useEffect(() => {
    if (!ondoTotalAum) return;
    setTotalAumOndo(`${ondoTotalAum}`);
    localStorage.setItem('totalAumOndo', `${ondoTotalAum}`);
  }, [ondoTotalAum]);

  useEffect(() => {
    if (!xStocksTotalAum) return;
    setTotalAumXStocks(`${xStocksTotalAum}`);
    localStorage.setItem('totalAumXStocks', `${xStocksTotalAum}`);
  }, [xStocksTotalAum]);

  return (
    <StyledStocks>
      <div className="tabs">
        <div
          className={`tab-item ${tab === 'xstocks' ? 'active' : ''}`}
          onClick={() => {
            changeTab('xstocks');
            navigate('/stocks/xstocks', { replace: true });
          }}
        >
          <div className="tab-item-inner">
            <img src={IconXStocks} alt="xStocks" className="icon" />
            <div className="tab-label">xStocks</div>
          </div>
          <div className="tab-item-aum">
            AUM{' '}
            <span className="tab-item-aum-value">
              ${digit.format(totalAumXStocks, '0,0') || '--'}
            </span>
          </div>
        </div>
        <div
          className={`tab-item ${tab === 'ondo' ? 'active' : ''}`}
          onClick={() => {
            changeTab('ondo');
            navigate('/stocks/ondo', { replace: true });
          }}
        >
          <div className="tab-item-inner">
            <img src={IconOndo} alt="Ondo" className="icon" />
            <div className="tab-label">Ondo</div>
          </div>
          <div className="tab-item-aum">
            AUM{' '}
            <span className="tab-item-aum-value">
              ${digit.format(totalAumOndo, '0,0') || '--'}
            </span>
          </div>
        </div>
      </div>
    </StyledStocks>
  );
}

export const StyledStocks = styled.div`
  margin-bottom: 5px;
  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
    .tab-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-direction: column;
      position: relative;
      gap: 5px;
      height: 55px;
      min-width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? '50%' : 200}px;
      .tab-item-inner {
        display: flex;
        align-items: center;
      }
      .tab-item-aum {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
        .tab-item-aum-value {
          ${({ theme }: { theme: ThemeType }) => theme.fontBold};
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        }
      }
      .icon {
        width: 30px;
        height: 30px;
      }
      .tab-label {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
        font-size: 20px;
      }
      &.active {
        .tab-label {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
  }
`;
