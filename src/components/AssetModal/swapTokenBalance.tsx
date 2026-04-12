import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import IconOprReceive from 'src/components/Icons/oprReceive';
import IconOprSend from 'src/components/Icons/oprSend';
import IconOprSwap from 'src/components/Icons/oprSwap';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useChainInfo, useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import useBridgeUsdc from 'src/state/dexAccount/opr/useBridgeUsdc';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import useSend from 'src/state/dexAccount/opr/useSend';
import { searchSwapPairs } from 'src/state/swap/pairs/service';
import { useIsFungibleUsdc } from 'src/state/swap/tokens/hook';
import { useIsHideAssets } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import DividerLine from '../dividerLine';
import IconOprBridge from '../Icons/oprBridge';
import AssetAddress from './address';
import AvailableDetails from './availableDetails';

export default function SwapTokenBalance({
  token,
  contentHeight,
}: {
  token: any;
  contentHeight: number;
}) {
  const { hide } = useModals(ModalKeys.assetModal);

  const isHideValue = useIsHideAssets();
  const isFungibleUsdc = useIsFungibleUsdc({ token });

  const intl = useIntl();
  const [pair, setPair] = useState<any>(null);

  const receive = useReceive();
  const send = useSend();
  const bridgeUsdc = useBridgeUsdc();
  const navigate = useCustomNavigate();
  const chainInfo = useChainInfo(token.chain);

  const hasCopyTradeBalance = token.copyTradeAvailable > 0;

  useEffect(() => {
    searchSwapPairs({ text: token?.code, chain: '' })
      .then((resp) => {
        const curPair = (resp?.pairs || []).find(
          (d: any) => d.baseToken?.code === token?.code
        );
        setPair(curPair);
      })
      .catch(() => {
        setPair(null);
      });
  }, [token?.code, token?.id]);

  const addressHeight = useMemo(() => {
    if (hasCopyTradeBalance) {
      return contentHeight - 260 - 60;
    }
    return contentHeight - 260;
  }, [contentHeight, hasCopyTradeBalance]);

  return (
    <StyledSwapTokenBalance
      addressHeight={addressHeight}
      className="modal-content"
    >
      <div className="balance-top">
        <div className="amount">
          {isHideValue ? '****' : token.totalDisplay}
        </div>
        <div className="amountUSD">
          {isHideValue ? '****' : token.totalValueDisplay}
        </div>
        <AvailableDetails token={token} />
        <div className="top-btns">
          <div className="top-item">
            <IconOprReceive
              className="item-icon"
              onClick={() => {
                hide();
                receive({ token });
              }}
            />
            <div className="item-label">{intl.Receive}</div>
          </div>
          <div className="top-item">
            <IconOprSend
              className="item-icon"
              onClick={() => {
                hide();
                send({ token });
              }}
            />
            <div className="item-label">{intl.Send}</div>
          </div>

          {isFungibleUsdc && (
            <div className="top-item">
              <IconOprBridge
                className="item-icon"
                onClick={() => {
                  hide();
                  bridgeUsdc({ fromToken: token });
                }}
              />
              <div className="item-label">{intl.Bridge}</div>
            </div>
          )}

          {!isFungibleUsdc && (!chainInfo || chainInfo?.allowSwap) && (
            <div className="top-item">
              <IconOprSwap
                className="item-icon"
                onClick={() => {
                  hide();
                  navigate(
                    `/swap/USDC/${
                      token.code
                    }?chain=${token?.chain?.toLowerCase()}`
                  );
                }}
              />
              <div className="item-label">{intl.Swap}</div>
            </div>
          )}
        </div>
      </div>
      <DividerLine />
      <AssetAddress token={token} swapPair={pair} />
    </StyledSwapTokenBalance>
  );
}

const StyledSwapTokenBalance = styled.div<{ addressHeight: number }>`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .balance-top {
    padding: 0 20px;
  }

  .amount {
    text-align: left;
    font-size: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    line-height: 26px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-top: 20px;
  }
  .amountUSD {
    margin-top: 5px;
    font-size: 13px;
    line-height: 14px;
    text-align: left;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }

  .top-btns {
    display: flex;
    align-items: flex-start;
    width: 100%;
    justify-content: center;
    gap: 80px;
    margin-top: 25px;
    margin-bottom: 30px;
    .top-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      .item-label {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
        font-size: 14px;
        line-height: 18px;
        margin-top: 6px;
        max-width: 60px;
        white-space: nowrap;
      }
      .item-icon {
        height: 28px;
      }
    }
  }

  .usdc-bridge-tip {
    width: calc(100% - 20px);
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    line-height: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
    border-radius: 8px;
    padding: 10px 16px;
    min-height: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    b {
      text-decoration: dotted underline;
      text-underline-offset: 4px;
    }
  }

  .address {
    padding-top: 15px;
    max-height: ${({ addressHeight }: { addressHeight: number }) =>
      addressHeight}px;
    height: ${({ addressHeight }: { addressHeight: number }) =>
      addressHeight}px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
`;
