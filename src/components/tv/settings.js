import { useCallback, useEffect, useMemo, useState } from 'react';
import { isMobile as rddIsMobile } from 'react-device-detect';

import { logger } from 'src/utils/logger';

import { useIntl, useSetLocale } from 'js/locals';
import { useThemeParams } from 'js/theme';
import { getTimeZoneStr } from 'js/utils/getTimeZone';

export const useInitSettings = ({ storeKey, loadData = true }) => {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { locale } = useSetLocale();
  const timezone = getTimeZoneStr();
  const themeParams = useThemeParams();

  return useMemo(() => {
    let tradingViewLocale = locale?.split('-')?.[0];
    if (locale === 'zh-TW') {
      tradingViewLocale = 'zh_TW';
    }
    const upColor = themeParams.buy2;
    const mainColor = '#13132F';
    const downColor = themeParams.sell;

    const mobileDisableFeatures =
      isMobile || rddIsMobile ? ['control_bar'] : [];
    const all = localStorage.getItem(SaveAllKey);
    let template = {};
    if (all) {
      template = JSON.parse(all);
      try {
        if (template.version !== '27.003') {
          template.charts[0].chartProperties.paneProperties.legendProperties.showLegend = false;
        }
        template.charts[0].chartProperties.paneProperties.legendProperties.showVolume = true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
      }
    }
    return {
      mainColor,
      upColor,
      downColor,
      theme: 'Dark',
      library_path: `${window._config.PUBLIC_URL}/tradingView/charting_library/`,
      fullscreen: false,
      autosize: true,
      debug: false,
      locale: tradingViewLocale,
      timezone,
      custom_css_url: `${window._config.PUBLIC_URL}/tradingView/style.css`,
      saved_data: all && loadData ? template : undefined,
      disabled_features: mobileDisableFeatures.concat([
        'header_widget',
        'border_around_the_chart',
        'drawing_templates',
        'header_symbol_search',
        'symbol_search_hot_key',
        'symbol_info',
        'object_tree_legend_mode',
        'edit_buttons_in_legend',
        'display_market_status',
        'hide_main_series_symbol_from_indicator_legend',
        'popup_hints',
        'use_localstorage_for_settings',
      ]),
      enabled_features: [
        'seconds_resolution',
        'hide_resolution_in_legend',
        'hide_unresolved_symbols_in_legend',
        'hide_main_series_symbol_from_indicator_legend',
        'hide_left_toolbar_by_default',
        'volume_force_overlay',
        'iframe_loading_compatibility_mode',
      ],
      toolbar_bg: mainColor,
      loading_screen: {
        backgroundColor: mainColor,
        foregroundColor: mainColor,
      },
      time_frames: [
        { text: '1D', resolution: '15', description: '', title: intl.D1 },
        { text: '5D', resolution: '15', description: '', title: intl.D5 },
        { text: '1M', resolution: '60', description: '', title: intl.M1 },
        { text: '3M', resolution: '60', description: '', title: intl.M3 },
        { text: '6M', resolution: '240', description: '', title: intl.M6 },
        { text: '11M', resolution: '1440', description: '', title: intl.YTD },
        { text: '1y', resolution: '1440', description: '', title: intl.Y1 },
        {
          text: '1000y',
          resolution: '1W',
          description: '',
          title: intl.all,
        },
      ],
      overrides: {
        editorFontsList: [
          'OpenSansRegularSemi',
          'PingFang SC',
          'Helvetica, Arial',
          'sans-serif',
        ],
        'paneProperties.background': mainColor,
        'paneProperties.backgroundType': 'solid',
        'paneProperties.legendProperties.showSeriesTitle': false,
        'paneProperties.legendProperties.showVolume': true,
        'paneProperties.legendProperties.showLegend': false,
        // 'paneProperties.legendProperties.showStudyValues': false,
        // 'paneProperties.legendProperties.showStudyTitles': false,
        // 'paneProperties.legendProperties.showStudyArguments': false,

        // 'mainSeriesProperties.priceLineColor': '#00A0FF',
        'mainSeriesProperties.candleStyle.upColor': upColor,
        'mainSeriesProperties.candleStyle.downColor': downColor,
        // 'mainSeriesProperties.candleStyle.borderColor': '#c503ea',
        'mainSeriesProperties.candleStyle.borderUpColor': upColor,
        'mainSeriesProperties.candleStyle.borderDownColor': downColor,
        'mainSeriesProperties.candleStyle.wickUpColor': upColor,
        'mainSeriesProperties.candleStyle.wickDownColor': downColor,

        'mainSeriesProperties.hollowCandleStyle.upColor': upColor,
        'mainSeriesProperties.hollowCandleStyle.downColor': downColor,

        'mainSeriesProperties.haStyle.upColor': upColor,
        'mainSeriesProperties.haStyle.downColor': downColor,

        'mainSeriesProperties.barStyle.upColor': upColor,
        'mainSeriesProperties.barStyle.downColor': downColor,
      },
      studies_overrides: {
        'volume.volume.color.0': 'rgba(222,77,119,.3)',
        'volume.volume.color.1': 'rgba(4,186,111,.3)',
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    intl,
    locale,
    timezone,
    storeKey,
    loadData,
    themeParams.buy2,
    themeParams.sell,
  ]);
};

export const supported_resolutions = [
  '1',
  '3',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  '360',
  '1440',
  '1W',
  '1M',
];

// 隐藏volume指标右侧数字
// 'create_volume_indicator_by_default',
// chart.removeEntity(chart.getAllStudies().find(d => d.name === 'Volume'))
// chart.createStudy("Volume", true, false, undefined, {showLabelsOnPriceScale:false});

export const data_resolutions = [
  '1',
  '3',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  '360',
  '1440',
  '10080',
  '44640',
];

export const getResolutionOptions = ({
  hides = ['1', '3', '5', '30', '120', '360', '44640'],
  autoHides = ['60', '10080'],
  intl,
  isSwap,
}) => {
  const hideItems = hides.concat(autoHides);
  const list = [
    { key: '1', label: intl['kline.time_1m'], hide: hideItems.includes('1') },
    { key: '3', label: intl['kline.time_3m'], hide: hideItems.includes('3') },
    { key: '5', label: intl['kline.time_5m'], hide: hideItems.includes('5') },
    {
      key: '15',
      label: intl['kline.time_15m'],
      hide: hideItems.includes('15'),
    },
    {
      key: '30',
      label: intl['kline.time_30m'],
      hide: hideItems.includes('30'),
    },
    {
      key: '60',
      hide: hideItems.includes('60'),
      label: intl['kline.time_1H'],
    },
    {
      key: '120',
      hide: hideItems.includes('120'),
      label: intl['kline.time_2H'],
    },
    {
      key: '240',
      label: intl['kline.time_4H'],
      hide: hideItems.includes('240'),
    },
    {
      key: '360',
      label: intl['kline.time_6H'],
      hide: hideItems.includes('360'),
    },
    {
      key: '1440',
      label: intl['kline.time_1D'],
      hide: hideItems.includes('1440'),
    },
    {
      key: '10080',
      minutesKey: '10080',
      hide: hideItems.includes('10080'),
      label: intl['kline.time_1W'],
    },
    {
      key: '44640', // 31D
      minutesKey: '44640',
      hide: hideItems.includes('44640'),
      label: intl['kline.time_1M'],
    },
  ];

  if (isSwap) {
    return [
      { key: '1S', label: intl['kline.time_1s'] },
      { key: '5S', label: '5s' },
      { key: '15S', label: '15s' },
      { key: '30S', label: '30s' },
    ].concat(list);
  }
  return list;
};

// to seconds
export const resolutionToPeriod = (resolution) => {
  if (resolution.includes('M')) {
    const months = parseInt(resolution, 10);
    return 31 * 86400 * months;
  }
  if (resolution.includes('W')) {
    const weeks = parseInt(resolution, 10);
    return 7 * 86400 * weeks;
  }
  if (resolution.includes('D')) {
    const days = parseInt(resolution, 10);
    return 86400 * days;
  }
  if (resolution.includes('S')) {
    return parseInt(resolution, 10);
  }
  return resolution * 60;
};

// period 分钟
export const minutesToResolution = (minutes) => {
  if (minutes.includes('S')) {
    return minutes;
  }
  if (minutes <= 1440) {
    return minutes;
  }
  if (minutes <= 1440) {
    return minutes;
  }
  if (minutes === '10080') {
    return '1W';
  }
  if (minutes === '44640') {
    return '1M';
  }
  return minutes;
};

export function getTradingViewSymbol({
  pairId,
  baseTokenId,
  quoteTokenId,
  baseToken,
}) {
  return `${pairId}:${baseTokenId}-${quoteTokenId}-${baseToken?.symbol}`;
}

export function parseTradingViewSymbol(symbol = '') {
  if (!symbol.includes(':') || !symbol.includes('-')) return {};
  const splits1 = symbol.split(':');
  const splits2 = splits1[1].split('-');
  return {
    pairId: Number(splits1[0]),
    baseTokenId: Number(splits2[0]),
    quoteTokenId: Number(splits2[1]),
    baseSymbol: splits2[2],
  };
}

const SaveAllKey = 'dg_tv_settings';
const SaveKey = 'dg_tv_studyTemplate';
export function useAutoSaveStudyTemplate() {
  const [widget, setWidget] = useState();

  // const setAuto = useCallback((chart) => {
  //   // 新版本 设置auto
  //   try {
  //     const PriceScaleApi = chart.getPanes()?.[0]?.getMainSourcePriceScale();
  //     PriceScaleApi?.setAutoScale(true);
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // }, []);

  const changeVolume = useCallback((chart) => {
    const volumeStudyId = chart
      .getAllStudies()
      .find((x) => x.name === 'Volume')?.id;
    if (volumeStudyId) {
      const volume = chart.getStudyById(volumeStudyId);
      volume.applyOverrides({
        showLabelsOnPriceScale: false,
      });
    }
  }, []);

  useEffect(() => {
    if (widget) {
      const save = () => {
        logger.log('onAutoSaveNeeded', new Date());
        try {
          widget.save((template) => {
            template.version = '27.003';
            localStorage.setItem(SaveAllKey, JSON.stringify(template));
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      };
      widget.subscribe('onAutoSaveNeeded', save);

      const chart = widget.activeChart();

      // chart.onSymbolChanged().subscribe(null, () => {
      //   setAuto(chart);
      // });
      const all = localStorage.getItem(SaveAllKey);
      // 新用户或者未在此次上线后存储过配置的用户删除volume的数字显示，默认不显示
      // 26.003版本新增功能，volume默认显示数字
      if (!all) {
        changeVolume(chart);
      } else {
        const val = JSON.parse(all);
        if (!val.version) {
          changeVolume(chart);
        }
      }
    }
    return () => {};
  }, [widget, changeVolume]);

  return useCallback((_widget) => {
    const template = localStorage.getItem(SaveKey);
    const all = localStorage.getItem(SaveAllKey);
    if (!all && template && _widget) {
      // 老用户
      localStorage.removeItem(SaveKey);
      _widget.activeChart().applyStudyTemplate(JSON.parse(template));
    }
    setWidget(_widget);
  }, []);
}
