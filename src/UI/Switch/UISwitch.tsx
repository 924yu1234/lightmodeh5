import React from 'react';
import { Switch as MantineSwitch, SwitchProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UISwitchProps = SwitchProps;

const StyledSwitch = styled(MantineSwitch)`
  &.mantine-Switch-root {
    --switch-width: 40px;
    --switch-height: 24px;
    --switch-thumb-size: 20px;
    --switch-track-label-padding: 2px;
    --switch-radius: 16px;

    display: inline-flex;
    line-height: 0;

    .mantine-Switch-body {
      align-items: center;
    }

    .mantine-Switch-track {
      cursor: pointer;
      border: none;
      background: ${({ theme }: { theme: ThemeType }) => theme.switchTrackOff};
      transition: background-color 0.2s ease;
    }

    .mantine-Switch-thumb {
      border: none;
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.bg_white};
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .mantine-Switch-input:checked + .mantine-Switch-track {
      background: ${({ theme }: { theme: ThemeType }) => theme.switchTrackOn};
    }
  }
`;

const UISwitch = React.forwardRef<HTMLInputElement, UISwitchProps>(
  (props, ref) => <StyledSwitch ref={ref as any} {...props} />
);

UISwitch.displayName = 'UISwitch';

export default UISwitch;
