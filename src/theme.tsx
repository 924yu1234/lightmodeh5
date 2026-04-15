import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
export type ThemeType = ReturnType<typeof getTheme>;
export default function getTheme({
  height,
  width,
  isMobile,
  isAppH5,
  showH5Header,
  theme = 'dark',
}: {
  height: number;
  width: number;
  isMobile: boolean;
  isAppH5: boolean;
  showH5Header: boolean;
  theme?: 'dark' | 'light';
}) {
  const withAlpha = (hex: string, alphaHex: string) => `${hex}${alphaHex}`;
  const alphaMap = {
    '02': '05',
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
  const darkMode = theme !== 'light';
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

  // ===== Base colors for alpha-generated variants =====
  // In light mode, "overlay on dark bg" tokens become "overlay on light bg"
  // by swapping the base color from white to ink (#092d1f).
  const tFffBase = darkMode ? '#ffffff' : '#092d1f'; // Primary text
  const tB7bBase = darkMode ? '#B7BDC6' : '#4a7a5c'; // Secondary text
  const tD4dBase = darkMode ? '#d4dce8' : '#4a7a5c'; // Secondary alt
  const bgWhiteBase = darkMode ? '#ffffff' : '#092d1f'; // "white overlay" -> ink overlay on light
  const borderWhiteBase = darkMode ? '#ffffff' : '#092d1f'; // border overlay
  const borderB7bBase = darkMode ? '#B7BDC6' : '#4a7a5c';
  const bgB7bBase = darkMode ? '#B7BDC6' : '#4a7a5c';

  return {
    isMobile,
    isAppH5,
    showH5Header,
    darkMode,
    bodyBg: darkMode ? '#13132F' : '#f7faf8',

    bg: darkMode ? '#13132F' : '#ffffff',
    bg_05: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(9, 45, 31, 0.05)',
    bg_07: darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(9, 45, 31, 0.06)',
    bg_10: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 45, 31, 0.08)',
    bg_15: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(9, 45, 31, 0.1)',
    bgMenu: darkMode ? '#2C2C47' : '#ffffff',
    bgMenuHover: darkMode ? 'rgba(255, 255, 255, 0.1);' : '#f0f5f1',
    menuHover: darkMode ? 'rgba(255, 255, 255, 0.06);' : '#f0f5f1',
    boxShadow: darkMode
      ? '0 2px 4px 0 rgba(0, 0, 0, 0.30);'
      : '0 2px 10px rgba(9, 45, 31, 0.09)',

    modalBg: darkMode ? '#22223C' : '#ffffff',
    modalInnerBg: darkMode ? 'rgba(255, 255, 255, 0.1);' : '#f7faf8',

    tradeBg: darkMode ? 'rgba(58, 66, 89, 0.7);' : '#ffffff',
    placeOrderBg: darkMode ? 'rgba(58, 66, 89, 0.2);' : '#f7faf8',

    hover: darkMode ? 'rgba(255, 255, 255, 0.1);' : 'rgba(34, 186, 125, 0.08);',

    inputBg: darkMode ? 'rgba(255, 255, 255, 0.1);' : '#f0f5f1',

    up: darkMode ? '#50E4A2' : '#22ba7d',
    down: darkMode ? '#DE4D77' : '#DC2626',

    sell: darkMode ? '#DE4D77' : '#DC2626',
    buy: darkMode ? '#50E4A2' : '#22ba7d',
    buy2: darkMode ? '#04ba6f' : '#15663a',
    profit: darkMode ? '#50E4A2' : '#22ba7d',

    blue: darkMode ? '#00A0FF' : '#22ba7d',
    blue1: darkMode ? '#0f84ff' : '#22ba7d',
    blue_7eb: darkMode ? '#7ebaff' : '#22ba7d',
    green: darkMode ? '#50E4A2' : '#22ba7d',
    green2: 'rgba(63,182,139,0.1)',
    switchTrackOn: darkMode ? '#30D158' : '#22ba7d',
    switchTrackOff: darkMode
      ? 'rgba(183, 189, 198, 0.2)'
      : 'rgba(9, 45, 31, 0.15)',
    red: darkMode ? '#DE4D77' : '#DC2626',
    red2: 'rgba(246,71,93,0.1)',
    error: darkMode ? '#DE4D77' : '#DC2626',
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

    tips: darkMode ? 'rgba(183, 189, 198, 0.6)' : 'rgba(9, 45, 31, 0.45)',

    // Text colors — semantic mapping
    // In light mode: t_fff = ink (primary), t_b7b/t_d4d = mid (secondary)
    t_d4d: tD4dBase,
    t_a1a: darkMode ? '#a1a4b1' : 'rgba(9, 45, 31, 0.45)',
    t_b7b: tB7bBase,
    t_fff: tFffBase,
    t_fff_aa: withAlpha(tFffBase, 'aa'),
    t_000: darkMode ? '#000000' : '#000000',
    t_000_25: withAlpha('#000000', '40'),
    t_000_aa: withAlpha('#000000', 'aa'),
    // Semantic alias: "light text on dark bg" in dark mode → ink on light bg in light mode
    t_f4f: darkMode ? '#f4f4f4' : '#092d1f',
    // Neutral grays — in light mode remap to W palette (mid / mutedUi / ink)
    t_666: darkMode ? '#666666' : '#4a7a5c',
    t_666_60: darkMode ? withAlpha('#666666', '99') : 'rgba(74, 122, 92, 0.6)',
    t_9aa3b2: darkMode ? '#9aa3b2' : '#8fb89e',
    t_c4c4c4: darkMode ? '#c4c4c4' : '#8fb89e',
    t_abaeba: darkMode ? '#abaeba' : '#8fb89e',
    t_6d778a: darkMode ? '#6d778a' : '#4a7a5c',
    t_3b415b: darkMode ? '#3b415b' : '#4a7a5c',
    // Dark ink token — already dark, aligns with W.ink in light mode
    t_13122f: darkMode ? '#13122f' : '#092d1f',
    t_ff4d4f: darkMode ? '#ff4d4f' : '#DC2626',
    t_52c41a: darkMode ? '#52c41a' : '#22ba7d',
    t_9ca3af: darkMode ? '#9ca3af' : '#8fb89e',
    t_ffc331: '#ffc331',
    t_f77c80: darkMode ? '#f77c80' : '#DC2626',
    t_f2c94c: '#f2c94c',
    t_b8e369: darkMode ? '#b8e369' : '#22ba7d',
    t_ff7c00: '#FF7C00',
    t_999: darkMode ? '#999999' : '#8fb89e',
    t_55d29e: darkMode ? '#55d29e' : '#22ba7d',
    t_42bd7f: darkMode ? '#42bd7f' : '#22ba7d',
    t_333: darkMode ? '#333333' : '#092d1f',
    t_00aaff: darkMode ? '#00aaff' : '#22ba7d',

    // text color aliases with alpha — base switches in light mode
    ...withAlphas(tFffBase, 't_fff', [
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
    ...withAlphas(tB7bBase, 't_b7b', [
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
    ...withAlphas(tD4dBase, 't_d4d', ['20', '40', '60', '80']),

    // brand aliases with alpha
    ...withAlphas(darkMode ? '#00A0FF' : '#22ba7d', 'blue', [
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
    ...withAlphas(darkMode ? '#50E4A2' : '#22ba7d', 'buy', ['10', '20', '40']),
    ...withAlphas(darkMode ? '#DE4D77' : '#DC2626', 'sell', ['10', '20', '40']),

    // surface/background aliases
    bg_black: '#000000',
    bg_white: '#ffffff',
    bg_blue: darkMode ? '#00A0FF' : '#22ba7d',
    bg_buy: darkMode ? '#50E4A2' : '#22ba7d',
    bg_sell: darkMode ? '#DE4D77' : '#DC2626',
    ...withAlphas('#000000', 'bg_black', ['20', '30', '40', '50', '70', '80']),
    // bg_white is used as "overlay" — swap to ink-based in light mode
    ...withAlphas(bgWhiteBase, 'bg_white', [
      '02',
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
    ...withAlphas(bgB7bBase, 'bg_b7b', ['10', '15', '20', '30', '60']),
    ...withAlphas(darkMode ? '#00A0FF' : '#22ba7d', 'bg_blue', [
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
    ...withAlphas(darkMode ? '#50E4A2' : '#22ba7d', 'bg_buy', ['10', '40']),
    ...withAlphas(darkMode ? '#DE4D77' : '#DC2626', 'bg_sell', ['10', '40']),

    bg_transparent: 'transparent',
    // Neutral gray surfaces — map to W panel/page colors in light mode
    bg_f5f5f5: darkMode ? '#f5f5f5' : '#f0f5f1',
    bg_f5f5f5_10: darkMode
      ? withAlpha('#f5f5f5', '1a')
      : 'rgba(240, 245, 241, 0.1)',
    bg_1a1a1a_50: darkMode ? withAlpha('#1a1a1a', '80') : 'rgba(9, 45, 31, 0.5)',
    bg_333: darkMode ? '#333333' : '#4a7a5c',
    bg_131a2a: darkMode ? '#131a2a' : '#f7faf8',
    bg_f0f0f0: darkMode ? '#f0f0f0' : '#f0f5f1',
    bg_38384f: darkMode ? '#38384f' : '#f0f5f1',
    bg_177ddc: darkMode ? '#177ddc' : '#22ba7d',
    bg_228be6: darkMode ? '#228be6' : '#22ba7d',
    bg_4caf50_50: withAlpha('#4caf50', '80'),
    bg_5e6673: darkMode ? '#5e6673' : '#8fb89e',
    bg_3b82f6_10: darkMode
      ? withAlpha('#3b82f6', '1a')
      : 'rgba(34, 186, 125, 0.1)',
    bg_41a3f7: darkMode ? '#41a3f7' : '#22ba7d',
    bg_1890ff: darkMode ? '#1890ff' : '#22ba7d',
    bg_ff7c00_25: withAlpha('#FF7C00', '40'),
    bg_f0f8ff: darkMode ? '#f0f8ff' : '#e6f4ec',
    bg_313336: darkMode ? '#313336' : '#f0f5f1',
    bg_181c27: darkMode ? '#181c27' : '#f7faf8',
    bg_05050d: darkMode ? '#05050d' : '#092d1f',
    bg_030303: darkMode ? '#030303' : '#092d1f',
    bg_4a9eff: darkMode ? '#4a9eff' : '#22ba7d',
    bg_3a4259_25: darkMode
      ? withAlpha('#3a4259', '40')
      : 'rgba(74, 122, 92, 0.25)',

    // bg_main used as page background overlay — swap in light mode
    ...withAlphas(darkMode ? '#13132F' : '#f7faf8', 'bg_main', ['80']),
    ...withAlphas(darkMode ? '#13132F' : '#f7faf8', 'bg_main', ['15']),

    // border aliases
    border_transparent: 'transparent',
    ...withAlphas(borderWhiteBase, 'border_white', [
      '02',
      '05',
      '07',
      '10',
      '20',
      '30',
      '50',
    ]),
    ...withAlphas(borderB7bBase, 'border_b7b', [
      '10',
      '15',
      '20',
      '30',
      '40',
      '50',
    ]),
    ...withAlphas('#979797', 'border_979', ['20', '25']),
    ...withAlphas('#979797', 'border_151', ['20', '25']),
    border_blue: darkMode ? '#00A0FF' : '#22ba7d',
    border_blue_30: withAlpha(darkMode ? '#00A0FF' : '#22ba7d', '4d'),
    border_blue_50: withAlpha(darkMode ? '#00A0FF' : '#22ba7d', '80'),
    border_1890ff: darkMode ? '#1890ff' : '#22ba7d',
    border_177ddc: darkMode ? '#177ddc' : '#22ba7d',
    border_buy: darkMode ? '#50E4A2' : '#22ba7d',
    border_sell: darkMode ? '#DE4D77' : '#DC2626',
    border_buy_50: withAlpha(darkMode ? '#50E4A2' : '#22ba7d', '80'),
    border_sell_important: darkMode ? '#DE4D77' : '#DC2626',
    border_ddd: darkMode ? '#dddddd' : '#e8f0ea',
    border_e8e8e8: darkMode ? '#e8e8e8' : '#e8f0ea',
    border_d9d9d9: darkMode ? '#d9d9d9' : '#dce8de',
    border_eeeeee: darkMode ? '#eeeeee' : '#eef2ef',
    border_white_50: withAlpha(borderWhiteBase, '80'),
    border_black: '#000000',
    border_black_30: withAlpha('#000000', '4d'),
    border_black_70: withAlpha('#000000', 'b3'),
    border_black_80: withAlpha('#000000', 'cc'),
    border_0e0f12: darkMode ? '#0e0f12' : '#eef2ef',
    border_orange: '#FF7C00',
    border_b7b_05: withAlpha(borderB7bBase, '0d'),

    gray: darkMode ? 'rgba(183, 189, 198, 0.6)' : 'rgba(9, 45, 31, 0.6)',
    gray2: darkMode ? '#a4a4b1' : '#4a7a5c',

    input: darkMode ? '#fff' : '#092d1f',
    inputBackground: darkMode ? 'rgba(255,255,255,0.10)' : '#f0f5f1',
    inputFocusBorder: darkMode ? '#00A0FF' : '#22ba7d',
    inputHoverBorder: darkMode ? '#b7bdc680' : 'rgba(9,45,31,0.35)',
    inputDisabled: '#B4B6C1;',
    inputDisabledBorder: 'rgba(151,151,151,0.25)',
    inputErrorBorder: darkMode ? ' #DE4D77' : '#DC2626',
    placeholder: darkMode
      ? 'rgba(183, 189, 198, 0.5)'
      : 'rgba(9, 45, 31, 0.35)',

    btn: darkMode ? '#fff' : '#fff', // button text stays white on colored bg
    hoveIcon: darkMode ? '#0f84ff' : '#22ba7d',
    btnBg: darkMode ? '#0f84ff' : '#22ba7d',
    btnDisabled: darkMode ? '#7ebaff' : 'rgba(34, 186, 125, 0.5)',

    btnGhost: darkMode ? '#7ebaff' : '#22ba7d',
    btnGhostBorder: darkMode ? '#7ebaff' : '#22ba7d',
    btnGhostBg: darkMode ? '' : '',
    btnGhostDisabled: darkMode ? '#7ebaff' : 'rgba(34, 186, 125, 0.5)',

    border: darkMode ? 'rgba(58, 66, 89, 0.7)' : '#e8f0ea',
    innerBorder: darkMode ? 'rgba(58, 66, 89, 0.5)' : '#eef2ef',
    innerBorder2: darkMode ? 'rgba(183,189,198,0.15)' : '#dce8de',
    border_01: darkMode ? 'rgba(183,189,198,0.1)' : 'rgba(9, 45, 31, 0.08)',
    border_02: darkMode ? 'rgba(183,189,198,0.2)' : 'rgba(9, 45, 31, 0.15)',
    border1: darkMode ? '#484a4d' : '#e8f0ea',
    border2: darkMode ? '#7ebaff' : '#22ba7d',
    border3: darkMode ? '#484a4d' : '#e8f0ea',
    border4: darkMode ? '#a1a4b1' : '#4a7a5c',

    modalTitle: darkMode ? '#fff' : '#092d1f',
    modalText: darkMode ? '#fffc' : '#092d1f',
    modalDesc: darkMode ? '#a1a4b1' : '#4a7a5c',
    modalLabel: darkMode ? '#B7BDC6CC' : '#4a7a5c',
    modalContent: darkMode ? '#B7BDC6CC' : '#4a7a5c',

    windowHeight: height,
    windowWidth: width,
    viewWidth,
    showMiniPcView: !isMobile && viewWidth <= 1100,
    modalTop,
    opacity01: '1a',
    opacity02: '33',

    // ===== Turbo Range / H5 specific design tokens =====
    // Core W palette — full alignment with App UI Light Mode
    ink: darkMode ? '#ffffff' : '#092d1f', // primary text / dark bg
    accent: darkMode ? '#50E4A2' : '#22ba7d', // brand green
    accentDark: darkMode ? '#04ba6f' : '#15663a', // deep accent (pill)
    mid: darkMode ? '#B7BDC6' : '#4a7a5c', // secondary text
    mutedUi: darkMode ? '#a1a4b1' : '#8fb89e', // muted UI elements
    mutedText: darkMode
      ? 'rgba(183, 189, 198, 0.45)'
      : 'rgba(9, 45, 31, 0.45)',

    // Surfaces
    pageBg: darkMode ? '#13132F' : '#f7faf8',
    shellBg: darkMode ? '#22223C' : '#ffffff',
    shellSurfaceSecondary: darkMode ? '#22223C' : '#faf7f8',
    panelBg: darkMode ? 'rgba(255,255,255,0.05)' : '#f0f5f1',
    divider: darkMode ? 'rgba(255,255,255,0.08)' : '#dce8de',
    tabTrack: darkMode ? 'rgba(255,255,255,0.1)' : '#e4ede6',

    // My Positions summary card gradient
    summaryCardBg: darkMode
      ? 'linear-gradient(270deg, rgba(0, 138, 220, 0.8) 0%, #00a0ff 69%)'
      : 'linear-gradient(145deg, #082418 0%, #0e4228 55%, #1a7040 100%)',
    // PillTabs active pill background (supports gradient)
    pillTabsActiveBg: darkMode
      ? '#00A0FF'
      : 'linear-gradient(135deg, #092d1f 0%, #15663a 100%)',
    pillTabsActiveText: darkMode ? '#000000' : '#ffffff',
    pillTabsTrack: darkMode ? 'rgba(255,255,255,0.1)' : '#e4ede6',
    pillTabsInactiveText: darkMode ? '#B7BDC6' : 'rgba(9,45,31,0.7)',
    // Segment pill deep green
    segmentPillGreen: darkMode ? '#04ba6f' : '#15663a',
    // White card surface (Historical APY, Price Range row, etc.)
    cardBg: darkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
    cardBorder: darkMode ? 'rgba(255,255,255,0.1)' : '#eef2ef',
    // Info bar (faded green info band)
    infoBarBg: darkMode ? 'rgba(34,186,125,0.1)' : '#e6f4ec',
    infoBarBorder: darkMode ? 'rgba(34,186,125,0.2)' : '#c6dece',
    // Press / hover tint
    pressTint: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(34,186,125,0.06)',
    // Disabled CTA "Enter amount to continue" — light green outline in light mode
    disabledCtaBg: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(34,186,125,0.14)',
    disabledCtaBorder: darkMode
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(34,186,125,0.35)',
    disabledCtaText: darkMode ? '#B7BDC6' : '#092d1f',
    // Primary button radius — pill in light mode
    buttonRadius: darkMode ? '8px' : '23px',
    // Warning / danger muted
    dangerMuted: darkMode ? '#DE4D77' : '#de4d77',
    warningMuted: darkMode ? '#FEBE2F' : '#b58e34',
    // Swap / sell CTA
    swapSellCta: darkMode ? '#DE4D77' : '#DC2626',

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
