import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PrimaryBtn, Skeleton } from 'src/UI';

import IconWrapper2 from 'src/components/Icons/IconWrapper2';
import IconRefresh from 'src/components/Icons/refresh';
import Spin from 'src/components/Spin';
import TokenIcon from 'src/components/Token/icon';
import { useShowH5Header } from 'src/h5/utils';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useSetTitle } from 'src/providers/useWallet';
import { useInfo } from 'src/state/application/hooks';
import { useGetCoinGeckoUrl } from 'src/state/swap/pair/hooks';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';

import Header from '../components/header';
import { StyledChart } from './style';

export default function TurboRangeInfo() {
  const setDocumentTitle = useSetTitle();

  useEffect(() => {
    setDocumentTitle('');
  }, [setDocumentTitle]);

  const showH5Header = useShowH5Header();
  const navigate = useCustomNavigate();
  const { poolAddress } = useParams();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const intl = useIntl();
  const { baseToken } = useTurboRangeProduct(poolAddress);

  const { turboRangeDisabledKlines, turboRangeKlinesMap } = useInfo();
  const isTurboRangeDisabledKline = useMemo(() => {
    return (turboRangeDisabledKlines || []).includes(poolAddress || '');
  }, [turboRangeDisabledKlines, poolAddress]);

  const klineUrl = useMemo(() => {
    return (turboRangeKlinesMap || {})[poolAddress || ''];
  }, [turboRangeKlinesMap, poolAddress]);

  const { coinGeckoUrl: _coinGeckoUrl, iframeError: _iframeError } =
    useGetCoinGeckoUrl({
      chain: baseToken?.chain || '',
      pairAddress: poolAddress || '',
      disableKline: isTurboRangeDisabledKline,
    });

  let iframeError = _iframeError;
  let coinGeckoUrl = _coinGeckoUrl;
  if (klineUrl) {
    iframeError = false;
    coinGeckoUrl = `${klineUrl}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`;
  }

  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const refreshTimerRef = useRef(null);

  const triggerRefreshAnimation = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    setRefreshing(false);
    requestAnimationFrame(() => {
      setRefreshing(true);
      refreshTimerRef.current = setTimeout(() => {
        setRefreshing(false);
      }, 600);
    });
  };

  const handleRefresh = () => {
    triggerRefreshAnimation();
    setIndex((value) => value + 1);
  };

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  if (!baseToken) {
    return <Spin spinning style={{ margin: '20% 49%' }} />;
  }

  return (
    <StyledChart>
      {showH5Header && <Header title="" historyBack />}
      <div className="page-inner">
        <div className="chart-top">
          <TokenIcon token={baseToken} size={32} hideChainIcon />
          <div className="token-title">{baseToken?.symbol}</div>
          {/* <div className="token-price">${currentPrice}</div>
          <div
            className={`token-price-change ${
              Number(changes24h) > 0 ? 'color-green' : ''
            } ${Number(changes24h) < 0 ? 'color-red' : ''}`}
          >
            {Number(changes24h) > 0 ? '+' : ''}
            {changes24h}%
          </div> */}
          <IconWrapper2
            size={32}
            onClick={handleRefresh}
            className={refreshing ? 'refresh-rotating' : ''}
          >
            <IconRefresh />
          </IconWrapper2>
        </div>
        <div className="iframe-container">
          {iframeError && (
            <div className="iframe-error-message">
              {isTurboRangeDisabledKline
                ? intl.chart_is_currently_unavailable
                : intl.iframe_network_error_message}
            </div>
          )}
          {!iframeError && (
            <iframe
              key={index}
              src={coinGeckoUrl}
              title="coinGecko"
              style={{
                width: '100%',
                display: iframeLoaded ? 'block' : 'none',
              }}
              onLoad={() => {
                setIframeLoaded(true);
              }}
            />
          )}
          {!iframeLoaded && <Skeleton height="100%" width="100%" />}
        </div>
      </div>
      <div className="btns">
        <PrimaryBtn
          eventName="btn_turbo_range_info_back"
          onClick={() => {
            navigate(-1);
          }}
        >
          {intl.go_back}
        </PrimaryBtn>
      </div>
    </StyledChart>
  );
}
