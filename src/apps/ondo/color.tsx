// 获取颜色的辅助函数
export const getTreemapColor = (type: string, changePercent: number) => {
  if (type === 'aum') {
    // 0%用灰色
    if (Math.abs(changePercent) < 0.001) {
      return '#c9c9c9';
    }

    // 定义颜色档位
    const tiers = [
      { threshold: 20, color: '#052A16', negativeColor: '#550606' }, // 20%+ / -20%-
      { threshold: 10, color: '#0A4827', negativeColor: '#800A0A' }, // 10-20% / -10 - -20%
      { threshold: 5, color: '#116C3D', negativeColor: '#AC0E0E' }, // 5-10% / -5 - -10%
      { threshold: 2, color: '#1A9256', negativeColor: '#CA1515' }, // 2-5% / -2 - -5%
      { threshold: 1, color: '#2CBF7A', negativeColor: '#D82121' }, // 1-2% / -1 - -2%
      { threshold: 0.5, color: '#60CF9A', negativeColor: '#E34242' }, // 0.5-1% / -0.5 - -1%
      { threshold: 0, color: '#94DFBA', negativeColor: '#EB7878' }, // 0-0.5% / 0 - -0.5%
    ];
    if (changePercent > 0) {
      for (const tier of tiers) {
        if (changePercent >= tier.threshold) {
          return tier.color;
        }
      }
    } else {
      for (const tier of tiers) {
        if (changePercent <= -tier.threshold) {
          return tier.negativeColor;
        }
      }
    }

    return '#c9c9c9';
  }
  // Dex Volume/Holders使用灰色方案，基于数值大小
  return `rgba(183, 189, 198, 0.4)`;
};
