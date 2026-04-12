import React, { useMemo } from 'react';
import styled from 'styled-components';

import { BuyBtn, SellBtn } from 'src/UI';

import DeTooltip from 'src/components/DeTooltip';
import { OrderDirs } from 'src/constants/interface';
import { useToSwap } from 'src/hooks/navigate';
import { useIntl } from 'src/locals';
import { useChangeSwapOrderDir } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { formatPairInfo } from 'src/utils/swapNumberFormat';

import ChainCodes from './chainCodes';
import { useOndoDetail } from './dataProvider';

export default function Info() {
  const { tokenMeta, pair } = useOndoDetail();
  const intl = useIntl();

  const websites = [tokenMeta?.website];
  const legalURL =
    tokenMeta?.legal?.split('/').pop() || tokenMeta?.legal || '--';

  const primaryMarket = useMemo(
    () => tokenMeta?.primaryMarket || {},
    [tokenMeta]
  );

  const valuation = useMemo(() => {
    return tokenMeta?.underlyingMarket?.marketCap || primaryMarket?.marketCap;
  }, [primaryMarket, tokenMeta]);

  const toSwap = useToSwap();

  const changeSwapOrderDir = useChangeSwapOrderDir();

  return (
    <StyledInfo>
      <div className="infos">
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Issuer}</div>
          <div className="info-item-value">{tokenMeta?.issuer}</div>
        </div>
        <div className="info-item">
          <div className="info-item-title">
            <DeTooltip
              title={intl.stocks.AUM_desc}
              childrenTitle={intl.stocks.Onchain_AUM}
            />
          </div>
          <div className="info-item-value">
            ${formatPairInfo(primaryMarket?.marketCap) || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Valuation}</div>
          <div className="info-item-value">
            ${formatPairInfo(valuation) || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Dex_Trading_Vol}</div>
          <div className="info-item-value">
            ${formatPairInfo(primaryMarket.volume24h) || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Onchain_Supply}</div>
          <div className="info-item-value">
            {digit.format(primaryMarket.totalSupply, '0,0.##') || '--'}
          </div>
        </div>
        {/* <div className="info-item">
          <div className="info-item-title">{intl.stocks.Onchain_Holders}</div>
          <div className="info-item-value">
            {digit.format(primaryMarket.totalHolders, '0,0') || '--'}
          </div>
        </div> */}
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Legal_Info}</div>
          <div className="info-item-value">
            <a
              href={tokenMeta?.legal || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-underline-dotted"
            >
              {legalURL?.length > 10 ? `${legalURL.slice(0, 10)}...` : legalURL}
            </a>
          </div>
        </div>
      </div>
      <div className="btns">
        <BuyBtn
          eventName="xstocks_buy"
          onClick={() => {
            changeSwapOrderDir(OrderDirs.BUY);
            toSwap({ token: pair.baseToken });
          }}
        >
          {intl.BUY}
        </BuyBtn>
        <SellBtn
          eventName="xstocks_sell"
          onClick={() => {
            changeSwapOrderDir(OrderDirs.SELL);
            toSwap({ token: pair.baseToken });
          }}
        >
          {intl.SELL}
        </SellBtn>
      </div>
      <div className="info-title">Info</div>
      <ChainCodes />

      {websites && (
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Websites}</div>
          <div className="info-item-value websites">
            {websites.map((website: any) => (
              <div
                className="info-item-value-website text-underline-dotted"
                key={website}
              >
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={website}
                >
                  {website}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </StyledInfo>
  );
}

const StyledInfo = styled.div`
  .info-item {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .info-item-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 14px;
    line-height: 18px;
    white-space: nowrap;
  }
  .info-item-value {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: flex-end;
    word-break: break-all;
    text-align: right;

    a {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }

    &.bg {
      height: 24px;
    }
    &.websites {
      flex-direction: column;
      align-items: flex-end;
      gap: 5px;
    }
  }

  .info-title {
    margin: 10px 0;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
`;
