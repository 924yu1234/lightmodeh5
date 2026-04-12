import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useFungibleUsdc } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import MaxAvaiableTip from '../EstNetworkFee/maxAvaiableTip';
import IconExchange from '../Icons/exchange';
import Spin from '../Spin';
import Btn from './btn';
import { useBridgeUsdcData } from './dataProvider';
import FromToken from './fromToken';
import Info from './info';
import ToToken from './toToken';

export default function BridgeUsdcInner() {
  const {
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    overBalance,
    tryResp,
    setAmount,
  } = useBridgeUsdcData();
  const intl = useIntl();
  const fungibleUsdc = useFungibleUsdc();

  const showLoading = useMemo(() => {
    return fungibleUsdc?.balances?.length === 0;
  }, [fungibleUsdc]);

  return (
    <StyledInner>
      <Spin spinning={showLoading}>
        <div className="modal-content">
          <div className="tips">{intl.move_usdc_across_chains}</div>
          <FromToken />
          <div className="exchange-icon">
            <IconExchange
              onClick={() => {
                const _fromToken = fromToken;
                const _toToken = toToken;
                setFromToken(_toToken as Token);
                setToToken(_fromToken as Token);
              }}
            />
          </div>
          <ToToken />
          {!overBalance && (
            <MaxAvaiableTip
              tryResp={tryResp}
              onHandleMax={(num) => setAmount(num)}
            />
          )}
          <div className="error-tips-container">
            {overBalance && (
              <div className="error_tips">{intl.insufficient_balance}</div>
            )}
          </div>
          <Info />
          <Btn />
        </div>
      </Spin>
    </StyledInner>
  );
}

const StyledInner = styled.div`
  .tips {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .error-tips-container {
    margin-bottom: 30px;
    min-height: 20px;
  }
  .error_tips {
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    line-height: 18px;
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-top: 5px;
  }
  .exchange-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.bg};
    border: 1px solid ${({ theme }) => theme.border_b7b_30};
    height: 40px;
    width: 40px;
    border-radius: 20px;
    margin: -10px auto;
    position: relative;
    top: -15px;
    z-index: 1;
    cursor: pointer;
  }
`;
