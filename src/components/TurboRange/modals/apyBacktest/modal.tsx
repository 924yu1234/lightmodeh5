import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'ahooks';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import BottomModal from 'src/components/Modals/bottomModal';
import Spin from 'src/components/Spin';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { useCheckPriceRange } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';

import BacktestApy from './apy';
import ApyBacktestChart from './chart';
import { getTurboRangeApyBacktest } from './service';
import ApyBacktestSetPrice from './setPrice';

export default function ApyBacktestModal() {
  const intl = useIntl();
  const {
    visible,
    hide,
    poolAddress,
    minPrice: minPriceProps,
    maxPrice: maxPriceProps,
    onChange,
  } = useModals(ModalKeys.turboRangeApyBacktest);
  const [historyType, setHistoryType] = useState<'day' | 'week' | 'month'>(
    'week'
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [lastReadyKey, setLastReadyKey] = useState('');
  const [backtestDataMap, setBacktestDataMap] = useState<Record<string, any>>(
    {}
  );
  const product = useTurboRangeProduct(poolAddress);

  const showDecimals = product.showDecimals;
  useEffect(() => {
    if (visible) {
      setMinPrice(minPriceProps);
      setMaxPrice(maxPriceProps);
      setCurrentPrice(product?.currentPrice);
    } else {
      setBacktestDataMap({});
      setLastReadyKey('');
      setCurrentPrice('');
      setMinPrice('');
      setMaxPrice('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, minPriceProps, maxPriceProps]);

  const { priceRangeError } = useCheckPriceRange(
    minPrice,
    maxPrice,
    product?.poolAddress
  );

  const key = useMemo(() => {
    if (
      !poolAddress ||
      !currentPrice ||
      !minPrice ||
      !maxPrice ||
      priceRangeError
    )
      return '';
    return `${poolAddress}-${currentPrice}-${minPrice}-${maxPrice}`;
  }, [poolAddress, currentPrice, minPrice, maxPrice, priceRangeError]);

  const debouncedKey = useDebounce(key, { wait: 300 });

  useEffect(() => {
    if (!debouncedKey) return;
    getTurboRangeApyBacktest({
      poolAddress,
      currentPrice,
      minPrice,
      maxPrice,
    }).then((resp) => {
      setBacktestDataMap((prev) => ({
        ...prev,
        [key]: resp,
      }));
      if (key) {
        setLastReadyKey(key);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKey]);

  const hideModal = () => {
    hide();
    if (!priceRangeError && onChange) {
      onChange({ minPrice, maxPrice });
    }
  };

  const backtestData = backtestDataMap[key];
  const latestBacktestData = useMemo(() => {
    if (backtestData) return backtestData;
    if (lastReadyKey) return backtestDataMap[lastReadyKey];
    return undefined;
  }, [backtestData, backtestDataMap, lastReadyKey]);
  const chartData = useMemo(() => {
    if (!latestBacktestData) return [];
    if (historyType === 'day') {
      return latestBacktestData.price_chart_24h || [];
    }
    if (historyType === 'week') {
      return latestBacktestData.price_chart_7d || [];
    }
    if (historyType === 'month') {
      return latestBacktestData.price_chart_30d || [];
    }
    return [];
  }, [latestBacktestData, historyType]);

  const loading = !!key && !backtestDataMap[key];

  return (
    <BottomModal
      onClose={hideModal}
      className="full-modal"
      opened={visible}
      zIndex={201}
    >
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.turboRange.APY_Backtest}
          <Close onClick={hideModal} />
        </div>
        <Spin spinning={loading}>
          {currentPrice && (
            <div className="modal-content">
              <ApyBacktestSetPrice
                poolAddress={poolAddress}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
              />
              <div className="history-title">
                {intl.history}
                <div className="history-section-items">
                  <div
                    className={`history-section-item ${
                      historyType === 'day' ? 'active' : ''
                    }`}
                    onClick={() => setHistoryType('day')}
                  >
                    {intl.H1.replace('1', '24')}
                  </div>
                  <div
                    className={`history-section-item ${
                      historyType === 'week' ? 'active' : ''
                    }`}
                    onClick={() => setHistoryType('week')}
                  >
                    {intl.D1.replace('1', '7')}
                  </div>
                  <div
                    className={`history-section-item ${
                      historyType === 'month' ? 'active' : ''
                    }`}
                    onClick={() => setHistoryType('month')}
                  >
                    {intl.D1.replace('1', '30')}
                  </div>
                </div>
              </div>
              <ApyBacktestChart
                data={chartData}
                minPrice={minPrice}
                maxPrice={maxPrice}
                historyType={historyType}
                showDecimals={showDecimals}
              />
              <BacktestApy
                resp={latestBacktestData}
                historyType={historyType}
              />
              <PrimaryBtn
                eventName="apy_backtest_go_back"
                className="dg-primary"
                onClick={hideModal}
              >
                {intl.go_back}
              </PrimaryBtn>
            </div>
          )}
        </Spin>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;

  .history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-bottom: 15px;
    .history-section-items {
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 5px;
      .history-section-item {
        cursor: pointer;
        font-size: 14px;
        line-height: 20px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        min-width: 50px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
          background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
          border-radius: 10px;
          color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
      }
    }
  }
  .modal-content {
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: ${(props) => {
      return props.theme.windowHeight - props.theme.modalTop * 2 - 100;
    }}px;
    overflow: auto;
  }
  .dg-primary {
    margin-top: 20px;
    min-height: 46px;
    width: 100%;
  }
`;
