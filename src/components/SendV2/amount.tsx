import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useSwapBalance } from 'src/state/swap/balances/hooks';
import { useTokensWithTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { formatTokenSymbol, formatUsd } from 'src/utils/format';
import { multiply } from 'src/utils/numberUtils';
import { tokenIsBtc } from 'src/utils/token';

import EstNetworkFee from '../EstNetworkFee';
import MaxAvaiableTip from '../EstNetworkFee/maxAvaiableTip';
import Loader from '../Loader';
import SendV2Btn from './btn';
import NumberKeyboard from './numberKeyboard';
import { useSendMaxAmount, useSendV2Data } from './sendDataProvider';

export default function SendV2Amount() {
  const {
    amount,
    setAmount,
    token,
    tryResp,
    doTry,
    paramsValid,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  } = useSendV2Data();
  const { tokenTips, overMax } = paramsValid;
  const tokenBalance = useSwapBalance({ token });
  const intl = useIntl();
  const [tokenInfo] = useTokensWithTokenInfo({ tokens: [token] });
  const fontSize = useMemo(() => {
    const len = (amount || '0').length;
    if (len > 18) return '20px';
    if (len > 12) return '28px';
    return '36px';
  }, [amount]);

  const value = tokenInfo?.price
    ? multiply(tokenInfo.price, amount, { toNumber: true })
    : '';

  const isBtc = tokenIsBtc(token);
  const maxAmount = useSendMaxAmount({ token });

  const doMax = useCallback(
    (e: any) => {
      if (isBtc) {
        setAmount(maxAmount);
        return;
      }
      e?.stopPropagation?.();
      e?.preventDefault?.();
      setIsMaxModel(Date.now());
      setIsTryingMax(true);
    },
    [setIsMaxModel, setIsTryingMax, isBtc, setAmount, maxAmount]
  );

  return (
    <StyledSendV2Amount>
      <div className={`amount ${amount ? '' : 'empty'}`} style={{ fontSize }}>
        {amount || '0'}
        <div className="cursor" />
      </div>
      <div className="token_value">
        {isNumber(value) ? formatUsd(value) : ''}
      </div>
      {!tokenTips && (
        <MaxAvaiableTip
          tryResp={tryResp}
          onHandleMax={(num) => setAmount(num)}
        />
      )}
      {overMax && !tokenTips && (
        <div className="error_tips">{intl.insufficient_balance}</div>
      )}
      {tokenTips && <div className="error_tips">{tokenTips}</div>}
      <div className="info-item" style={{ marginTop: 30, marginBottom: '5px' }}>
        <div className="info-item-label">{intl.available}</div>
        <div
          className="info-item-value"
          onClick={(e) => {
            if (Number(tokenBalance?.available) > 0) {
              doMax(e);
            }
          }}
        >
          {Number(tokenBalance?.available) > 0 && (
            <div className="max-wrapper">
              {isTryingMax ? (
                <Loader />
              ) : (
                <div className="max-btn">{intl.btn_max}</div>
              )}
            </div>
          )}
          {tokenBalance?.availableDisplay} {formatTokenSymbol(token?.symbol)}
        </div>
      </div>
      <div className="info-item" style={{ marginBottom: 'auto' }}>
        <div className="info-item-label">{intl.network_fee}</div>
        <div className="info-item-value">
          <EstNetworkFee tryResp={tryResp} onSelectPayGasToken={doTry} />
        </div>
      </div>

      <NumberKeyboard
        value={amount}
        onChange={(value) => {
          setAmount(value);
          setIsMaxModel(0);
        }}
      />

      <SendV2Btn />
    </StyledSendV2Amount>
  );
}

const StyledSendV2Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 20px;

  .max-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .max-available-tip {
    margin: 0;
  }

  .amount {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 36px;
    line-height: 50px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    &.empty {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    .cursor {
      animation: blink 2s infinite;
      width: 1.5px;
      height: 1em;
      background-color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    @keyframes blink {
      0% {
        opacity: 1;
      }
      25% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      75% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .token_value {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 16px;
    height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    text-align: center;
    margin-top: -10px;
  }
  .avaiable {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    text-align: center;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    width: 100%;
    line-height: 20px;
    .info-item-label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .info-item-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .error_tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    line-height: 18px;
    text-align: center;
    margin-top: 5px;
  }
`;
