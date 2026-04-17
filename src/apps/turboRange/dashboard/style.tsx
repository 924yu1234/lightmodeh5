import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

// width > 2560
export const StyledDashboard2560 = css`
  .page-inner {
    width: 1480px;
  }

  .main-tabs-wrapper {
    .products-tpl {
      .list-content {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
    }

    .strategies-tpl {
      .strategy-cards {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
    }
  }
`;

// width > 1920
export const StyledDashboard1920 = css`
  .page-inner {
    width: 1480px;
  }

  .main-tabs-wrapper {
    .products-tpl {
      .list-content {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
    }

    .strategies-tpl {
      .strategy-cards {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
    }
  }
`;

export const StyledDashboard = styled.div`
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? '#13132f' : theme.bg};
  overflow-y: auto;
  height: 100%;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .page-inner {
    margin: 40px auto 0;
    width: 1105px;
    position: relative;
    z-index: 1;
    padding-bottom: 60px;
  }
  .dashboard-actions {
    position: absolute;
    right: 0;
    top: 20px;
    height: 46px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 30;
  }

  .dashboard-title {
    font-size: 32px;
    line-height: 44px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 10px;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.ink};
    letter-spacing: 0.01em;
  }
  .dashboard-tips {
    font-size: 14px;
    line-height: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? `${theme.t_fff}aa` : theme.mutedText};
    margin-bottom: 30px;
    max-width: 520px;
  }

  .tabs-row {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    gap: 16px;

    .main-pill-tabs.mantine-SegmentedControl-root {
      margin: 0;
      flex: 0 1 50%;
      width: 50%;
      max-width: 50%;
      min-width: 0;
      display: flex;

      .mantine-SegmentedControl-label {
        padding: 0 24px;
        font-size: 15px;

        .strategies-icon {
          height: 25px;
          width: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .svg > div {
          height: 25px;
          width: 25px;
        }
      }
    }

    .about-turbo-range {
      margin-left: auto;
    }
  }

  .tab-content {
    padding: 0;
  }

  .account-tpl {
    padding: 0;
    .recent-trades-outer {
      margin-bottom: 10px;
    }
    .account-inner {
      .positions-tab-wrapper {
        .positions-list {
          padding: 20px 0;
          overflow-y: auto;
        }
      }
    }
    .mantine-Tabs-root .mantine-Tabs-list {
      margin: 0;
    }
  }

  &.view-1920 {
    ${StyledDashboard1920}
  }
  &.view-2560 {
    ${StyledDashboard2560}
  }
`;
