import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isMobile } from 'react-device-detect';
import { Layer, Line, Shape, Stage, Text } from 'react-konva';
import styled from 'styled-components';

import ChartController from 'src/components/Charts/ChartController';
import { useIntl, useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { formatTurnover } from 'src/utils/format';

import {
  findNearestPoint,
  labelColor,
  lineColor,
  Point,
  useRenderHoveredPointer,
} from './utils';

export default function Tvl({
  width,
  height,
  datas,
  hideLabels,
  tvlLimit,
  setTvlLimit,
}: {
  width: number;
  height: number;
  datas: any[];
  hideLabels?: boolean;
  tvlLimit: string;
  setTvlLimit: React.Dispatch<React.SetStateAction<string>>;
}) {
  dayjs.extend(utc);

  const intl = useIntl();
  const { locale } = useSetLocale();
  const chartX = 10;
  const chartY = 0;
  const spaceY = 0;
  const spaceX = 10;
  const chartWidth = width - chartX - spaceX;
  const chartHeight = height - chartY - spaceY;

  let showData = datas;
  if (datas.length === 1) {
    showData = [[datas[0][0] - 86400000, datas[0][1]], datas[0]];
  }

  const [hoveredX, setHoverX] = useState(undefined);

  const minTime = useMemo(() => {
    return showData[0]?.[0];
  }, [showData]);
  const lastPoint = useMemo(() => {
    return showData[showData.length - 1] || {};
  }, [showData]);
  const maxTime = useMemo(() => {
    return lastPoint?.[0];
  }, [lastPoint]);
  const timeRange = maxTime - minTime;
  const infoHeight = 80;

  const points: Point[] = useMemo(() => {
    if (!showData?.length) return [];
    const maxQuantity = Math.max(...showData.map((d) => Number(d[1])));
    const minQuantity = Math.min(...showData.map((d) => Number(d[1])));
    const min = minQuantity - (maxQuantity - minQuantity) * 0.25;

    const range = maxQuantity - min;
    return showData.map((item) => {
      const x = chartX + (chartWidth * (item[0] - minTime)) / timeRange;
      let y;
      if (range === 0) {
        y = chartY + chartHeight * 0.5;
      } else {
        y =
          chartHeight +
          chartY -
          ((chartHeight - infoHeight) / range) * (Number(item[1]) - min);
      }
      return { x, y, time: item[0], num: item[1] };
    });
  }, [showData, chartHeight, chartWidth, minTime, timeRange, chartX, chartY]);

  const labels = useMemo(() => {
    if (!points?.length) return [];
    if (!isNumber(timeRange) || timeRange <= 0) return null;

    if (isMobile) {
      const point0 = points[0];
      const pointLast = points[points.length - 1];
      return [
        <Text
          key="price_0"
          x={point0.x}
          y={chartHeight - 15}
          text={dayjs(point0.time).utc().format('MM-DD')}
          fontSize={10}
          fill={labelColor}
        />,
        <Text
          key="price_1"
          x={pointLast.x - 20}
          y={chartHeight - 15}
          text={dayjs(pointLast.time).utc().format('MM-DD')}
          fontSize={10}
          fill={labelColor}
        />,
      ];
    }

    const _labels = [];
    // Maxium display number of labels
    const maxLabelNumber = 20;
    const step = Math.ceil(points.length / maxLabelNumber);
    for (let i = 0; i <= points.length; i += step) {
      const point = points[i];
      if (point && point.x < chartWidth + chartX * 2) {
        const day = dayjs(point.time).utc().format('D');
        _labels.push(
          <Text
            key={`price${i}`}
            x={point.x === 0 ? 0 : point.x - (day.length * 5) / 2}
            y={chartHeight - 15}
            text={day}
            fontSize={10}
            fill={labelColor}
          />
        );
      }
    }
    return _labels;
  }, [chartHeight, points, chartWidth, timeRange]);

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    const x = mousePos.x;

    setHoverX(x);
  };

  const handleMouseLevel = () => {
    setHoverX(undefined);
  };

  const { nearestPoint, minY } = findNearestPoint(hoveredX, points);

  const hoveredPointEle = useRenderHoveredPointer({
    hoveredPoint: nearestPoint,
    chartHeight,
    chartY,
    minY,
  });

  const chartPoints = useMemo(() => {
    return points.flatMap((point) => [point.x, point.y]);
  }, [points]);

  return (
    <StyledTvl className="tvl-chart">
      {lastPoint && (
        <div className="tvl-info">
          <div className="info-title">{intl['info.tvl']}</div>
          <div className="info-vol">
            $
            {nearestPoint
              ? formatTurnover(nearestPoint.num, { maxDecimals: 3 })
              : formatTurnover(lastPoint[1], { maxDecimals: 3 })}
          </div>
          {nearestPoint && (
            <div className="info-time">
              {dayjs(nearestPoint?.time)
                .locale(locale)
                .utc()
                .format('MMM D, YYYY (UTC)')}
            </div>
          )}
        </div>
      )}
      <ChartController
        value={tvlLimit}
        setValue={setTvlLimit}
        data={[
          { label: intl.chart_control_7d, value: '7' },
          { label: intl.chart_control_30d, value: '30' },
          { label: intl.chart_control_all, value: '2000' },
        ]}
      />
      <Stage
        width={chartWidth + chartX + spaceX}
        height={chartHeight + chartY + spaceY}
        onMouseMove={handleMouseMove}
        onClick={handleMouseMove}
        onMouseLeave={handleMouseLevel}
        onTouchStart={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseLevel}
      >
        <Layer>
          <Line points={chartPoints} stroke={lineColor} strokeWidth={2} />
          <Shape
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(chartX, chartHeight + chartY);
              for (let i = 0; i < chartPoints.length; i += 2) {
                context.lineTo(chartPoints[i], chartPoints[i + 1]);
              }
              context.lineTo(chartWidth + chartX, chartHeight + chartY);
              context.closePath();
              context.fillShape(shape);
            }}
            fillLinearGradientStartPoint={{ x: chartX, y: chartY }}
            fillLinearGradientEndPoint={{ x: chartX, y: chartHeight + chartY }}
            fillLinearGradientColorStops={[
              0,
              'rgba(255, 0, 101, 0.3)',
              1,
              'rgba(222, 77, 119, 0)',
            ]}
          />
          {!hideLabels && labels}
          {hoveredPointEle}
        </Layer>
      </Stage>
    </StyledTvl>
  );
}

const StyledTvl = styled.div`
  background: ${({ theme }) => theme.bg_white_10};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  position: relative;

  .tvl-info {
    position: absolute;
    top: 10px;
    left: 20px;
    max-width: 180px;
    .info-title {
      opacity: 0.6;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff}90;
    }
    .info-vol {
      margin-top: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 30px;
      line-heihgt: 36px;
    }
  }
`;
