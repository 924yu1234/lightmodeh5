import { css } from 'styled-components';

import { ThemeType } from 'src/theme';

/**
 * Swap Pay field shell — aligned with UED Component Library "Swap — Pay field"
 * (`InputsSection` / `.impeccable.md` light card + focus ring).
 */
export const swapPayInnerShell = css`
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_10 : theme.cardBg};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.border_transparent : theme.cardBorder};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? '8px' : theme.buttonRadius};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  padding: 14px 16px 12px;
  min-height: 96px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    transform 0.18s cubic-bezier(0.25, 1, 0.5, 1);

  @media (hover: hover) {
    &:hover:not(.err-border):not(.focus) {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputHoverBorder};
      transform: translateY(-1px);
    }
  }

  &:hover.err-border,
  &:hover.focus {
    transform: none;
  }

  &.focus:not(.err-border) {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.homeSearchActiveShadow};
  }

  &.err-border {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.border_sell_important} !important;
    box-shadow: none !important;

    &:hover,
    &.focus {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.border_sell_important} !important;
      box-shadow: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
    @media (hover: hover) {
      &:hover:not(.err-border):not(.focus) {
        transform: none;
      }
    }
  }
`;
