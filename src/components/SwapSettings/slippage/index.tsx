import React, { useState } from 'react';
import styled from 'styled-components';

import IconAdvancedSetting from 'src/components/Icons/advancedSetting';
import IconDown from 'src/components/Icons/downIcon';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconInfo from 'src/components/Icons/info';
import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType, useThemeParams } from 'src/theme';
import digit from 'src/utils/digit';

import SlippageSettings from './settings';

export default function SwapSlippage({ inInfo }: { inInfo?: boolean }) {
  const intl = useIntl();
  const { maxSlippage } = useSwapTradeInfo();
  const { isMobile } = useThemeParams();
  const [showSettings, setShowSettings] = useState(isMobile && !inInfo);
  const showModal = useShowModal();

  return (
    <StyledMaxGasFeeSetting
      className={`slippage ${showSettings ? 'show' : ''}`}
    >
      <div className="settings-inner">
        <div className="settings-label">
          {intl.max_slippage}
          {inInfo && (
            <IconWrapper
              size={20}
              onClick={() => showModal({ modal: ModalKeys.tips_swap_slippage })}
            >
              <IconInfo className="slippage-info-icon" />
            </IconWrapper>
          )}
        </div>
        <div
          className="settings-wrapper"
          onClick={() => {
            if (!inInfo) {
              setShowSettings(!showSettings);
            } else {
              showModal({ modal: ModalKeys.swapSettings });
            }
          }}
        >
          <div className="settings-value">
            {digit.format(maxSlippage, '0.##%')}
          </div>
          {inInfo ? (
            <IconAdvancedSetting size={16} />
          ) : (
            <IconDown
              className={`slippage-down-icon ${showSettings ? 'show' : ''}`}
            />
          )}
        </div>
      </div>
      {showSettings && <SlippageSettings />}
    </StyledMaxGasFeeSetting>
  );
}

const StyledMaxGasFeeSetting = styled.div`
  .settings-inner {
    display: flex;
    align-items: center;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
    .settings-label {
      margin-right: auto;
      display: flex;
      align-items: center;
    }
    .settings-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .settings-value {
      display: flex;
      align-items: center;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .slippage-down-icon {
      transform: rotate(0deg);
      &.show {
        transform: rotate(180deg);
      }
    }
  }
`;
