import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledRecords = styled.div`
  width: 100%;
  margin-top: 28px;

  .mantine-Tabs-root .mantine-Tabs-list {
    margin-bottom: 10px;
    padding: 0;
    .mantine-Tabs-tab {
      padding: 0 12px;
      font-size: 18px;
      line-height: 40px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    }
    .mantine-Tabs-tab[data-active] {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      border-bottom: 2px solid
        ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }

  .records-tabs .mantine-Tabs-panel {
    margin-top: 10px;
    width: 100%;
  }

  .records-table-card {
    border: 0;
    border-radius: 0;
    background: transparent;
    padding: 0 0 12px;
    overflow: hidden;
  }

  .records-table-card .dg-table-wrapper {
    padding: 0;
  }

  .records-table-card .dg-table .dg-table-thead tr th {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_07};
    height: 50px;
    min-height: 50px;
  }

  .records-table-card .dg-table .dg-table-thead tr th:first-child {
    padding-left: 24px;
    border-radius: 10px 0 0 10px;
  }

  .records-table-card .dg-table .dg-table-thead tr th:last-child {
    padding-right: 24px;
    border-radius: 0 10px 10px 0;
  }

  .records-table-card .dg-table .dg-table-tbody tr td {
    height: 56px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_90};
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_05};
  }

  .records-table-card .dg-table .dg-table-tbody tr td:first-child {
    padding-left: 24px;
  }

  .records-table-card .dg-table .dg-table-tbody tr td:last-child {
    padding-right: 24px;
  }

  .records-table-card .dg-table .dg-table-tbody tr:last-child td {
    border-bottom: none;
  }

  @media (hover: hover) {
    .records-table-card .dg-table .dg-table-tbody {
      tr:hover td {
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
      }
    }
  }

  .records-table-card .dg-paginatoin {
    margin-top: 10px;
    padding: 0;
  }

  .activity-link {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 22px;
    transition: all 0.2s ease;
  }

  .activity-link:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }

  .status-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .status-icon {
    display: inline-flex;
    line-height: 1;
    cursor: pointer;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
  }
`;
