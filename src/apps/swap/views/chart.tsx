import React, { useState } from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import ChartUnavailable from 'src/components/chartUnavaliable';
import { useIntl } from 'src/locals';
import { useCoinGeckoUrl } from 'src/state/swap/pair/hooks';

export default function Chart() {
  const { coinGeckoUrl, iframeError, disableKline } = useCoinGeckoUrl();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const intl = useIntl();
  return (
    <StyledChart>
      {iframeError && (
        <>
          {disableKline ? (
            <ChartUnavailable />
          ) : (
            <div className="iframe-error-message">
              {intl.iframe_network_error_message}
            </div>
          )}
        </>
      )}
      {!iframeError && (
        <iframe
          src={`${coinGeckoUrl}`}
          key={coinGeckoUrl}
          title="coinGecko"
          style={{
            width: '100%',
            height: '100%',
            display: iframeLoaded ? 'block' : 'none',
          }}
          onLoad={() => {
            setIframeLoaded(true);
          }}
        />
      )}
      {!iframeLoaded && !disableKline && (
        <Skeleton height="100%" width="100%" />
      )}
    </StyledChart>
  );
}

const StyledChart = styled.div`
  width: 100%;
  height: 100%;
  .chart-spin .spin-inner {
    height: calc(100% - 40px);
  }
`;
