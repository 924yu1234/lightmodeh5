import React, { useState } from 'react';
import styled from 'styled-components';

import { Checkbox as DeCheckbox } from 'src/UI';

import IconAllOrders from 'src/components/Icons/allOrders';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import MBalanceTab from 'src/mobiles/components/BalanceTab';
import useWallet from 'src/providers/useWallet';

import { useIntl } from 'js/locals';
import {
  useChangeFlag,
  useIsShowCurrentPair,
  useSetShowCurrentPair,
  useUserFlag,
} from 'js/state/user/hooks';

import SwapOrders from './list';

export default function Orders() {
  const intl = useIntl();

  const showCurrentPair = useIsShowCurrentPair('swap');
  const setShowCurrentPair = useSetShowCurrentPair('swap');
  const hideSmallbalances = useUserFlag('hide_small_balances');
  const updateFlag = useChangeFlag('hide_small_balances');
  const { renderSwapBtn } = useWallet();
  const navigate = useCustomNavigate();

  const [showTab, setShowTab] = useState('history');

  return (
    <StyledOrders className="orders">
      <div className="orders-title">
        <div
          className={`orders-title-item ${
            showTab === 'history' ? 'active' : ''
          }`}
          onClick={() => setShowTab('history')}
        >
          {intl.history}
        </div>
        <div
          className={`orders-title-item ${
            showTab === 'balance' ? 'active' : ''
          }`}
          onClick={() => setShowTab('balance')}
        >
          {intl.balance}
        </div>
        <div
          className="orders-link"
          onClick={() => {
            if (renderSwapBtn) renderSwapBtn({ width: 0 } as any);
            navigate('/account/history/swap');
          }}
        >
          <IconAllOrders className="icon-allOrders" />
        </div>
      </div>
      {showTab === 'history' && (
        <div className="orders-action">
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
      {showTab === 'balance' && (
        <div className="orders-action">
          <DeCheckbox
            showHoverBg
            checked={hideSmallbalances}
            onChange={(e) => updateFlag(e.target.checked)}
            label={intl.hide_balances_less_than_10.replace('10', '0.1')}
          />
        </div>
      )}
      {showTab === 'history' ? (
        <SwapOrders />
      ) : (
        <MBalanceTab scrollableTarget="mobileSwapScroll" />
      )}
    </StyledOrders>
  );
}

const StyledOrders = styled.div`
  .orders-title,
  .orders-action {
    display: flex;
    align-items: center;
  }
  .orders-title {
    ${(props) => props.theme.fontMedium};
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    color: ${(props) => props.theme.t_b7b};
    border-bottom: 1px solid ${(props) => props.theme.innerBorder};
    margin-bottom: 10px;

    .orders-title-item {
      margin-bottom: -1px;
      font-size: 14px;
      ${(props) => props.theme.fontMedium};

      line-height: 38px;
      margin-right: 30px;
      border-bottom: 2px solid transparent;
      &.active {
        color: ${(props) => props.theme.t_fff};
        border-bottom-color: ${(props) => props.theme.blue};
      }
    }

    .orders-link {
      padding: 0 20px;
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: -10px;
      .icon-allOrders {
        width: 14px;
      }
      font-size: 12px;
      margin-left: auto;
    }
  }
  .orders-action {
    margin: 0 0 10px 0;
    height: 20px;
    color: ${(props) => props.theme.gray};
    font-size: 12px;
    .cancel-all {
      ${(props) => props.theme.fontRegular};
      margin-left: auto;
      cursor: pointer;
    }
  }
`;
