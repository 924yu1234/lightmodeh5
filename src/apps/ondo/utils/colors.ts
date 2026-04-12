// 预定义的股票颜色映射（基于 Portfolio 中显示的颜色）
const STOCK_COLOR_MAP: { [key: string]: string } = {
  TSLAx: '#E16071',
  SPYx: '#E1607180',
  NVDAx: '#55D29E',
  CRCLx: '#70D3FB',
  MSTRx: '#E16071cc',
  AAPLx: '#00A0FF80',
  GOOGLx: '#00A0FFcc',
  AMZNx: '#EBAA61',
  QQQx: '#70D3FB',
  MCDx: '#E16071',
  METAx: '#FAD47780',
};

// 备用颜色数组（用于未在映射中的股票）
export const FALLBACK_COLORS: string[] = [
  '#9675E9',
  '#FAD477',
  '#F392D2',
  '#A3AED0',
  '#666666',
];

// All 线条的特殊颜色（更粗更显眼）
export const ALL_COLOR = '#7B61FF4d';

// 根据 symbol 名称生成随机颜色
export function getSymbolColor(symbol: string): string {
  if (symbol === 'All') {
    return ALL_COLOR;
  }

  // 首先检查是否有预定义的颜色
  if (STOCK_COLOR_MAP[symbol]) {
    return STOCK_COLOR_MAP[symbol];
  }

  // 基于symbol生成随机颜色
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    const char = symbol.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash * 31 + char) % 2147483647;
  }

  // 使用哈希值生成RGB颜色分量
  const r = Math.abs(hash) % 256;
  // eslint-disable-next-line no-bitwise
  const g = Math.abs(hash >> 8) % 256;
  // eslint-disable-next-line no-bitwise
  const b = Math.abs(hash >> 16) % 256;

  // 转换为十六进制颜色
  const toHex = (num: number) => num.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
