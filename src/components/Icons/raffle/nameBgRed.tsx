import React from 'react';
import styled from 'styled-components';

export default function IconNameBgRed({
  className,
  size = 245,
  onClick,
  ...rest
}: {
  className?: string;
  size?: number;
  onClick?: (e?: any) => void;
}) {
  // 两侧旗帜宽度
  const sideWidth = 23;
  // 中间方块宽度
  const centerWidth = size - sideWidth * 2;
  // 高度固定
  const height = 45;

  // 左侧旗帜点
  const leftPoints = [
    [0, 8],
    [sideWidth, 4],
    [sideWidth - 0.2, 36.1],
    [0, 32],
    [15, 19.6],
  ];
  // 右侧旗帜点（水平镜像）
  const rightPoints = leftPoints.map(([x, y]) => [size - x, y]);

  return (
    <StyledSpan
      className={`${className} dg-icon icon-name-bg-red`}
      onClick={onClick}
      {...rest}
    >
      <svg
        width={size}
        height={height}
        viewBox={`0 0 ${size} ${height}`}
        version="1.1"
      >
        <title>name badge</title>
        <defs>
          <filter
            x="-2.9%"
            y="-12.5%"
            width="105.7%"
            height="135.0%"
            filterUnits="objectBoundingBox"
            id="filter-1"
          >
            <feOffset
              dx="0"
              dy="2"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            ></feOffset>
            <feGaussianBlur
              stdDeviation="2"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            ></feGaussianBlur>
            <feColorMatrix
              values="0 0 0 0 0.996078431   0 0 0 0 0.576470588   0 0 0 0 0.184313725  0 0 0 0.296683785 0"
              type="matrix"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            ></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <linearGradient
            x1="147.567472%"
            y1="100%"
            x2="-7.68829445e-13%"
            y2="100%"
            id="linearGradient-2"
          >
            <stop stopColor="#000000" offset="0%"></stop>
            <stop stopColor="#000000" stopOpacity="0" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          {/* 左侧旗帜 */}
          <polygon
            fill="#952804"
            points={leftPoints.map((p) => p.join(' ')).join(' ')}
          />
          {/* 右侧旗帜（完全镜像） */}
          <polygon
            fill="#952804"
            points={rightPoints.map((p) => p.join(' ')).join(' ')}
          />
          {/* 左右渐变遮罩 */}
          {/* 中间方块 */}
          <g transform={`translate(${sideWidth}, 0)`}>
            <rect
              fill="#B21616"
              x="0"
              y="0"
              width={centerWidth}
              height="40"
              rx="2"
            />
          </g>
        </g>
      </svg>
    </StyledSpan>
  );
}

const StyledSpan = styled.div`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
`;
