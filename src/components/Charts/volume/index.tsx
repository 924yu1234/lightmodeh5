import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isMobile } from 'react-device-detect';
import { Layer, Rect, Stage, Text } from 'react-konva';
import styled from 'styled-components';

import ChartController from 'src/components/Charts/ChartController';
import { useIntl, useSetLocale } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatTurnover } from 'src/utils/format';
import { divide } from 'src/utils/numberUtils';

import { barColor, findNearestPoint, labelColor, Point } from './utils';

export default function Volume({
  width,
  height,
  datas,
  hideLabels,
  volumePeriod,
  setVolumePeriod,
}: {
  width: number;
  height: number;
  datas: any[]; // 按时间倒序
  hideLabels?: boolean;
  volumePeriod: string;
  setVolumePeriod: React.Dispatch<React.SetStateAction<string>>;
}) {
  dayjs.extend(utc);
  const intl = useIntl();
  const { locale } = useSetLocale();
  const chartX = 10;
  const chartY = 0;
  const spaceY = 20;
  const spaceX = 10;
  const chartWidth = width - chartX - spaceX;
  const chartHeight = height - chartY - spaceY;
  const [hoveredX, setHoverX] = useState(undefined);

  // 倒序，最新的为最后一个
  const lastPoint = useMemo(() => {
    return datas[0] || {};
  }, [datas]);

  let rectWidth = Math.min(chartWidth / datas.length, 50); // 最大50px
  rectWidth = Math.max(rectWidth, 1); // 最小0.5px
  const rectGap = Math.floor((rectWidth / 5) * 100) / 100;
  rectWidth = Math.floor((rectWidth - rectGap) * 100) / 100;

  const maxSize = Math.floor(Number(divide(chartWidth, rectWidth + rectGap)));
  const infoHeight = 80;

  const points: Point[] = useMemo(() => {
    if (!datas?.length) return [];
    const maxQuantity = Math.max(...datas.map((d) => Number(d[1])));

    return datas.slice(0, maxSize).map((item, i) => {
      const x = chartX + rectWidth * i + rectGap * i;
      const height = Math.ceil(
        (item[1] / maxQuantity) * (chartHeight - infoHeight)
      );
      return {
        px: x,
        x: chartWidth + spaceX - x + chartX - rectWidth - rectGap / 2,
        height: height || 1,
        time: item[0],
        num: item[1],
      };
    });
  }, [datas, chartHeight, chartX, chartWidth, maxSize, rectGap, rectWidth]);

  const labels = useMemo(() => {
    if (!datas?.length) return [];

    if (isMobile) {
      const point0 = points[0];
      const pointLast = points[points.length - 1];
      return [
        <Text
          key="price_0"
          x={point0.x + 25 > chartWidth - 10 ? chartWidth - 10 : point0.x}
          y={chartHeight + 6}
          text={dayjs(point0.time).utc().format('MM-DD')}
          fontSize={10}
          fill={labelColor}
        />,
        <Text
          key="price_1"
          x={pointLast.x - 25 < 10 ? 10 : pointLast.x}
          y={chartHeight + 6}
          text={dayjs(pointLast.time).utc().format('MM-DD')}
          fontSize={10}
          fill={labelColor}
        />,
      ];
    }

    const _labels = [];
    // Maxium display number of labels
    const maxLabelNumber = 20;
    const step = Math.ceil(datas.length / maxLabelNumber);
    for (let i = 0; i <= datas.length; i += step) {
      const point = points[i];
      if (point) {
        const text =
          volumePeriod === '30'
            ? dayjs(point.time).utc().format('MMM')
            : dayjs(point.time).utc().format('D');
        _labels.push(
          <Text
            key={`price${i}`}
            x={point.x + (rectWidth - text.length * 5) / 2}
            y={chartHeight + 6}
            text={text}
            fontSize={10}
            fill={labelColor}
          />
        );
      }
    }
    return _labels;
  }, [chartHeight, datas, rectWidth, chartWidth, points, volumePeriod]);

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    const x = mousePos.x;

    setHoverX(x);
  };

  const handleMouseLevel = () => {
    setHoverX(undefined);
  };

  const nearestPoint = findNearestPoint(hoveredX, points);

  return (
    <StyledVolume className="vol-chart">
      {lastPoint && (
        <div className="tvl-info">
          <div className="info-title">{intl['info.turnover_24']}</div>
          <div className="info-vol">
            $
            {nearestPoint
              ? formatTurnover(nearestPoint.num, { maxDecimals: 3 })
              : formatTurnover(lastPoint[1], { maxDecimals: 3 })}
          </div>
          {nearestPoint && (
            <div className="info-time">
              {volumePeriod === '7'
                ? `${dayjs(nearestPoint?.time)
                    .utc()
                    .locale(locale)
                    .format('MMM D, YYYY')} - ${dayjs(nearestPoint?.time)
                    .add(6, 'day')
                    .utc()
                    .locale(locale)
                    .format('MMM D, YYYY')}  (UTC)`
                : dayjs(nearestPoint?.time)
                    .utc()
                    .locale(locale)
                    .format(
                      volumePeriod === '30' ? 'MMM, YYYY' : 'MMM D, YYYY (UTC)'
                    )}
            </div>
          )}
        </div>
      )}
      <ChartController
        value={volumePeriod}
        setValue={setVolumePeriod}
        data={[
          { label: intl.chart_control_day, value: '1' },
          { label: intl.chart_control_week, value: '7' },
          { label: intl.chart_control_month, value: '30' },
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
          {nearestPoint && (
            <Rect
              x={(nearestPoint.x ?? 0) - 1}
              y={chartHeight - nearestPoint.height}
              width={rectWidth + 2}
              height={nearestPoint.height}
              fill="#ffffff1a"
            />
          )}
          {points.map((point: Point) => (
            <Rect
              key={point.x}
              x={point.x}
              y={chartHeight - point.height}
              width={rectWidth}
              height={point.height}
              fill={barColor}
            />
          ))}
          {!hideLabels && labels}
        </Layer>
      </Stage>
    </StyledVolume>
  );
}

const StyledVolume = styled.div`
  background: ${({ theme }) => theme.bg_white_10};
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  position: relative;

  .tvl-info {
    position: absolute;
    top: 10px;
    left: 20px;
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
