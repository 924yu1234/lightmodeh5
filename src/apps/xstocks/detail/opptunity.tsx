/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import IconGuide2 from 'src/components/Icons/guide2';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import { useTurboRangeProducts } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';
import { formatPairInfo } from 'src/utils/swapNumberFormat';
import WindowOpen from 'src/utils/windowOpen';

import calcAPR, { formatAPR } from '../utils/apyCalculatorV2';
import { useXStockDetail } from './dataProvider';
import { generateAddLiquidityLink } from './utils';

export default function Opptunity() {
  const { poolDailyData, pair } = useXStockDetail();
  const { products } = useTurboRangeProducts({ search: '' });
  const cur = products.find((p) => p.baseToken?.code === pair.baseToken?.code);
  const [aprResult, setAprResult] = useState<any>(undefined);
  const dexLiquidity = useMemo(() => {
    return poolDailyData[0]?.liquidity;
  }, [poolDailyData]);
  const gaEvent = useGaEvent();
  const navigate = useCustomNavigate();
  const currentPrice = pair.price;
  const rangePercentage = 0.1;
  const intl = useIntl();

  const poolId = pair.pool_address;

  useEffect(() => {
    setAprResult(undefined);
    const fetchApy = async () => {
      calcAPR({
        poolId,
        minPrice: currentPrice * (1 - rangePercentage),
        maxPrice: currentPrice * (1 + rangePercentage),
        aprType: 'day',
        currentPrice,
      } as any)
        .then((apy) => {
          if (apy.error) {
            setAprResult(undefined);
            return;
          }
          setAprResult(apy);
        })
        .catch(() => {
          setAprResult(undefined);
        });
    };

    if (poolId) fetchApy();
  }, [poolId]);

  const apr = useMemo(() => {
    if (cur) {
      return aprResult?.totalNetAPR;
    }
    return aprResult?.totalGrossAPR;
  }, [aprResult]);

  if (aprResult === undefined) {
    return null;
  }

  return (
    <StyledOpptunity className="opptunity-container">
      <div className="opptunity-title">{intl.stocks.Onchain_Opportunity}</div>
      <div className="opptunity-item">
        <div className="item-top">
          <TokenIcon token={pair?.baseToken} hideChainIcon size={24} />
          <TokenIcon
            token={pair?.quoteToken}
            hideChainIcon
            className="quote-token-icon"
            size={24}
          />
          <div className="symbol-wrapper">
            <div className="symbol">{pair?.baseToken?.symbol}</div>/
            <div className="symbol">{pair?.quoteToken?.symbol}</div>
          </div>
          <div className="item-info">
            <div className="item-info-title">{intl.stocks['24h APY']}</div>
            <div
              className={`item-info-value ${
                Number(apr) > 0 ? 'color-green' : ''
              } ${Number(apr) < 0 ? 'color-red' : ''}`}
            >
              {formatAPR(apr)}
            </div>
          </div>
        </div>
        <div className="item-bottom">
          <div className="item-info">
            <div className="item-info-title">{intl.liquidity}</div>
            <div className="item-info-value">
              ${formatPairInfo(dexLiquidity) || '--'}
            </div>
          </div>
          {cur ? (
            <div
              className="tutorial"
              onClick={() => {
                gaEvent?.('web_button_click', {
                  buttonName: 'xstocks_to_turbo_range_invest',
                });
                navigate(`/turbo-range/invest/${cur?.poolAddress}`);
              }}
            >
              {intl.turboRange.invert_USDC}
            </div>
          ) : (
            <div
              className="tutorial"
              onClick={() => {
                const link = generateAddLiquidityLink(pair);
                gaEvent?.('web_button_click', {
                  buttonName: 'xstocks_tutorial',
                });
                WindowOpen(link);
              }}
            >
              <IconGuide2 /> {intl.Tutorial}
            </div>
          )}
        </div>
      </div>
    </StyledOpptunity>
  );
}

const StyledOpptunity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .opptunity-title {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    margin-bottom: 15px;
  }
  .opptunity-item {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
    border-radius: 8px;
    padding: 10px;
  }
  .item-top {
    display: flex;
    align-items: center;
    gap: 5px;
    .quote-token-icon {
      margin-left: -15px;
    }
    .symbol-wrapper {
      display: flex;
      align-items: center;
      gap: 0px;
      margin-right: auto;
      .symbol {
        font-size: 16px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      }
    }
  }
  .item-bottom {
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    .item-info-title {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
    }
    .item-info-value {
      font-size: 14px;
    }
  }
  .tutorial {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;
