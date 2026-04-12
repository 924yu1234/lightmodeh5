import React, { useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import useBridgeUsdc from 'src/state/dexAccount/opr/useBridgeUsdc';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import { useFungibleUsdc } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import TokenItem from './tokenItem';

// for turboRangeInvest
export default function SelectUsdcModalWEB() {
  const intl = useIntl();
  const { hide, usdc, selectUsdc } = useModals(ModalKeys.chooseUsdcWEB);
  const fungibleUsdc = useFungibleUsdc();
  const sortedFungibleUsdc = useMemo(() => {
    return orderByFn(fungibleUsdc?.balances, ['availableNumber'], ['desc']);
  }, [fungibleUsdc?.balances]);
  const receive = useReceive();
  const bridgeUsdc = useBridgeUsdc();

  return (
    <StyledModal className="modal-wrapper">
      <div className="modal-content" style={{ padding: 0 }}>
        <div className="token-list hideScrollBar">
          {sortedFungibleUsdc?.map((item: any) => {
            return (
              <TokenItem
                key={item.chain + item.code}
                token={item}
                onClick={() => {
                  selectUsdc(item);
                  hide();
                }}
              />
            );
          })}
        </div>
        <div className="entries-items">
          <div
            className="entry-item"
            onClick={() => {
              receive({ token: usdc });
              hide();
            }}
          >
            <div className="item-title">{intl.receive_usdc}</div>
            <div className="item-tips">{intl.from_other_wallets}</div>
          </div>
          <div
            className="entry-item"
            onClick={() => {
              bridgeUsdc({ fromToken: usdc });
              hide();
            }}
          >
            <div className="item-title">{intl.bridge_usdc}</div>
            <div className="item-tips">{intl.consolidate_to_one_chain}</div>
          </div>
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;

  .modal-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .modal-content {
    height: 100%;
    width: 100%;
  }

  .token-list {
    margin-bottom: 30px;
    max-height: calc(100% - 120px);
    overflow-y: auto;
    .token-item {
      padding: 0 30px;
    }
  }
  .entries-items {
    display: flex;
    gap: 10px;
    margin-top: auto;
    padding: 0 30px;
    .entry-item {
      cursor: pointer;
      flex: 1;
      padding: 10px 5px;
      background: ${({ theme }) => theme.bg_white_05};
      border: 1px solid ${({ theme }) => theme.border_b7b_20};
      border-radius: 4px;
      min-height: 60px;
      .item-title {
        text-align: center;
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        font-size: 16px;
        line-height: 22px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      }
      &:hover {
        border: 1px solid ${({ theme }) => theme.border_blue};
        color: ${({ theme }) => theme.blue};
        background: ${({ theme }: { theme: ThemeType }) =>
          !theme.isMobile ? theme.bg_blue_25 : 'none'};
      }

      .item-tips {
        text-align: center;
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      }
    }
  }
`;
