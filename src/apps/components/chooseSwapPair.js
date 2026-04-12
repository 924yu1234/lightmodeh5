import React, { useEffect, useMemo, useRef } from 'react';
import downIcon from 'imgs/arrow_down.svg';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import ChooseSwapPairPop from 'src/components/ChooseSwapPairPop';
import SwapPairFavorite from 'src/components/SwapPair/favorite';
import useWindowSize from 'src/hooks/useWindowSize';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { formatTokenSymbol } from 'src/utils/format';

import PairLogo from 'js/components/Pair/logo';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function ChooseSwapPair() {
  const pair = useCurrentSwapPair();
  const showModal = useShowModal();
  const { visible, hide } = useModals(ModalKeys.chooseSwapPair);

  const { baseToken } = pair;

  const { height } = useWindowSize();

  const ref = useRef();

  const popHeight = useMemo(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top;
      return height - elementTop - rect.height - 25;
    }
    return height - 113;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, height, visible]);

  useEffect(() => {
    const node = document.querySelector('#appContainer');
    if (node) {
      node.addEventListener('scroll', hide);
    }
    return () => {
      if (node) node.removeEventListener('scroll', hide);
    };
  }, [hide]);

  return (
    <StyledPair className="pair">
      <SwapPairFavorite
        pair={pair}
        size={18}
        outSize={26}
        position="bottom-start"
      />
      <Menu
        trigger="click"
        opened={visible}
        onOpen={() => {
          showModal({ modal: ModalKeys.chooseSwapPair });
        }}
        onClose={() => {
          hide(false);
        }}
        offset={1}
        trapFocus={false}
      >
        <Menu.Target>
          <div className="pair-tpl" ref={ref}>
            <PairLogo baseToken={baseToken} />
            <div className="symbols">
              <span className="pair">
                {formatTokenSymbol(baseToken?.symbol)}
              </span>
              <img
                src={downIcon}
                alt="downIcon"
                className={`down-icon ${visible ? 'open' : ''}`}
              />
            </div>
          </div>
        </Menu.Target>
        <Menu.Dropdown style={{ padding: '0', left: 0 }}>
          <ChooseSwapPairPop popupHeight={popHeight} />
        </Menu.Dropdown>
      </Menu>
    </StyledPair>
  );
}

export const StyledPair = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  .pair-favorite {
    margin-right: 10px;
  }
  .dg-icon-wrapper {
    margin-left: -4px;
  }

  .pair-tpl {
    display: flex;
    cursor: pointer;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    border-radius: 5px;
    &:hover {
      background: ${(props) => props.theme.menuHover};
    }
  }
  .pair-logo {
    margin-right: 8px;
  }
  .symbols {
    display: flex;
    align-items: center;
    user-select: none;
    .pair {
      color: ${(props) => props.theme.t_fff};
      ${(props) => props.theme.fontBold};
      font-size: 20px;
      line-height: 16px;
    }
    .down-icon {
      width: 10px;
      margin-left: 5px;
      &.open {
        transform: rotate(180deg);
      }
    }
  }
`;
