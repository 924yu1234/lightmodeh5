import React, { useMemo } from 'react';
import { Circle, Group, Line } from 'react-konva';

import { isNumber } from 'src/utils/digit';
export const labelColor = '#c8c8c8';
export const lineColor = '#DE4D77';
export const areaColor = 'rgba(222, 77, 119, 0.15)';

export interface Point {
  x: number;
  y: number;
  time: number;
  num: string;
}

export function findNearestPoint(
  x: number | undefined,
  points: Point[] | undefined
) {
  if (!points?.length) return {};
  if (!isNumber(x)) return {};
  let minDistance = Infinity;
  let nearestPoint;
  // 所有点最小的Y
  let minY = points[0].y;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const distance = Math.abs(point.x - (x ?? 0));
    minY = Math.min(minY, point.y);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = point;
    }
  }
  return { nearestPoint, minY };
}

export function useRenderHoveredPointer({
  hoveredPoint,
  chartHeight,
  chartY,
  minY,
}: {
  hoveredPoint?: Point;
  chartHeight: number;
  chartY: number;
  minY?: number;
}) {
  return useMemo(() => {
    if (!hoveredPoint || !isNumber(hoveredPoint?.x)) {
      return null;
    }
    const color = lineColor;
    return (
      <Group>
        <Line
          points={[
            hoveredPoint.x,
            minY ?? 0,
            hoveredPoint.x,
            chartHeight + chartY - 20,
          ]}
          stroke={color}
          strokeWidth={1}
          dash={[4, 4]}
        />

        <Circle
          x={hoveredPoint.x}
          y={hoveredPoint.y}
          radius={4}
          fill="white"
          stroke={lineColor}
          strokeWidth={2}
        />
      </Group>
    );
  }, [chartHeight, chartY, minY, hoveredPoint]);
}
