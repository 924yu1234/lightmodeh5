import React from 'react';

import { ThemeType } from 'src/theme';

// 水印配置接口
export interface WatermarkConfig {
  text?: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
  rotation?: number;
}

// CSS 水印样式生成器
export const generateWatermarkCSS = (config: WatermarkConfig = {}) => {
  const {
    text = 'DeGate',
    fontSize = 24,
    color = '#ffffff',
    opacity = 0.2,
    rotation = 0,
  } = config;

  return `
    position: relative;
    
    &::before {
      content: '${text}';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(${rotation}deg);
      font-size: ${fontSize}px;
      font-weight: bold;
      color: ${color};
      opacity: ${opacity};
      pointer-events: none;
      z-index: 1;
      user-select: none;
    }
    
    .recharts-tooltip-wrapper {
      .recharts-default-tooltip {
        background-color: ${({ theme }: { theme: ThemeType }) =>
          theme.bg_black_80} !important;
        border: 1px solid ${({ theme }: { theme: ThemeType }) =>
          theme.border_white_30} !important;
        border-radius: 6px !important;
      }
    }
    
    .recharts-tooltip-cursor {
      fill: rgba(255, 255, 255, 0.1) !important;
      stroke: rgba(255, 255, 255, 0.3) !important;
      stroke-width: 1px !important;
    }
  `;
};

// Recharts 水印组件工厂函数
export const createRechartsWatermark = (config: WatermarkConfig = {}) => {
  const {
    text = 'DeGate',
    fontSize = 20,
    color = 'rgba(255, 255, 255, 0.15)',
    rotation = -45,
  } = config;

  return React.memo((props: any) => {
    const { cx, cy } = props;
    if (!cx || !cy) return null;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontSize={fontSize}
          fontWeight="bold"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {text}
        </text>
      </g>
    );
  });
};

// 默认的 Recharts 水印组件
export const RechartsWatermark = createRechartsWatermark();

// 计算水印位置的工具函数
export const calculateWatermarkPosition = (
  data: any[],
  xKey = 'date',
  yKeys: string[] = []
) => {
  if (!data.length) return null;

  const midIndex = Math.floor(data.length / 2);
  const midData = data[midIndex];

  // 计算 Y 轴的中间值
  let maxY = 0;
  yKeys.forEach((key) => {
    const value = midData?.[key] || 0;
    maxY = Math.max(maxY, value);
  });

  return {
    x: midData?.[xKey],
    y: maxY / 2,
  };
};

// 多重水印位置计算（用于更复杂的布局）
export const calculateMultipleWatermarkPositions = (
  data: any[],
  xKey = 'date',
  yKeys: string[] = [],
  count = 3
) => {
  if (!data.length || count <= 0) return [];

  const positions = [];
  const step = Math.floor(data.length / (count + 1));

  for (let i = 1; i <= count; i++) {
    const index = Math.min(step * i, data.length - 1);
    const item = data[index];

    let maxY = 0;
    yKeys.forEach((key) => {
      const value = item?.[key] || 0;
      maxY = Math.max(maxY, value);
    });

    positions.push({
      x: item?.[xKey],
      y: maxY / 2,
    });
  }

  return positions;
};
