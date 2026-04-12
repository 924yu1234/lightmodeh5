import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FUNGIBLE_USDC_ID } from 'src/da';
import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

import Loader from 'js/components/Loader';
import ItemSymbol from 'js/components/Token/symbol';
import { useIsHideAssets } from 'js/state/user/hooks';

export default function Asset({
  token,
  hidden = false,
  floating = false,
  onLongPress,
}) {
  const isHide = useIsHideAssets();
  const showModal = useShowModal();
  const isFungibleUsdc = token.id === FUNGIBLE_USDC_ID;
  const pressTimerRef = useRef(null);
  const longPressTriggeredRef = useRef(false);
  const canLongPress =
    !floating && !isFungibleUsdc && typeof onLongPress === 'function';

  const clearPressTimer = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPressTimer();
    };
  }, [clearPressTimer]);

  const handleTouchStart = useCallback(
    (e) => {
      if (!canLongPress) return;
      const currentTarget = e.currentTarget;
      longPressTriggeredRef.current = false;
      clearPressTimer();
      pressTimerRef.current = setTimeout(() => {
        longPressTriggeredRef.current = true;
        onLongPress(token, currentTarget.getBoundingClientRect());
      }, 380);
    },
    [canLongPress, clearPressTimer, onLongPress, token]
  );

  const handleTouchEnd = useCallback(() => {
    clearPressTimer();
  }, [clearPressTimer]);

  const handleClick = useCallback(() => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }
    if (floating) return;

    if (isFungibleUsdc) {
      showModal({
        modal: ModalKeys.fungibleUsdcModal,
        token,
      });
      return;
    }

    showModal({
      modal: ModalKeys.assetModal,
      token,
    });
  }, [floating, isFungibleUsdc, showModal, token]);

  return (
    <StyledAsset
      className={`item ${isFungibleUsdc ? 'fungible-usdc' : ''} ${
        floating ? 'floating' : ''
      } ${hidden ? 'hidden' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchEnd}
      onContextMenu={(e) => {
        if (canLongPress) {
          e.preventDefault();
        }
      }}
    >
      <ItemSymbol
        token={token}
        disableLink
        showWrapTag
        showTokenTag
        hideCode
        iconSize={28}
        chainIconSize={14}
      />
      {token.loading ? (
        <Loader />
      ) : (
        <div className="item-num">
          <div className="token-total">
            {isHide ? '****' : token.totalDisplay}
          </div>
          <div className="token-val">
            {isHide ? '****' : `${token.totalValueDisplay}`}
          </div>
        </div>
      )}
    </StyledAsset>
  );
}

Asset.propTypes = {
  token: PropTypes.object,
  hidden: PropTypes.bool,
  floating: PropTypes.bool,
  onLongPress: PropTypes.func,
};

const StyledAsset = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  transition: opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;

  &.hidden {
    opacity: 0;
  }

  &.floating {
    background: #13132f;
    border: 1px solid rgba(183, 189, 198, 0.1);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  .token-symbol {
    margin-right: auto;
  }
  .item-num {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .token-total {
      ${(props) => props.theme.fontBold};
      font-size: 16px;
      color: ${(props) => props.theme.t_f4f};
      text-align: right;
      line-height: 18px;
    }
    .token-val {
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      color: ${(props) => props.theme.t_b7b_60};
      text-align: right;
      line-height: 18px;
    }
  }
`;
