import React, { useMemo } from 'react';
import styled from 'styled-components';

import IconCandle from 'src/components/Icons/candle';
import IconWrapper from 'src/components/Icons/IconWrapper';
import Share from 'src/components/share';
import { getUrlPath } from 'src/hooks/choosePair';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import SwapPairInfo from 'src/mobiles/components/SwapPairInfo';
import useWallet from 'src/providers/useWallet';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';

import ArrowDown from 'js/components/Icons/arrowDown';
import PairLogo from 'js/components/Pair/logo';
import ChooseSwapPair from 'js/mobiles/components/chooseSwapPair';

export default function Top() {
  const pair = useCurrentSwapPair();
  const { baseToken, quoteToken } = pair;
  const { renderSwapBtn } = useWallet();
  const navigate = useCustomNavigate();

  const goToChart = () => {
    if (renderSwapBtn) renderSwapBtn({ width: 0 });
    navigate(getUrlPath({ baseToken, quoteToken, page: 'swap/info' }));
  };

  const shareUrl = useMemo(() => {
    const path = getUrlPath({ ...pair, page: 'swap' });
    return path;
  }, [pair]);

  return (
    <StyledTop className="top">
      <ChooseSwapPair hideArrow>
        <PairLogo baseToken={baseToken} />
        <div className="pair-info-inner">
          <div className="market">
            {baseToken?.symbol}
            <ArrowDown />
          </div>
        </div>
      </ChooseSwapPair>
      <SwapPairInfo pair={pair} outSize={40} />
      <IconWrapper
        className="icon-candle-wrapper"
        size={40}
        onClick={goToChart}
      >
        <IconCandle />
      </IconWrapper>
      <Share url={shareUrl} outSize={40} />
    </StyledTop>
  );
}

const StyledTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 27px;
  .pair-info-inner {
    display: flex;
    flex-direction: column;
  }
  .pair-logo {
    margin: 0 10px 0 0;
  }
  .market {
    ${(props) => props.theme.fontBold};
    font-size: 16px;
    color: ${(props) => props.theme.t_f4f};
    max-width: ${(props) => props.theme.viewWidth - 210}px;
    line-height: 20px;
    display: flex;
    align-items: center;
    .icon-arrows {
      margin-left: 5px;
    }
  }
  .pair-price-change {
    ${(props) => props.theme.fontMedium};
    font-size: 12px;
    margin-left: 10px;
  }
  .share-icon {
    position: absolute;
    right: 5px;
  }
  .icon-candle-wrapper {
    position: absolute;
    right: 45px;
  }
  .icon-info-wrapper {
    position: absolute;
    right: 85px;
  }
`;
