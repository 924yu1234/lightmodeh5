import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

/** Pill shell: border + fill + hover / focus ring (no resting card shadow — single visible frame). */
const HomeSearchShell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 40px;
  box-sizing: border-box;
  border-radius: 9999px;
  padding: 4px 16px;
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.inputDefaultBorder : theme.cardBorder};
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.inputBackground : theme.cardBg};
  /* Single resting frame: border only (no card shadow — avoids double edge with 1px outline). */
  box-shadow: none;
  transition: border-color 150ms ease, box-shadow 150ms ease,
    background-color 150ms ease;

  @media (hover: hover) {
    &:hover:not(:focus-within) {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputHoverBorder};
    }
  }

  &:focus-within {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.inputFocusRing};
  }

  & > * {
    flex: 1;
    min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

/** TextInput（InputBase）会把 props 传到原生 input；低阶 Input 的根是包装层，不支持 onTouchMove 等 */
const StyledInput = styled(TextInput)<{
  $uiVariant: 'default' | 'homeSearch' | 'amountToken';
}>`
  ${({
    $uiVariant,
    theme,
  }: {
    $uiVariant: 'default' | 'homeSearch' | 'amountToken';
    theme: ThemeType;
  }) =>
    $uiVariant === 'homeSearch' &&
    css`
      /* Shell provides chrome; inner uses Mantine unstyled + transparent vars (no gray/green tint box). */
      .mantine-Input-wrapper {
        --input-bg: transparent;
        --input-bd: transparent;
        background: transparent;
      }

      .mantine-Input-input {
        height: 36px;
        flex: 1;
        min-height: auto;
        border-radius: 12px;
        ${theme.fontRegular};
        border: none !important;
        font-size: 14px;
        color: ${theme.ink};
        background: transparent !important;
        background-color: transparent !important;
        font-variant: normal;
        font-feature-settings: normal;
        box-shadow: none !important;
        padding-inline-end: 0;
        padding-top: 0;
        padding-bottom: 0;

        &:focus,
        &:focus-within,
        &:hover {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          background-color: transparent !important;
        }

        &.mantine-Input-disabled {
          opacity: 0.55;
          cursor: default;
        }

        &::placeholder {
          color: ${theme.mutedText};
        }
      }

      /*
       * Mantine reserves input padding-inline-start = leftSectionWidth (default 24 = 16px icon + 8px gap).
       * Section matches that width; flex-start + padding-right keeps icon–text gap inside the band.
       */
      .mantine-Input-section[data-position='left'] {
        color: ${theme.mutedText};
        padding-left: 0;
        padding-right: 8px;
        margin: 0;
        justify-content: flex-start;
        background: transparent !important;
        background-color: transparent !important;
      }

      .mantine-Input-section[data-position='left'] .dg-icon {
        color: ${theme.mutedText};
      }

      .mantine-Input-icon {
        padding-left: 0;
        margin: 0;
        justify-content: center;
      }

      .mantine-Input-section[data-position='right'] {
        ${theme.fontMedium};
        color: ${theme.input};
        font-size: 14px;
        margin-left: 7.5px;
        display: flex;
        padding-right: 0;
        justify-content: flex-end;
        pointer-events: unset;
        height: 100%;
      }

      &.err-border .mantine-Input-input {
        border: none !important;
        box-shadow: none;
      }
    `}

  ${({
    $uiVariant,
    theme,
  }: {
    $uiVariant: 'default' | 'homeSearch' | 'amountToken';
    theme: ThemeType;
  }) =>
    ($uiVariant === 'default' || $uiVariant === 'amountToken') &&
    css`
      .mantine-Input-input {
        height: ${theme.inputControlHeight};
        flex: 1;
        min-height: auto;
        border-radius: ${theme.darkMode ? '5px' : '8px'};
        ${theme.darkMode ? theme.fontRegular : theme.fontMedium};
        border: 1px solid
          ${theme.darkMode ? theme.inputDefaultBorder : theme.cardBorder};
        font-size: ${theme.darkMode ? '14px' : '16px'};
        line-height: ${theme.darkMode ? '1.25' : '1.2'};
        padding-left: 14px;
        padding-right: 14px;
        color: ${theme.input};
        background: ${theme.darkMode ? theme.inputBackground : theme.cardBg};
        box-shadow: ${theme.darkMode
          ? 'none'
          : theme.componentLibraryCardShadow};
        font-variant: normal;
        font-feature-settings: normal;
        transition: border-color 150ms ease, box-shadow 150ms ease,
          background-color 150ms ease;

        &:focus,
        &:focus-within {
          border-color: ${theme.inputFocusBorder};
          box-shadow: ${theme.inputFocusRing};
        }

        &:hover {
          border-color: ${theme.inputHoverBorder};

          &:focus,
          &:focus-within {
            border-color: ${theme.inputFocusBorder};
            box-shadow: ${theme.inputFocusRing};
          }
        }

        &.mantine-Input-disabled {
          border-color: ${theme.inputDisabledBorder};
          color: ${theme.mutedText};
          background: ${theme.darkMode
            ? theme.bg_white_10
            : theme.shellSurfaceSecondary};
          opacity: 1;
          cursor: default;
          box-shadow: none;
        }

        &::placeholder {
          color: ${theme.placeholder};
        }
      }

      .mantine-Input-icon {
        padding-left: 12px;
        justify-content: flex-start;
      }

      .mantine-Input-section {
        ${theme.fontMedium};
        color: ${theme.input};
        font-size: 14px;
        margin-left: 7.5px;
        display: flex;
        padding-right: 12px;
        justify-content: flex-end;
        pointer-events: unset;
        height: 100%;
      }

      &.err-border .mantine-Input-input {
        border-color: ${theme.border_sell_important} !important;
        box-shadow: none;
        background: ${theme.darkMode ? theme.inputBackground : theme.cardBg};
      }

      &.small .mantine-Input-input {
        height: 20px;
        width: 34px;
        font-size: 12px;
        margin-right: 10px;
        padding: 2px 6px;
        line-height: 14px;
        min-height: auto;
        border-radius: 5px;
        box-shadow: none;
      }
    `}

  ${({
    $uiVariant,
    theme,
  }: {
    $uiVariant: 'default' | 'homeSearch' | 'amountToken';
    theme: ThemeType;
  }) =>
    $uiVariant === 'amountToken' &&
    css`
      .mantine-Input-section[data-position='right'] {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        padding-right: 10px;
        padding-left: 6px;
        pointer-events: unset;
        height: 100%;
      }

      .ui-amount-max {
        cursor: pointer;
        flex-shrink: 0;
        background: ${theme.bg_blue_10};
        border-radius: 2px;
        padding: 0 4px;
        font-size: 12px;
        line-height: 20px;
        color: ${theme.blue};
        height: 20px;
        ${theme.fontRegular};
      }

      .ui-amount-token-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
        min-width: 100px;
        height: 36px;
        padding: 4px 8px 5px 5px;
        border-radius: 18px;
        cursor: pointer;
        background: ${theme.bg_b7b_10};
        ${theme.fontRegular};
        font-size: 16px;
        line-height: 22px;
        color: ${theme.t_f4f};
      }

      .ui-amount-token-thumb {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        flex-shrink: 0;
        background: ${theme.buy_20};
        border: 1px solid ${theme.innerBorder2};
      }

      .ui-amount-token-chevron {
        color: ${theme.mutedText};
        font-size: 10px;
        line-height: 1;
        margin-left: 2px;
      }
    `}
`;

