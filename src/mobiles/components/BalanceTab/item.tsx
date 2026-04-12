import React from 'react';
import styled from 'styled-components';

import { useTokenSwapUrl } from 'src/hooks/choosePair';
import { ThemeType } from 'src/theme';

import TokenSymbol from 'js/components/Token/symbol';
import { useIntl } from 'js/locals';

export default function BalanceTabItem({ balance }: { balance: any }) {
  const intl = useIntl();

  const { isUsdc, handleClick, isCurrentPageAndPair } = useTokenSwapUrl({
    token: balance?.token || balance,
  });

  const _disableNavigate = isUsdc || isCurrentPageAndPair;

  return (
    <StyledItem
      className="balance-tab-item"
      onClick={_disableNavigate ? undefined : handleClick}
    >
      <TokenSymbol token={balance?.token || balance} showTokenName />
      <div className="items">
        <div className="item">
          <div className="item-title">{intl.available}</div>
          <div className="item-value">{balance.availableDisplay || '--'}</div>
        </div>
        <div className="item">
          <div className="item-title">{intl['account.assets_market']}</div>
          <div className="item-value">
            {balance.availableValueDisplay || '--'}
          </div>
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  margin-bottom: 10px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  padding: 15px 15px 10px;
  min-height: 65px;
  background: ${(props) => props.theme.bg_05};
  border-radius: 8px;

  .items {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .item {
      flex: 1.5;
      &:last-child {
        flex: 1;
      }
      .item-title {
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      }
      .item-value {
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      }
    }
  }
`;
