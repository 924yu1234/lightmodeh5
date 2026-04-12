import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useChainInfo, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import IconArrowDown from '../Icons/arrowDown';
import IconBalance from '../Icons/balance';
import { useBridgeUsdcData } from './dataProvider';

export default function ToToken() {
  const intl = useIntl();
  const { toToken, setToToken, fromToken, setFromToken, amount } =
    useBridgeUsdcData();
  const chainInfo = useChainInfo(toToken?.chain as Type_DAChains);

  const usdcBalance = useUsdcBalance({ token: toToken });
  const showModal = useShowModal();
  const selectToken = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      showModal({
        modal: ModalKeys.bridgeUsdcChooseToken,
        token: toToken,
        onSelectToken: (token: Token) => {
          setToToken(token);
          if (token.id === fromToken?.id) {
            setFromToken(undefined);
          }
        },
      });
    },
    [showModal, toToken, setToToken, fromToken, setFromToken]
  );

  return (
    <StyledToToken className="token">
      <div className="token-inner">
        <div className="pay-title">
          {intl.To}
          {toToken && (
            <div className="balance">
              <IconBalance />
              <div className="balance-num">{usdcBalance?.available || '0'}</div>
              <div className="balance-symbol">{toToken?.symbol}</div>
            </div>
          )}
        </div>
        <div className="pay-content">
          <StyledToken onClick={selectToken}>
            {!toToken ? (
              <div className="select-token-label">
                {intl.Select_Token} <IconArrowDown />
              </div>
            ) : (
              <>
                <TokenIcon token={toToken} size={28} />
                <div className="token-symbol">
                  <div className="token-symbol-text">
                    {toToken?.symbol ?? ''} <IconArrowDown />
                  </div>
                  <div className="token-chain">{chainInfo?.name}</div>
                </div>
              </>
            )}
          </StyledToken>
          <div className="amount">{toToken && fromToken ? amount : ''}</div>
        </div>
      </div>
    </StyledToToken>
  );
}

export const StyledToToken = styled.div`
  margin-top: -20px;
  .token-inner {
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    min-height: 100px;
    padding: 8px 0 2px;
  }
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .pay-title {
    padding: 0 12px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .balance {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .pay-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
    padding: 0 12px 0 7px;
    .amount {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 22px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
`;

export const StyledToken = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  height: 40px;
  padding: 5px 12px 5px 5px;
  .select-token-label {
    font-size: 14px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    padding: 0 5px;
  }
  .token-symbol {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    .token-symbol-text {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .token-chain {
      font-size: 12px;
      line-height: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
  }
  &:hover {
    ${({ theme }: { theme: ThemeType }) => !theme.isMobile && PCStyle};
  }
`;

const PCStyle = css`
  background-color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_10};
  border-radius: 20px;
`;
