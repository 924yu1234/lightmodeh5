import styled from 'styled-components';

import { ThemeType } from 'src/theme';

/**
 * PC Balance hierarchy (Figma Test `../.impeccable.md`):
 * — L1 Tokens | Earn: pill segment (primary navigation).
 * — L2 Turbo Range | Simple Earn: compact segment inside Earn (see `earn/index.tsx`).
 */
export const StyledAccountAsset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .balance-main-tabs-wrapper {
    width: 100%;
    border-radius: 12px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
    overflow: hidden;
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  }

  .balance-pill-tabs-row {
    display: flex;
    align-items: center;
    padding: 14px 18px 12px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};

    .balance-pill-tabs.mantine-SegmentedControl-root {
      flex: 0 0 auto;
      width: auto;
      min-width: 0;
      max-width: 400px;

      .mantine-SegmentedControl-label {
        padding: 0 26px;
        font-size: 15px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        letter-spacing: 0.01em;
      }
    }
  }

  .balance-tab-panel {
    width: 100%;
    padding: 16px 18px 20px;
    min-height: ${(props) => props.theme.windowHeight - 360}px;
    box-sizing: border-box;
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.bg_white_02 : 'transparent'};
  }

  .table-tpl {
    width: 100%;
    .dg-spin-nested-loading .dg-spin-spinning {
      min-height: 300px;
    }
    .dg-empty {
      display: none;
    }
    .search-tpl {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px 16px;
      margin-bottom: 4px;
    }

    .balance-search-field {
      flex: 1 1 280px;
      max-width: 440px;
      min-width: 200px;
    }

    .balance-search-field > div:first-child {
      min-height: 44px;
    }

    .dg-table {
      .dg-table-placeholder {
        visibility: hidden;
      }
      margin-top: 16px;
      .add_token_to_metamask_icon {
        visibility: hidden;
      }
      .dg-table-cell-row-hover {
        .add_token_to_metamask_icon {
          visibility: visible;
        }
      }
    }
  }
`;
