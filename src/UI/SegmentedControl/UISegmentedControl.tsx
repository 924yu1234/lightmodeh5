import React from 'react';
import { SegmentedControl, SegmentedControlProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UISegmentedControlProps = SegmentedControlProps;

const StyledSegmentedControl = styled(SegmentedControl)`
  &.mantine-SegmentedControl-root {
    width: 100%;
    padding: 4px;
    background: #00000033;
    .mantine-SegmentedControl-control {
      height: 44px;
    }
    .mantine-SegmentedControl-label {
      line-height: 44px;
      padding: 0 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b}cc;
      &[data-active] {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
    .mantine-SegmentedControl-indicator {
      background: #b7bdc633;
      border-radius: 5px;
      height: 44px;
    }
  }
`;

const UISegmentedControl = React.forwardRef<
  HTMLDivElement,
  UISegmentedControlProps
>((props, ref) => <StyledSegmentedControl {...props} ref={ref as any} />);

UISegmentedControl.displayName = 'UISegmentedControl';

export default UISegmentedControl;
