import { isNumber } from 'src/utils/digit';

export const labelColor = '#c8c8c8';
export const barColor = '#00A0FF';

export interface Point {
  x: number;
  height: number;
  time: number;
  num: string;
}

export function findNearestPoint(
  x: number | undefined,
  points: Point[] | undefined
) {
  if (!points?.length) return undefined;
  if (!isNumber(x)) return undefined;
  let minDistance = Infinity;
  let nearestPoint;
  let maxHeight = 0;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const distance = Math.abs(point.x - (x ?? 0));
    maxHeight = Math.max(maxHeight, point.height);

    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = point;
    }
  }
  return { ...nearestPoint, height: maxHeight };
}
