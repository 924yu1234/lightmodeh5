import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledMessages = styled.div<{ listHeight: number }>`
  padding: 20px 0;
  .list {
    height: ${({ listHeight }) => listHeight}px;
    overflow-y: auto;
  }
  .messages-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding: 0 25px;
    .read-all {
      margin-left: auto;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      cursor: pointer;
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
    .dg-icon-wrapper {
      position: relative;
      right: -10px;
    }
  }
  .no-more,
  .view-more {
    line-height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-align: center;
  }

  .view-more {
    cursor: pointer;
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }
  .mantine-Tabs-root {
    width: 100%;
    .mantine-Tabs-list {
      padding: 0 25px;
      .mantine-Tabs-tab {
        position: relative;
      }
      .messages-num {
        margin-right: 22px;
        margin-left: 2px;
        margin-top: 2px;
      }
      .mantine-Tabs-tabLabel {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 14px;
        display: flex;
        align-items: center;

        .messages-tips {
          position: absolute;
          right: -10px;
        }
      }
    }
    .mantine-Tabs-panel {
      min-height: 200px;
    }
  }
  .list {
    padding: 0 25px;
  }
`;
