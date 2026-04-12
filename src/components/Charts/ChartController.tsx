import React from 'react';
import styled from 'styled-components';

import { SegmentedControl } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function ChartController({
  value,
  setValue,
  data,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <StyledChartControl>
      <SegmentedControl
        value={value}
        onChange={setValue}
        data={data}
        withItemsBorders={false}
        fullWidth
      />
    </StyledChartControl>
  );
}

const StyledChartControl = styled.div`
  position: absolute;
  height: 24px;
  right: 14px;
  top: 15px;
  font-weight: 400;
  .mantine-SegmentedControl-root {
    gap: 7px;
    padding: 3px;
    border-radius: 7px;
    background-color: ${({ theme }) => theme.bg_black_20};
    .mantine-SegmentedControl-control,
    .mantine-SegmentedControl-indicator {
      height: 20px;
      .mantine-SegmentedControl-label {
        padding-top: 1px;
        padding-left: 5px;
        padding-right: 5px;
        line-height: 17px;
        font-size: 13px;
        color: white;
        min-width: 28px;
      }
    }
  }
  .mantine-SegmentedControl-indicator {
    background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_white};
  }
`;