export type UIInputProps = TextInputProps & {
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * - `default` — same light-mode surface as Amount + token: cardBorder, cardBg, componentLibraryCardShadow.
   * - `amountToken` — default field + right section helpers: `.ui-amount-max`, `.ui-amount-token-chip` (+ thumb / chevron).
   * - `homeSearch` — Pill shell (chrome outside); inner uses Mantine `variant="unstyled"` by default (no inner tint box). `leftSectionWidth` defaults to 24 (16px icon + 8px to text).
   */
  uiVariant?: 'default' | 'homeSearch' | 'amountToken';
};

const UIInput = React.forwardRef<HTMLInputElement, UIInputProps>(
  ({ onTouchMove, onTouchStart, uiVariant = 'default', ...rest }, ref) => {
    const inputProps =
      uiVariant === 'homeSearch'
        ? {
            ...rest,
            variant: rest.variant ?? 'unstyled',
            leftSectionWidth: rest.leftSectionWidth ?? 24,
          }
        : rest;

    const input = (
      <StyledInput
        ref={ref as any}
        $uiVariant={uiVariant}
        {...inputProps}
        onTouchMove={(e: React.TouchEvent<HTMLInputElement>) => {
          e.stopPropagation();
          onTouchMove?.(e);
        }}
        onTouchStart={(e: React.TouchEvent<HTMLInputElement>) => {
          e.stopPropagation();
          onTouchStart?.(e);
        }}
      />
    );

    if (uiVariant === 'homeSearch') {
      return <HomeSearchShell>{input}</HomeSearchShell>;
    }

    return input;
  }
);

UIInput.displayName = 'UIInput';

export default UIInput;
