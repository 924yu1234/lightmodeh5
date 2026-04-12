import React, { useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { BuyBtn, SellBtn } from 'src/UI';

import DeTooltip from 'src/components/DeTooltip';
import IconCopy from 'src/components/Icons/copy';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { OrderDirs } from 'src/constants/interface';
import useChoosePair from 'src/hooks/choosePair';
import { useToSwap } from 'src/hooks/navigate';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';
import { useChangeSwapOrderDir } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';
import { formatAddress } from 'src/utils/format';
import message from 'src/utils/message';
import { formatPairInfo } from 'src/utils/swapNumberFormat';

import { useXStockDetail } from './dataProvider';

export default function Info() {
  const { code, tokenMeta, poolDailyData, pair } = useXStockDetail();
  const dexLiquidity = useMemo(() => {
    return poolDailyData[0]?.liquidity;
  }, [poolDailyData]);

  const isApp = useIsAppH5();
  const choosePair = useChoosePair();
  const toSwap = useToSwap();
  const changeDir = useChangeSwapOrderDir();
  const intl = useIntl();

  const websites = tokenMeta?.regulation?.website;
  const factsheetURL =
    tokenMeta?.regulation?.factsheetURL?.split('/').pop() ||
    tokenMeta?.regulation?.factsheetURL ||
    '--';

  const valuation = useMemo(() => {
    return (
      tokenMeta.underlying_stock?.market_cap ||
      tokenMeta?.underlying_etf?.net_assets
    );
  }, [tokenMeta]);

  return (
    <StyledInfo>
      <div className="infos">
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Issuer}</div>
          <div className="info-item-value">{tokenMeta?.regulation?.issuer}</div>
        </div>
        <div className="info-item">
          <div className="info-item-title">
            <DeTooltip
              title={intl.stocks.AUM_desc}
              childrenTitle={intl.stocks.Onchain_AUM}
            />
          </div>
          <div className="info-item-value">
            ${formatPairInfo(tokenMeta.market_cap) || '--'}
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
            ${formatPairInfo(tokenMeta.volume_24h) || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Onchain_Supply}</div>
          <div className="info-item-value">
            {digit.format(tokenMeta.supply, '0,0.##') || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Onchain_Holders}</div>
          <div className="info-item-value">
            {digit.format(tokenMeta.holder, '0,0') || '--'}
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Audit_URL}</div>
          <div className="info-item-value">
            <a
              href={tokenMeta?.regulation?.factsheetURL || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="text-underline-dotted"
            >
              {factsheetURL?.length > 10
                ? `${factsheetURL.slice(0, 10)}...`
                : factsheetURL}
            </a>
          </div>
        </div>
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Dex_Liquidity}</div>
          <div className="info-item-value">
            ${formatPairInfo(dexLiquidity) || '--'}
          </div>
        </div>
      </div>
      <div className="btns">
        <BuyBtn
          eventName="xstocks_buy"
          onClick={() => {
            changeDir(OrderDirs.BUY);
            if (isApp) {
              toSwap({ token: pair.baseToken });
            } else {
              choosePair(pair, 'swap');
            }
          }}
        >
          {intl.BUY}
        </BuyBtn>
        <SellBtn
          eventName="xstocks_sell"
          onClick={() => {
            changeDir(OrderDirs.SELL);
            if (isApp) {
              toSwap({ token: pair.baseToken });
            } else {
              choosePair(pair, 'swap');
            }
          }}
        >
          {intl.SELL}
        </SellBtn>
      </div>
      <div className="info-title">Info</div>
      <div className="info-item">
        <div className="info-item-title">{intl.Contract}</div>
        <div className="info-item-value bg">
          {formatAddress(code)}

          <CopyToClipboard
            text={code}
            onCopy={() => message.success(intl.copied)}
          >
            <IconWrapper
              title={intl.icon_copy}
              size={24}
              className="copy"
              hideHoverBg
            >
              <IconCopy size={20} />
            </IconWrapper>
          </CopyToClipboard>
        </div>
      </div>

      {websites && (
        <div className="info-item">
          <div className="info-item-title">{intl.stocks.Websites}</div>
          <div className="info-item-value websites">
            {websites.map((website: any) => (
              <div
                className="info-item-value-website text-underline-dotted"
                key={website.label}
              >
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={website.label}
                >
                  {website.label}
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
  }

  .info-title {
    margin: 10px 0;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
  }
`;
