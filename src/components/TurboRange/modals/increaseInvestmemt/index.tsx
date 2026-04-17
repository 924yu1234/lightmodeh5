import React, { useEffect } from 'react';
import styled from 'styled-components';

import { PillTabs, Tabs } from 'src/UI';

import CommonModal from 'src/components/Modals/commomModal';
import { useIntl } from 'src/locals';
import { useInvestMode, useSetInvestMode } from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import DualIncreaseInvestment from './dual';
import SingleIncreaseInvestment from './single';

const INVEST_MODE_KEY = 'turbo_range_invest_mode';

export default function IncreaseInvestmentModal() {
  const { visible, hide, position } = useModals(
    ModalKeys.turboRangeIncreaseInvestment
  );
  const intl = useIntl();
  const investMode = useInvestMode();
  const setInvestMode = useSetInvestMode();

  useEffect(() => {
    localStorage.setItem(INVEST_MODE_KEY, investMode);
  }, [investMode]);

  const hideModal = () => {
    hide();
  };

  return (
    <CommonModal onClose={hideModal} opened={visible}>
      <StyledModal className="modal-wrapper">
        <div className="modal-title text-left">
          {intl.turboRange.increase_investment}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content">
          <PillTabs
            fullWidth
            value={investMode}
            onChange={(v) => setInvestMode(v as 'single' | 'dual')}
          >
            <Tabs.List>
              <Tabs.Tab value="single">
                {intl.turboRange?.investModeSingle}
              </Tabs.Tab>
              <Tabs.Tab value="dual">
                {intl.turboRange?.investModeDual}
              </Tabs.Tab>
            </Tabs.List>
          </PillTabs>
          <div className="modal-content-inner">
            {investMode === 'single' ? (
              <SingleIncreaseInvestment position={position} />
            ) : (
              <DualIncreaseInvestment position={position} />
            )}
          </div>
        </div>
      </StyledModal>
    </CommonModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  color: white;
  border-radius: 12px;
  padding: 0 0 30px;

  .modal-content-inner {
    min-height: 425px;
  }

  .product {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
    .product-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 16px;
      line-height: 20px;
      margin-right: 5px;
    }
    .dg-icon-wrapper2 {
      margin-left: auto;
    }
  }

  .item-title {
    margin-bottom: 8px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 20px;
    font-size: 16px;
  }

  .mantine-SegmentedControl-root {
    margin-bottom: 20px;
  }

  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    .item-info-title {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .item-info-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .price-range {
    margin-bottom: 20px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop - 100;
    }}px;
    overflow: auto;
    padding: 10px 20px 10px;
  }

  .increase-btn {
    margin-top: 12px;
    min-height: 50px;
    width: 100%;
  }
`;
