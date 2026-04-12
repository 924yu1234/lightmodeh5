import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledEmpty } from 'src/components/Empty';
import Spin from 'src/components/Spin';
import useSwapChartData from 'src/hooks/useSwapChartData';
import { useIntl } from 'src/locals';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';

import {
  getTradingViewSymbol,
  minutesToResolution,
  resolutionToPeriod,
  useAutoSaveStudyTemplate,
  useInitSettings,
} from 'js/components/tv/settings';
import {
  useCurrentSwapPriceScale,
  useShowSwapTradingView,
} from 'js/state/swap/pair/hooks';
import { isEqual } from 'js/utils/numberUtils';

import { widget as Widget } from '../../../tradingView/charting_library';

export default function TradeView({
  resolution,
  changePeriod,
  chartType,
  isFullScreen,
  tradingViewRef,
  setUndoRedoStatus,
}) {
  const intl = useIntl();
  const ref = useRef();
  const pricescale = useCurrentSwapPriceScale();
  const showTradingView = useShowSwapTradingView();
  const { pairId, baseTokenId, quoteTokenId, baseToken } = useCurrentSwapPair();
  const [chart, setChart] = useState(null);
  const autoSave = useAutoSaveStudyTemplate();
  const [loading, setLoading] = useState(true);
  const settings = useInitSettings({ storeKey: 'mini_chart', loadData: false });

  const symbol = getTradingViewSymbol({
    pairId,
    baseTokenId,
    quoteTokenId,
    baseToken,
  });

  const { datafeed } = useSwapChartData({ pricescale });

  const initChart = useCallback(
    (widget) => {
      try {
        if (ref.current) return;
        const _chart = widget.activeChart();
        ref.current = _chart;
        setChart(_chart);
        _chart?.setChartType(chartType);
        tradingViewRef.current = _chart;
        autoSave(widget);
        // window.chart.createStudy('pc', true, true, [21, 0]);
        _chart.onIntervalChanged().subscribe(null, (interval) => {
          changePeriod(interval);
        });
        setLoading(false);
      } catch (error) {
        setTimeout(() => {
          initChart(widget);
        }, 300);
      }
    },
    [changePeriod, chartType, autoSave, tradingViewRef]
  );

  useEffect(() => {
    if (!resolution || !document.getElementById('mini_swap_tradeview'))
      return () => {};
    setLoading(true);
    ref.current = null;

    const widgetOptions = {
      symbol,
      interval: minutesToResolution(resolution),
      container: 'mini_swap_tradeview',
      datafeed,
      ...settings,
      disabled_features: [
        ...settings.disabled_features,
        'timeframes_toolbar',
        'left_toolbar',
        'create_volume_indicator_by_default',
      ],
      overrides: {
        ...settings.overrides,
      },
      client_id: Date.now(),
      user_id: Date.now(),
    };

    const widget = new Widget(widgetOptions);
    initChart(widget);
    widget.onChartReady(() => {
      initChart(widget);
    });
    widget.subscribe('undo_redo_state_changed', (e) => {
      if (setUndoRedoStatus)
        setUndoRedoStatus({
          enableRedo: e.enableRedo,
          enableUndo: e.enableUndo,
        });
    });
    return () => {
      setChart(undefined);
      widget.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useEffect(() => {
    if (!chart || !symbol) {
      return;
    }
    chart.setSymbol(symbol);
  }, [symbol, chart]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    const _resolution = chart.resolution();
    if (
      isEqual(resolutionToPeriod(_resolution), resolutionToPeriod(resolution))
    ) {
      return;
    }
    chart.setResolution(minutesToResolution(resolution));
  }, [resolution, chart]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    chart.setChartType(chartType);
  }, [chart, chartType]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    const check = chart.getCheckableActionState('drawingToolbarAction');
    if (isFullScreen && !check) {
      chart.executeActionById('drawingToolbarAction');
    }
    if (!isFullScreen && check) {
      chart.executeActionById('drawingToolbarAction');
    }
  }, [isFullScreen, chart]);

  return (
    <StyledTradingView>
      <Spin spinning={loading}>
        <div id="mini_swap_tradeview" />
      </Spin>
      {!showTradingView && (
        <StyledEmpty className="dg-empty">{intl.no_data}</StyledEmpty>
      )}
    </StyledTradingView>
  );
}

TradeView.propTypes = {
  resolution: PropTypes.any,
  changePeriod: PropTypes.func,
  chartType: PropTypes.number,
  tradingViewRef: PropTypes.any,
  isFullScreen: PropTypes.bool,
  setUndoRedoStatus: PropTypes.func,
};

const StyledTradingView = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  .spin-root {
    height: 100%;
    width: 100%;
    .spin-container {
      height: 100%;
      width: 100%;
    }
    .spin-inner {
      background: ${({ theme }) => theme.bg};
    }
  }

  .dg-empty {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.bg};
    z-index: 5;
  }

  #orderBook_grid_info_tradeview {
    height: 100%;
    width: 100%;
  }
`;
