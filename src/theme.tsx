import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
export type ThemeType = ReturnType<typeof getTheme>;
export default function getTheme({
  height,
  width,
  isMobile,
  isAppH5,
  showH5Header,
}: {
  height: number;
  width: number;
  isMobile: boolean;
  isAppH5: boolean;
  showH5Header: boolean;
}) {
  const withAlpha = (hex: string, alphaHex: string) => `${hex}${alphaHex}`;
  const alphaMap = {
    '05': '0d',
    '06': '0f',
    '07': '12',
    '08': '14',
    '10': '1a',
    '15': '26',
    '20': '33',
    '25': '40',
    '30': '4d',
    '40': '66',
    '50': '80',
    '60': '99',
    '70': 'b3',
    '80': 'cc',
    '90': 'e6',
  } as const;
  type AlphaKey = keyof typeof alphaMap;
  const withAlphas = <P extends string>(
    hex: string,
    prefix: P,
    keys: readonly AlphaKey[] = Object.keys(alphaMap) as AlphaKey[]
  ) =>
    keys.reduce((acc, key) => {
      const token = `${prefix}_${key}` as `${P}_${AlphaKey}`;
      acc[token] = withAlpha(hex, alphaMap[key]);
      return acc;
    }, {} as Record<`${P}_${AlphaKey}`, string>);
  const darkMode = true;
  let modalTop = 150;

  const top = (height - 600) / 2;
  if (top > 150) {
    modalTop = 150;
  } else if (top < 50) {
    modalTop = 50;
  } else {
    modalTop = 100;
  }

  const viewWidth = isMobile ? width : Math.max(width, 1024);

  return {
    isMobile,
    isAppH5,
    showH5Header,
    darkMode,
    bodyBg: darkMode ? '#13132F' : '#F6FBFF',

    bg: darkMode ? '#13132F' : '#FBFDFF',
    bg_05: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    bg_07: darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.07)',
    bg_10: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    bg_15: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.15)',
    bgMenu: darkMode ? '#2C2C47' : '#fff',
    bgMenuHover: darkMode ? 'rgba(255, 255, 255, 0.1);' : '#F1F1F1',
    menuHover: darkMode ? 'rgba(255, 255, 255, 0.06);' : '#F1F1F1',
    boxShadow: darkMode
      ? '0 2px 4px 0 rgba(0, 0, 0, 0.30);'
      : 'rgba(5, 152, 255, 0.25)',

    modalBg: darkMode ? '#22223C' : '#22223C',
    modalInnerBg: darkMode
      ? 'rgba(255, 255, 255, 0.1);'
      : 'rgba(255, 255, 255, 0.1);',

    tradeBg: darkMode ? 'rgba(58, 66, 89, 0.7);' : 'rgba(58, 66, 89, 0.7);',
    placeOrderBg: darkMode
      ? 'rgba(58, 66, 89, 0.2);'
      : 'rgba(58, 66, 89, 0.2);',

    hover: darkMode ? 'rgba(255, 255, 255, 0.1);' : 'rgba(255, 255, 255, 0.1);',

    inputBg: darkMode
      ? 'rgba(255, 255, 255, 0.1);'
      : 'rgba(255, 255, 255, 0.1);',

    up: '#50E4A2',
    down: '#DE4D77',

    sell: '#DE4D77',
    buy: '#50E4A2',
    buy2: '#04ba6f',
    profit: '#50E4A2',

    blue: '#00A0FF',
    blue1: '#0f84ff',
    blue_7eb: '#7ebaff',
    green: '#50E4A2',
    green2: 'rgba(63,182,139,0.1)',
    switchTrackOn: '#30D158',
    switchTrackOff: 'rgba(183, 189, 198, 0.2)',
    red: '#DE4D77',
    red2: 'rgba(246,71,93,0.1)',
    error: '#DE4D77',
    yellow: '#FEBE2F',
    orange: '#FE932F',
    warning: '#FEBE2Fcc',

    // alpha helpers
    alpha_05: '0d',
    alpha_10: '1a',
    alpha_15: '26',
    alpha_20: '33',
    alpha_25: '40',
    alpha_30: '4d',
    alpha_40: '66',
    alpha_50: '80',
    alpha_60: '99',
    alpha_70: 'b3',
    alpha_80: 'cc',
    alpha_90: 'e6',

    tips: darkMode ? 'rgba(183, 189, 198, 0.6)' : 'rgba(183, 189, 198, 0.6)',

    t_d4d: darkMode ? '#d4dce8' : '#313336',
    t_a1a: darkMode ? '#a1a4b1' : '#a1a4b1',
    t_b7b: darkMode ? '#B7BDC6' : '#313336', // (rgba(183, 189, 198, 1))
    t_fff: darkMode ? '#ffffff' : '#ffffff',
    t_fff_aa: withAlpha('#ffffff', 'aa'),
    t_000: darkMode ? '#000000' : '#000000',
    t_000_25: withAlpha('#000000', '40'),
    t_000_aa: withAlpha('#000000', 'aa'),
    t_f4f: darkMode ? '#f4f4f4' : '#f4f4f4',
    t_666: '#666666',
    t_666_60: withAlpha('#666666', '99'),
    t_9aa3b2: '#9aa3b2',
    t_c4c4c4: '#c4c4c4',
    t_abaeba: '#abaeba',
    t_6d778a: '#6d778a',
    t_3b415b: '#3b415b',
    t_13122f: '#13122f',
    t_ff4d4f: '#ff4d4f',
    t_52c41a: '#52c41a',
    t_9ca3af: '#9ca3af',
    t_ffc331: '#ffc331',
    t_f77c80: '#f77c80',
    t_f2c94c: '#f2c94c',
    t_b8e369: '#b8e369',
    t_ff7c00: '#FF7C00',
    t_999: '#999999',
    t_55d29e: '#55d29e',
    t_42bd7f: '#42bd7f',
    t_333: '#333333',
    t_00aaff: '#00aaff',

    // text color aliases with alpha
    ...withAlphas('#ffffff', 't_fff', [
      '05',
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '80',
      '90',
    ]),
    ...withAlphas('#B7BDC6', 't_b7b', [
      '05',
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '80',
      '90',
    ]),
    ...withAlphas('#d4dce8', 't_d4d', ['20', '40', '60', '80']),

    // brand aliases with alpha
    ...withAlphas('#00A0FF', 'blue', [
      '10',
      '20',
      '25',
      '30',
      '40',
      '50',
      '60',
      '80',
    ]),
    ...withAlphas('#FEBE2F', 'yellow', [
      '10',
      '20',
      '25',
      '30',
      '40',
      '50',
      '60',
      '80',
      '90',
    ]),
    ...withAlphas('#FEBE2F', 'bg_yellow', [
      '10',
      '20',
      '25',
      '30',
      '40',
      '50',
      '60',
      '80',
    ]),
    ...withAlphas('#FE932F', 'orange', [
      '10',
      '20',
      '25',
      '30',
      '40',
      '50',
      '60',
      '80',
      '90',
    ]),
    ...withAlphas('#50E4A2', 'buy', ['10', '20', '40']),
    ...withAlphas('#DE4D77', 'sell', ['10', '20', '40']),

    // surface/background aliases
    bg_black: '#000000',
    bg_white: '#ffffff',
    bg_blue: '#00A0FF',
    bg_buy: '#50E4A2',
    bg_sell: '#DE4D77',
    ...withAlphas('#000000', 'bg_black', ['20', '30', '40', '50', '70', '80']),
    ...withAlphas('#ffffff', 'bg_white', [
      '05',
      '06',
      '07',
      '08',
      '10',
      '15',
      '20',
      '30',
      '40',
      '50',
    ]),
    ...withAlphas('#B7BDC6', 'bg_b7b', ['10', '15', '20', '30', '60']),
    ...withAlphas('#00A0FF', 'bg_blue', [
      '06',
      '07',
      '10',
      '15',
      '20',
      '25',
      '30',
      '40',
      '50',
      '60',
      '80',
    ]),
    ...withAlphas('#50E4A2', 'bg_buy', ['10', '40']),
    ...withAlphas('#DE4D77', 'bg_sell', ['10', '40']),

    bg_transparent: 'transparent',
    bg_f5f5f5: '#f5f5f5',
    bg_f5f5f5_10: withAlpha('#f5f5f5', '1a'),
    bg_1a1a1a_50: withAlpha('#1a1a1a', '80'),
    bg_333: '#333333',
    bg_131a2a: '#131a2a',
    bg_f0f0f0: '#f0f0f0',
    bg_38384f: '#38384f',
    bg_177ddc: '#177ddc',
    bg_228be6: '#228be6',
    bg_4caf50_50: withAlpha('#4caf50', '80'),
    bg_5e6673: '#5e6673',
    bg_3b82f6_10: withAlpha('#3b82f6', '1a'),
    bg_41a3f7: '#41a3f7',
    bg_1890ff: '#1890ff',
    bg_ff7c00_25: withAlpha('#FF7C00', '40'),
    bg_f0f8ff: '#f0f8ff',
    bg_313336: '#313336',
    bg_181c27: '#181c27',
    bg_05050d: '#05050d',
    bg_030303: '#030303',
    bg_4a9eff: '#4a9eff',
    bg_3a4259_25: withAlpha('#3a4259', '40'),

    ...withAlphas('#13132F', 'bg_main', ['80']),
    ...withAlphas('#13132F', 'bg_main', ['15']),

    // border aliases
    border_transparent: 'transparent',
    ...withAlphas('#ffffff', 'border_white', ['05', '10', '20', '30', '50']),
    ...withAlphas('#B7BDC6', 'border_b7b', [
      '10',
      '15',
      '20',
      '30',
      '40',
      '50',
    ]),
    ...withAlphas('#979797', 'border_979', ['20', '25']),
    ...withAlphas('#979797', 'border_151', ['20', '25']),
    border_blue: '#00A0FF',
    border_blue_30: withAlpha('#00A0FF', '4d'),
    border_blue_50: withAlpha('#00A0FF', '80'),
    border_1890ff: '#1890ff',
    border_177ddc: '#177ddc',
    border_buy: '#50E4A2',
    border_sell: '#DE4D77',
    border_buy_50: withAlpha('#50E4A2', '80'),
    border_sell_important: '#DE4D77',
    border_ddd: '#dddddd',
    border_e8e8e8: '#e8e8e8',
    border_d9d9d9: '#d9d9d9',
    border_eeeeee: '#eeeeee',
    border_white_50: withAlpha('#ffffff', '80'),
    border_black: '#000000',
    border_black_30: withAlpha('#000000', '4d'),
    border_black_70: withAlpha('#000000', 'b3'),
    border_black_80: withAlpha('#000000', 'cc'),
    border_0e0f12: '#0e0f12',
    border_orange: '#FF7C00',
    border_b7b_05: withAlpha('#B7BDC6', '0d'),

    gray: 'rgba(183, 189, 198, 0.6)',
    gray2: '#a4a4b1',

    input: darkMode ? '#fff' : '#F4F4F4',
    inputBackground: 'rgba(255,255,255,0.10)',
    inputFocusBorder: darkMode ? '#00A0FF' : '#00A0FF',
    inputHoverBorder: darkMode ? '#b7bdc680' : '#b7bdc680',
    inputDisabled: '#B4B6C1;',
    inputDisabledBorder: 'rgba(151,151,151,0.25)',
    inputErrorBorder: ' #DE4D77',
    placeholder: 'rgba(183, 189, 198, 0.5)',

    btn: darkMode ? '#fff' : '#fff',
    hoveIcon: darkMode ? '#0f84ff' : '#fff',
    btnBg: darkMode ? '#0f84ff' : '#0f84ff',
    btnDisabled: darkMode ? '#7ebaff' : '#7ebaff',

    btnGhost: darkMode ? '#7ebaff' : '#7ebaff',
    btnGhostBorder: darkMode ? '#7ebaff' : '#7ebaff',
    btnGhostBg: darkMode ? '' : '',
    btnGhostDisabled: darkMode ? '#7ebaff' : '#7ebaff',

    border: darkMode ? 'rgba(58, 66, 89, 0.7)' : 'rgba(58, 66, 89, 0.7)',
    innerBorder: darkMode ? 'rgba(58, 66, 89, 0.5)' : 'rgba(58, 66, 89, 0.5)',
    innerBorder2: darkMode
      ? 'rgba(183,189,198,0.15)'
      : 'rgba(183,189,198,0.15)',
    border_01: 'rgba(183,189,198,0.1)',
    border_02: 'rgba(183,189,198,0.2)',
    border1: darkMode ? '#484a4d' : '#7ebaff',
    border2: darkMode ? '#7ebaff' : '#7ebaff',
    border3: '#484a4d',
    border4: '#a1a4b1',

    modalTitle: darkMode ? '#fff' : '#fff',
    modalText: darkMode ? '#fffc' : '#fffc',
    modalDesc: darkMode ? '#a1a4b1' : '#a1a4b1',
    modalLabel: darkMode ? '#B7BDC6CC' : '#B7BDC6CC',
    modalContent: darkMode ? '#B7BDC6CC' : '#B7BDC6CC',

    windowHeight: height,
    windowWidth: width,
    viewWidth,
    showMiniPcView: !isMobile && viewWidth <= 1100,
    modalTop,
    opacity01: '1a',
    opacity02: '33',

    fontRegular: 'font-family: OpenSansRegular, PingFang SC; font-weight: 400;',
    fontRegularSemi:
      'font-family: OpenSansSemiRegular, PingFang SC; font-weight: 400;',
    fontMedium: 'font-family: OpenSansMedium, PingFang SC; font-weight: 500;',
    fontBold: 'font-family: OpenSansBold, PingFang SC; font-weight: 600;',
    fontBoldSemi:
      'font-family: OpenSansSemiBold, PingFang SC; font-weight: 600;',
    fontImpact: 'font-family: Impact; font-weight: 900;',
    fontOxanimuBold: 'font-family: oxanimuBold; font-weight: 700;',
    fontSFProMedium: 'font-family: SFProMedium; font-weight: 500;',
  };
}

export function useThemeParams(): ThemeType {
  return useContext(ThemeContext);
}

// 0.05 => 0d
// 0.1 => 1a
// 0.15 => 26
// 0.2 => 33
// 0.26 => 40
// 0.3 => 4d
// 0.4 => 66
// 0.5 => 80
// 0.6 => 99
// 0.7 => aa
// 0.8 => cc
// 0.9 => e6
