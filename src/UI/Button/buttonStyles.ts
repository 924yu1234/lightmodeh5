import { css } from 'styled-components';

import { ThemeType } from 'src/theme';

export const smallButtonStyle = css`
  padding: 0 7px;
  height: 26px;
  min-height: 26px;
  border-radius: 8px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  line-height: 1.1;
  min-width: 90px;
`;

/** Press curve aligned with app-light-mode-main (`btn-*:active`, `tab-press`) */
const buttonPressTransition = css`
  -webkit-tap-highlight-color: transparent;
  transition: transform 120ms cubic-bezier(0.25, 1, 0.5, 1), filter 120ms ease,
    box-shadow 120ms ease, background-color 150ms ease, border-color 150ms ease,
    background-image 150ms ease;
`;

export const commonButtonStyle = css`
  height: 46px;
  letter-spacing: 0;
  text-align: center;
  line-height: 30px;
  border: none;
  cursor: pointer;
  padding: 0 20px;
  outline: unset;
  /* App UI Light: PrimaryButton / SecondaryButton use 16px + font-medium */
  ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.fontRegular : theme.fontMedium};
  font-size: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? '14px' : '16px'};
  ${buttonPressTransition};

  .mantine-Button-loader {
    position: static;
    display: flex;
    transform: none !important;
    height: 12px;
    width: 12px;

    .mantine-Loader-root {
      height: 12px;
      width: 12px;

      &:after {
        border-width: 2px;
        height: 12px;
        width: 12px;
      }
    }
  }

  &:focus {
    outline: unset;
  }

  &:focus-visible:not(:disabled):not([data-loading]):not([data-disabled]) {
    outline: none;
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.ctaFocusRing};
  }

  &:active:not(:disabled):not([data-loading]):not([data-disabled]) {
    transform: scale(0.97);
    filter: brightness(0.95);
  }

  &:disabled:active,
  &[data-disabled]:active,
  &[data-loading]:active {
    transform: none;
    filter: none;
  }

  &[data-loading],
  &[data-loading]:focus {
    transform: none;
    filter: none;

    .mantine-Button-inner {
      transform: none !important;
      opacity: 1;
      margin-left: 5px;

      .mantine-Button-label {
        opacity: 1;
      }
    }

    cursor: default;

    &::before {
      content: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
    &:active:not(:disabled):not([data-loading]):not([data-disabled]) {
      transform: none;
      filter: none;
    }
    &:focus-visible:not(:disabled):not([data-loading]):not([data-disabled]) {
      box-shadow: none;
    }
  }
`;

export const primaryButtonStyle = css`
  color: ${({ theme }) => theme.bg_white};
  background: ${({ theme }) => theme.blue};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.buttonRadius};
  display: flex;
  align-items: center;
  height: 46px;
  min-height: 46px;
  justify-content: center;

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled]) {
      color: ${({ theme }) => theme.bg_white};
      background: ${({ theme }) => theme.blue};
      background-image: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode
          ? 'linear-gradient(180deg, rgba(255, 253, 253, 0.35) 0%, rgba(0, 193, 255, 0.35) 100%)'
          : 'none'};
      filter: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : 'brightness(1.08)'};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.primaryBtnHoverShadow};
    }
  }

  &:active,
  &:focus {
    outline: unset;
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.blue};
    background-image: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode
        ? 'linear-gradient(180deg, rgba(113, 113, 113, 0.35) 0%, rgba(20, 58, 69, 0.35) 100%)'
        : 'none'};
  }

  &[data-loading],
  &[data-loading]:focus {
    background: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.bg_white};
    cursor: default;
    &::before {
      content: none;
    }
  }

  &:disabled,
  &[data-disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[data-disabled]:hover,
  &[data-disabled]:focus {
    border: none;
    cursor: not-allowed;
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.primaryBtnDisabledBg};
    background-image: none;
    box-shadow: none;
    filter: none;
    transform: none;
    opacity: 1;
    &[data-loading] {
      color: ${({ theme }) => theme.bg_white};
      background: ${({ theme }) => theme.blue};
    }
  }

  &.btn-with-tips:disabled,
  &.btn-with-tips[data-disabled],
  &.btn-with-tips[disabled]:hover,
  &.btn-with-tips[disabled]:focus,
  &.btn-with-tips[data-disabled]:hover,
  &.btn-with-tips[data-disabled]:focus {
    color: ${({ theme }: { theme: ThemeType }) => theme.disabledCtaText};
    background: ${({ theme }: { theme: ThemeType }) => theme.disabledCtaBg};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.disabledCtaBorder};
    font-weight: 600;
    opacity: 1;
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
    transform: none;
  }
`;

