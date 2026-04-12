import React from 'react';
import { Drawer, DrawerProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UIDrawerProps = DrawerProps;

const StyledDrawer = styled(Drawer)`
  .popup-title {
    padding: 0;
    width: 100%;
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    letter-spacing: 0;
    line-height: 22px;
    height: 22px;
    text-align: left;
    position: relative;

    .icon-close {
      font-size: 18px;
      position: absolute;
      right: 10px;
      width: 28px;
      height: 28px;
      top: -4px;
      cursor: pointer;
    }
  }

  &.mantine-Drawer-root {
    .mantine-Drawer-content {
      background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      height: unset;

      .mantine-Drawer-body {
        padding: 0;
      }

      .mantine-Drawer-title {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        font-size: 20px;
        line-height: 28px;
        min-height: 52px;
      }

      .drawer-title {
        font-size: 20px;
        line-height: 28px;
        min-height: 52px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0 0 20px;
      }

      .popup-btns {
        width: 100%;
        display: flex;
        align-items: center;

        .dg-btn {
          flex: 1;

          &:first-child {
            margin-right: 15px;
          }
        }
      }
    }
  }
`;

const UIDrawer = React.forwardRef<HTMLDivElement, UIDrawerProps>(
  (props, ref) => <StyledDrawer {...props} ref={ref as any} />
);

UIDrawer.displayName = 'UIDrawer';

export default UIDrawer;
