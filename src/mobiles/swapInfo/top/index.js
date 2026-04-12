import React from 'react';
import styled from 'styled-components';

import SwapPairFavorite from 'src/components/SwapPair/favorite';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import SwapPairInfo from 'src/mobiles/components/SwapPairInfo';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';

import IconMobileBack from 'js/components/Icons/mobileBack';
import PairLogo from 'js/components/Pair/logo';
import ChooseSwapPair from 'js/mobiles/components/chooseSwapPair';

export default function Top() {
  const navigate = useCustomNavigate();

  const pair = useCurrentSwapPair();
  const { baseToken } = pair;

  return (
    <StyledTop className="s-top">
      <IconMobileBack
        onClick={() => {
          navigate('/swap');
        }}
      />
      <div className="center">
        <ChooseSwapPair>
          <PairLogo baseToken={baseToken} />
          <div className="market">{baseToken?.symbol}</div>
        </ChooseSwapPair>
      </div>
      <SwapPairInfo pair={pair} outSize={40} />
      <SwapPairFavorite
        pair={pair}
        size={18}
        outSize={40}
        showTooltip={false}
      />
    </StyledTop>
  );
}

const StyledTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 27px;
  padding: 12px 90px 12px 50px;
  position: absolute;
  z-index: 1;
  background: ${(props) => props.theme.bg};
  top: 0;
  left: 0;
  height: 52px;
  width: 100%;
  .icon-m-back {
    position: absolute;
    left: 15px;
  }
  .center {
    display: flex;
    align-items: center;
    .pair-logo {
      margin: 0 10px;
    }
    .market {
      ${(props) => props.theme.fontBold};
      font-size: 20px;
      color: ${(props) => props.theme.t_f4f};
      line-height: 20px;
    }
  }
  .icon-info-wrapper {
    position: absolute;
    right: 45px;
  }
  .pair-favorite {
    position: absolute;
    right: 5px;
  }
  .icon-candle {
    margin-left: 20px;
  }
`;
