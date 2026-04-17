import React from 'react';
import styled from 'styled-components';

import IconHistoryOprSwap from 'src/components/Icons/historyOprSwap';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function MobileListRowsSection() {
  const intl = useIntl();
  return (
    <StyledSection>
      <h2 className="section-title">Mobile list rows</h2>

      <ComponentCard
        title="Swap — History row"
        description="Matches mobile Swap History item: 50px row, icon + title + amount stack, tap affordance. Hover uses pressTint (list feedback in showcase)."
      >
        <PhoneFrame>
          <div className="history-day">2026-04-16</div>
          <SwapHistoryRow className="history-items show-time">
            <div className="history-item-inner" role="button" tabIndex={0}>
              <IconHistoryOprSwap size={28} />
              <div className="item-text">{intl.Swap}</div>
              <div className="amount">
                <div className="amount-receive">+120.5 USDC</div>
                <div className="amount-pay">-0.05 ETH</div>
              </div>
            </div>
          </SwapHistoryRow>
          <SwapHistoryRow className="history-items">
            <div className="history-item-inner" role="button" tabIndex={0}>
              <IconHistoryOprSwap size={28} />
              <div className="item-text">{intl.Swap}</div>
              <div className="amount">
                <div className="amount-receive">+42.1 USDC</div>
                <div className="amount-pay">-0.02 ETH</div>
              </div>
            </div>
          </SwapHistoryRow>
        </PhoneFrame>
      </ComponentCard>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
`;

const PhoneFrame = styled.div`
  max-width: 420px;
  padding: 12px 0 8px;
  border-radius: 12px;
  background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};

  .history-day {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    line-height: 18px;
    padding: 0 20px 8px;
  }
`;

const SwapHistoryRow = styled.div`
  margin-bottom: 4px;
  display: flex;
  gap: 10px;
  align-items: center;

  .history-item-inner {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 50px;
    border-radius: 8px;
    transition: background-color 0.15s ease;

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
      }
    }

    &:active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    }
  }

  .icon-history-opr-swap {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    flex-shrink: 0;
  }

  .item-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .amount {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    margin-left: auto;
    text-align: right;
  }

  .amount-receive {
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
  }

  .amount-pay {
    font-size: 11px;
    line-height: 11px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
`;
