import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useChainInfo, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';

import { useIntl } from 'js/locals';

import IconArrowDown from '../Icons/arrowDown';
import IconBalance from '../Icons/balance';
import InputLimitDecimals from '../Input/InputLimitDecimals';
import Loader from '../Loader';
import { useBridgeUsdcData } from './dataProvider';

export default function FromToken() {
  const intl = useIntl();
  const {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    amount,
    setAmount,
    overBalance,
    maxAmount,
    tryResp,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  } = useBridgeUsdcData();
  const [isFocus, setIsFocus] = useState(false);
  const chainInfo = useChainInfo(fromToken?.chain as Type_DAChains);

  const usdcBalance = useUsdcBalance({ token: fromToken });
  const showModal = useShowModal();
  const selectToken = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      showModal({
        modal: ModalKeys.bridgeUsdcChooseToken,
        token: fromToken,
        onSelectToken: (token: Token) => {
          setIsMaxModel(0);
          setFromToken(token);
          if (token.id === toToken?.id) {
            setToToken(undefined);
          }
        },
      });
    },
    [showModal, fromToken, setFromToken, toToken, setToToken, setIsMaxModel]
  );

  const focus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const blur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      const _value = e.target.value;
      if (!isNumber(_value)) {
        e.target.value = '';
        setAmount('');
      }
      const formatValue = digit.formatWithDecimals(
        _value,
        fromToken?.decimals ?? 6,
        {
          floor: true,
        }
      );
      e.target.value = formatValue;
      setAmount(formatValue);
    },
    [fromToken?.decimals, setAmount]
  );

  const doMax = useCallback(
    (e: any) => {
      e?.stopPropagation?.();
      e?.preventDefault?.();
      if (!fromToken) return;
      setIsMaxModel(Date.now());
      setIsTryingMax(true);
    },
    [fromToken, setIsMaxModel, setIsTryingMax]
  );

  const showError = maxAmount || overBalance;

  return (
    <StyledChooseToken className="token">
      <div
        className={`token-inner ${isFocus ? 'focus' : ''} ${
          showError || !!tryResp?.showTryAmountError ? 'err-border' : ''
        }`}
      >
        <div className="pay-title">
          {intl.From}
          {fromToken && (
            <div
              className="balance"
              onClick={(e) => {
                if (!toToken) {
                  return;
                }
                doMax(e);
              }}
            >
              {!!toToken && (
                <>
                  {isTryingMax ? (
                    <Loader />
                  ) : (
                    <div className="max-btn" onClick={doMax}>
                      {intl.btn_max}
                    </div>
                  )}
                </>
              )}
              <IconBalance />
              <div className="balance-num">{usdcBalance?.available || '0'}</div>
              <div className="balance-symbol">{fromToken?.symbol}</div>
            </div>
          )}
        </div>
        <div className="pay-content">
          <div className="pay-vol">
            <InputLimitDecimals
              decimals={fromToken?.decimals ?? 6}
              className="amount-input"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0"
              leftSection={
                <StyledToken onClick={selectToken}>
                  {!fromToken ? (
                    <div className="select-token-label">
                      {intl.Select_Token} <IconArrowDown />
                    </div>
                  ) : (
                    <>
                      <TokenIcon token={fromToken} size={28} />
                      <div className="token-symbol">
                        <div className="token-symbol-text">
                          {fromToken?.symbol ?? ''} <IconArrowDown />
                        </div>
                        <div className="token-chain">{chainInfo?.name}</div>
                      </div>
                    </>
                  )}
                </StyledToken>
              }
              value={amount}
              onChange={(e) => {
                setIsMaxModel(0);
                setAmount(e.target.value);
              }}
              onFocus={focus}
              onBlur={blur}
              inputMode="decimal"
            />
          </div>
        </div>
      </div>
    </StyledChooseToken>
  );
}

export const StyledChooseToken = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  .token-inner {
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    min-height: 100px;
    padding: 8px 0 2px;
    &:hover {
      border-color: ${(props) => props.theme.inputHoverBorder};
    }
    &.focus {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputFocusBorder};
    }
    &.err-border {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
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
      cursor: pointer;
      gap: 5px;
    }
  }
  .pay-content {
    display: flex;
    align-items: center;
    line-height: 24px;
    height: 40px;
    padding: 0 12px 0 7px;
    .pay-vol {
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      width: 100%;
      .mantine-Input-input {
        height: 40px;
        padding: 0;
        border: none;
        text-align: right;
        font-size: 22px;
        background: transparent;
      }
      .mantine-Input-section {
        margin: 0;
        width: auto;
      }
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
