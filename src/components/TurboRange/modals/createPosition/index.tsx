import React, { useEffect, useRef } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMobileBack from 'src/components/Icons/mobileBack';
import SelectUsdcModalWEB from 'src/components/SelectUsdc/modal_WEB';
import TokenIcon from 'src/components/Token/icon';
import Invest from 'src/components/TurboRange/invest';
import SetPriceRangeModalWEB, {
  SetPriceRangeModalWEBRef,
} from 'src/components/TurboRange/modals/setPriceRange/web';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { ThemeType, useThemeParams } from 'src/theme';

import ProductName from '../../productName';
import TurboRangeAsset from '../asset/modal';
import Kline from './kline';

export default function CreatePositionModal() {
  const intl = useIntl();
  const { visible, hide, poolAddress, minPrice, maxPrice } = useModals(
    ModalKeys.turboRangeCreatePosition
  ) as any;
  const { isMobile } = useThemeParams();
  const product = useTurboRangeProduct(poolAddress);
  const { baseToken } = product;

  const { visible: visibleUsdc, hide: hideUsdc } = useModals(
    ModalKeys.chooseUsdcWEB
  );
  const { visible: visibleSetPrice, hide: hideSetPrice } = useModals(
    ModalKeys.turboRangeSetPriceRangeWEB
  );
  const { visible: visibleApyBacktest } = useModals(
    ModalKeys.turboRangeApyBacktest
  );

  const setPriceRangeRef = useRef<SetPriceRangeModalWEBRef>(null);
  const clickOutsideRef = useClickOutside(() => {
    if (visibleApyBacktest) {
      return;
    }
    hideUsdc();
    if (visibleSetPrice) {
      setPriceRangeRef.current?.closeModal();
    } else {
      hideSetPrice();
    }
  });

  let activeModal: 'select' | 'setPrice' | null = null;
  if (visibleUsdc) {
    activeModal = 'select';
  } else if (visibleSetPrice) {
    activeModal = 'setPrice';
  }
  const slideIndex = activeModal ? 1 : 0;

  useEffect(() => {
    return () => {
      hideUsdc();
      hideSetPrice();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledModalWrapper
      opened={visible}
      onClose={hide}
      withCloseButton
      centered
      isMobile={isMobile}
      zIndex={200}
    >
      <div className="create-position-content">
        <div className="kline-panel">
          <div className="create-position-top">
            <TokenIcon token={baseToken} size={32} hideChainIcon />
            <div className="token-title">
              <ProductName poolAddress={poolAddress} />
            </div>
            <TurboRangeAsset product={product} />
          </div>
          <Kline poolAddress={poolAddress} />
        </div>
        <div className="invest-panel">
          <div
            className={`modal-title invest-title ${
              activeModal ? 'active-modal' : ''
            }`}
          >
            {!activeModal && <>{intl.turboRange.create_position}</>}
            {activeModal === 'select' && (
              <>
                <IconWrapper
                  size={30}
                  onClick={() => {
                    hideUsdc();
                  }}
                >
                  <IconMobileBack />
                </IconWrapper>
                {intl.Select_Token}
              </>
            )}
            {activeModal === 'setPrice' && (
              <>
                <IconWrapper
                  size={30}
                  onClick={() => setPriceRangeRef.current?.closeModal()}
                >
                  <IconMobileBack />
                </IconWrapper>
                {intl.turboRange.set_price_range}
              </>
            )}
            <Close onClick={hide} />
          </div>
          <div className="invest-wrapper" ref={clickOutsideRef}>
            <div
              className="invest-slider"
              style={{ transform: `translateX(-${slideIndex * 50}%)` }}
            >
              <div className="invest-panel-slide base">
                <Invest
                  poolAddress={poolAddress}
                  initialMinPrice={minPrice}
                  initialMaxPrice={maxPrice}
                />
              </div>
              <div className="invest-panel-slide modal">
                {activeModal === 'select' && <SelectUsdcModalWEB />}
                {activeModal === 'setPrice' && (
                  <SetPriceRangeModalWEB ref={setPriceRangeRef} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledModalWrapper>
  );
}

const StyledModalWrapper = styled(Modal)<{ isMobile: boolean }>`
  &.mantine-Modal-root {
    .mantine-Modal-overlay {
      background-color: ${({ theme }) => theme.bg_black_70};
    }
    .mantine-Modal-inner {
      padding: 40px 0;
      overflow: auto;
    }
    .mantine-Modal-content {
      display: flex;
      flex-direction: column;
      min-height: 0;
      max-width: ${({ theme }: { theme: ThemeType }) =>
        theme.viewWidth >= 1260 ? '1260px' : `${theme.viewWidth - 40}px`};
      min-width: ${({ theme }: { theme: ThemeType }) =>
        theme.viewWidth >= 1260 ? '1260px' : `${theme.viewWidth - 40}px`};
      background-color: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
      border-radius: 8px;
      box-shadow: ${({ theme }: { theme: ThemeType }) => theme.boxShadow};
      max-height: unset;
      overflow: unset;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    }
    .mantine-Modal-header {
      display: none;
    }
    .mantine-Modal-body {
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 0;
    }
  }

  .create-position-top {
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 0 0 30px;
    gap: 12px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    .about-turbo-range {
      margin-left: auto;
    }
  }

  .create-position-content {
    display: flex;
    align-items: stretch;
    min-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight >= 800 ? '730px' : '600px'};
    padding: 10px 0 20px 0;
    box-sizing: border-box;

    .kline-panel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .invest-panel {
      width: 415px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      min-height: 0;

      .invest-wrapper {
        flex: 1;
        min-height: 0;
        position: relative;
        overflow: hidden;
      }

      .invest-slider {
        display: flex;
        width: 200%;
        height: 100%;
        transition: transform 0.3s ease;
      }

      .invest-panel-slide {
        width: 50%;
        height: 100%;
        flex-shrink: 0;
      }

      .invest-panel-slide.modal {
        position: relative;
      }

      .invest-panel-slide.base .turbo-range-invest {
        padding: 0 30px;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
      }

      .invest-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 20px;
        line-height: 24px;
        display: flex;
        justify-content: flex-start;
        width: 100%;
        align-items: center;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        height: 52px;
        padding: 0 30px;
        &.active-modal {
          padding: 0 30px 0 23px;
        }
        .icon-close {
          top: 20px;
          right: 15px;
        }
      }
    }
  }
`;