export const ghostButtonStyle = css`
  color: ${({ theme }) => theme.blue};
  background: none;
  border: 1px solid ${({ theme }) => theme.border_blue};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.buttonRadius};
  display: flex;
  height: 46px;
  min-height: 46px;
  align-items: center;
  justify-content: center;

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.border_blue} ${props.theme.border_blue} ${props.theme.border_blue} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled]) {
      border: 1px solid ${({ theme }) => theme.border_blue};
      color: ${({ theme }) => theme.blue};
      background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
      background-image: none;
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.ghostBtnHoverShadow};
    }
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.border_blue};
    color: ${({ theme }) => theme.blue};
    background: none;
    background-image: none;
  }

  &:focus-visible:not(:disabled):not([data-loading]):not([data-disabled]) {
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.ctaGhostFocusRing};
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.border_blue};
    color: ${({ theme }) => theme.blue};
    background: ${({ theme }: { theme: ThemeType }) =>
      !theme.isMobile ? theme.bg_blue_25 : 'none'};
    background-image: none;
  }

  &[data-loading],
  &[data-loading]:focus {
    background: none;
    color: ${({ theme }) => theme.blue};
    border: 1px solid ${({ theme }) => theme.border_blue};
    &::before {
      content: none;
    }
  }

  &:disabled,
  &[disabled]:hover,
  &[disabled]:focus {
    border: 1px solid ${({ theme }) => theme.border_white_10};
    cursor: default;
    color: ${(props) => props.theme.t_666_60};
    background: ${({ theme }) => theme.bg_1a1a1a_50};
    background-image: none;
    &[data-loading] {
      border: 1px solid ${({ theme }) => theme.border_blue};
      cursor: default;
      background: none;
      color: ${({ theme }) => theme.blue};
    }
  }

  &.modal-cancel {
    width: 100%;
    margin-top: 10px;
    border: 1px solid ${({ theme }) => theme.border_transparent};

    @media (hover: hover) {
      &:hover {
        border: 1px solid ${({ theme }) => theme.border_transparent};
        background: none;
      }
    }

    &:active,
    &:focus {
      border: 1px solid ${({ theme }) => theme.border_transparent};
      color: ${({ theme }) => theme.blue};
      background: ${({ theme }) => theme.bg_transparent};
    }
  }
`;

export const buyButtonStyle = css`
  width: 100%;
  color: ${({ theme }) => theme.bg_white};
  background: ${({ theme }) => theme.buy};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.buttonRadius};
  display: flex;
  align-items: center;
  height: 46px;
  min-height: 46px;
  justify-content: center;

  &:not(:disabled):not([data-disabled]):not([data-loading]) {
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.buyBtnRestShadow};
  }

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled]),
    &:focus:not(:disabled):not([data-disabled]) {
      color: ${({ theme }) => theme.bg_white};
      background: ${({ theme }) => theme.buy};
      background-image: linear-gradient(
        180deg,
        rgba(255, 253, 253, 0.35) 0%,
        rgba(0, 193, 255, 0.35) 100%
      );
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.buyBtnHoverShadow};
      filter: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : 'brightness(1.06)'};
    }
  }

  &:focus-visible:not(:disabled):not([data-loading]):not([data-disabled]) {
    outline: none;
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.ctaFocusRing};
  }

  &:active {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.buy};
    background-image: linear-gradient(
      180deg,
      rgba(113, 113, 113, 0.35) 0%,
      rgba(20, 58, 69, 0.35) 100%
    );
  }

  &:disabled:not([data-loading]),
  &[data-disabled]:not([data-loading]),
  &:disabled:hover:not([data-loading]),
  &[data-disabled]:hover:not([data-loading]) {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.buyBtnDisabledBg};
    cursor: not-allowed;
    border: none;
    background-image: none;
    box-shadow: none;
    filter: none;
    transform: none;
    opacity: 1;
  }

  &:disabled[data-loading],
  &:disabled:hover[data-loading],
  &[data-disabled][data-loading],
  &[data-disabled]:hover[data-loading] {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.buy};
  }
`;

export const sellButtonStyle = css`
  width: 100%;
  color: ${({ theme }) => theme.bg_white};
  background: ${({ theme }) => theme.sell};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.buttonRadius};
  display: flex;
  align-items: center;
  height: 46px;
  min-height: 46px;
  justify-content: center;

  &:not(:disabled):not([data-disabled]):not([data-loading]) {
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.sellBtnRestShadow};
  }

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.bg_white} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover:not(:disabled):not([data-disabled]),
    &:focus:not(:disabled):not([data-disabled]) {
      color: ${({ theme }) => theme.bg_white};
      background: ${({ theme }) => theme.sell};
      background-image: linear-gradient(
        180deg,
        rgba(255, 253, 253, 0.35) 0%,
        rgba(255, 0, 0, 0.35) 100%
      );
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.sellBtnHoverShadow};
      filter: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : 'brightness(1.06)'};
    }
  }

  &:active {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.sell};
    background-image: linear-gradient(
      180deg,
      rgba(113, 113, 113, 0.35) 0%,
      rgba(20, 58, 69, 0.35) 100%
    );
  }

  &:focus-visible:not(:disabled):not([data-loading]):not([data-disabled]) {
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.sellCtaFocusRing};
  }

  &:disabled:not([data-loading]),
  &[data-disabled]:not([data-loading]),
  &:disabled:hover:not([data-loading]),
  &[data-disabled]:hover:not([data-loading]) {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.sellBtnDisabledBg};
    cursor: not-allowed;
    border: none;
    background-image: none;
    box-shadow: none;
    filter: none;
    transform: none;
    opacity: 1;
  }

  &:disabled[data-loading],
  &:disabled:hover[data-loading],
  &[data-disabled][data-loading],
  &[data-disabled]:hover[data-loading] {
    color: ${({ theme }) => theme.bg_white};
    background: ${({ theme }) => theme.sell};
  }
`;
