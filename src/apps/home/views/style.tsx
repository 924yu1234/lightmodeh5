import styled from 'styled-components';

import { ThemeType } from 'src/theme';

/**
 * Home PC carousel tiles — aligned with UED "Home — Turbo Range strip"
 * (`CardsSection` / `.impeccable.md`).
 */
export const StyledViewItem = styled.div`
  width: ${({ cardSize }: { cardSize: number }) => cardSize}px;
  min-height: 100px;
  padding: 15px 20px;
  border-radius: 10px;
  cursor: pointer;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_10 : theme.cardBg};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.border_transparent : theme.cardBorder};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease,
    background-color 0.2s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-3px);
      background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.border_transparent : theme.cardBorder};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    @media (hover: hover) {
      &:hover {
        transform: none;
      }
    }
  }

  .token-info {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    line-height: 20px;
    height: 40px;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.ink};
    display: flex;
    align-items: center;
    gap: 5px;
    .token-symbol {
      display: flex;
      flex-direction: column;
      .token-symbol-text {
        max-width: ${({ cardSize }: { cardSize: number }) => cardSize - 60}px;
      }
      .token-name {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        max-width: ${({ cardSize }: { cardSize: number }) => cardSize - 60}px;
        font-size: 12px;
        line-height: 16px;
        color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
      }
    }
  }
  .apy-value {
    margin-top: 6px;
    display: flex;
    align-items: flex-end;
    gap: 6px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    font-size: 24px;
    line-height: 24px;
    padding-left: 33px;
    .apy-value-tips {
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
  }
`;
