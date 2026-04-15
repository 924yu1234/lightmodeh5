import { css } from 'styled-components';

import { ThemeType } from 'src/theme';

export const smallButtonStyle = css`
  padding: 0 7px;
  height: 26px;
  min-height: 26px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.1;
  min-width: 90px;
`;

export const commonButtonStyle = css`
  height: 46px;
  font-size: 14px;
  letter-spacing: 0;
  text-align: center;
  line-height: 30px;
  border: none;
  cursor: pointer;
  padding: 0 20px;
  outline: unset;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

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

  &:active,
  &:focus {
    transform: none;
    outline: unset;
  }

  &[data-loading],
  &[data-loading]:focus {
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
`;

export const primaryButtonStyle = css`
  color: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.t_000 : '#ffffff'};
  background: ${({ theme }) => theme.blue};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.buttonRadius};
  display: flex;
  align-items: center;
  height: 46px;
  min-height: 46px;
  justify-content: center;

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.border_black} ${props.theme.border_black} ${props.theme.border_black} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_000 : '#ffffff'};
      background: ${({ theme }) => theme.blue};
      background-image: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode
          ? 'linear-gradient(180deg, rgba(255, 253, 253, 0.35) 0%, rgba(0, 193, 255, 0.35) 100%)'
          : 'none'};
      filter: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : 'brightness(1.08)'};
    }
  }

  &:active,
  &:focus {
    transform: none;
    outline: unset;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_000 : '#ffffff'};
    background: ${({ theme }) => theme.blue};
    background-image: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode
        ? 'linear-gradient(180deg, rgba(113, 113, 113, 0.35) 0%, rgba(20, 58, 69, 0.35) 100%)'
        : 'none'};
  }

  &[data-loading],
  &[data-loading]:focus {
    background: ${({ theme }) => theme.blue};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? '#000' : '#ffffff'};
    cursor: default;
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
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? '#000' : '#ffffff'};
      background: ${({ theme }) => theme.blue};
    }
  }

  &.btn-with-tips:disabled,
  &.btn-with-tips[disabled]:hover,
  &.btn-with-tips[disabled]:focus {
    color: ${({ theme }: { theme: ThemeType }) => theme.disabledCtaText};
    background: ${({ theme }: { theme: ThemeType }) => theme.disabledCtaBg};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.disabledCtaBorder};
    font-weight: 600;
    opacity: 1;
  }
`;

export const ghostButtonStyle = css`
  color: ${({ theme }) => theme.blue};
  background: none;
  border: 1px solid ${({ theme }) => theme.border_blue};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
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
    &:hover {
      border: 1px solid ${({ theme }) => theme.border_blue};
      color: ${({ theme }) => theme.blue};
      background: none;
      background-image: none;
    }
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.border_blue};
    color: ${({ theme }) => theme.blue};
    background: none;
    background-image: none;
  }

  &:active {
    border: 1px solid ${({ theme }) => theme.border_blue};
    color: ${({ theme }) => theme.blue};
    background: ${({ theme }: { theme: ThemeType }) =>
      !theme.isMobile ? 'rgba(0,160,255,0.25)' : 'none'};
    background-image: none;
  }

  &[data-loading],
  &[data-loading]:focus {
    background: none;
    color: #00a0ff;
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
      color: #00a0ff;
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
  color: ${({ theme }) => theme.t_000};
  background: ${({ theme }) => theme.buy};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 46px;
  min-height: 46px;
  justify-content: center;

  .mantine-Button-loader .mantine-Loader-root:after {
    border-color: ${(props) =>
      `${props.theme.border_black} ${props.theme.border_black} ${props.theme.border_black} ${props.theme.border_transparent}`} !important;
  }

  @media (hover: hover) {
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.t_000};
      background: ${({ theme }) => theme.buy};
      background-image: linear-gradient(
        180deg,
        rgba(255, 253, 253, 0.35) 0%,
        rgba(0, 193, 255, 0.35) 100%
      );
    }
  }

  &:active {
    color: ${({ theme }) => theme.t_000};
    background: ${({ theme }) => theme.buy};
    background-image: linear-gradient(
      180deg,
      rgba(113, 113, 113, 0.35) 0%,
      rgba(20, 58, 69, 0.35) 100%
    );
  }

  &:disabled:not([data-loading]),
  &:disabled:hover:not([data-loading]) {
    color: ${(props) => props.theme.t_666};
    background: ${({ theme }) => theme.bg_f5f5f5_10};
    cursor: default;
    border: 1px solid ${({ theme }) => theme.border_151_20};
  }

  &:disabled[data-loading],
  &:disabled:hover[data-loading] {
    color: ${({ theme }) => theme.t_000};
    background: ${({ theme }) => theme.buy};
  }
`;

export const sellButtonStyle = css`
  width: 100%;
  color: ${({ theme }) => theme.t_fff};
  background: ${({ theme }) => theme.sell};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  border-radius: 8px;
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
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.t_fff};
      background: ${({ theme }) => theme.sell};
      background-image: linear-gradient(
        180deg,
        rgba(255, 253, 253, 0.35) 0%,
        rgba(255, 0, 0, 0.35) 100%
      );
    }
  }

  &:active {
    color: ${({ theme }) => theme.t_fff};
    background: ${({ theme }) => theme.sell};
    background-image: linear-gradient(
      180deg,
      rgba(113, 113, 113, 0.35) 0%,
      rgba(20, 58, 69, 0.35) 100%
    );
  }

  &:disabled:not([data-loading]),
  &:disabled:hover:not([data-loading]) {
    color: ${(props) => props.theme.t_666};
    background: ${({ theme }) => theme.bg_f5f5f5_10};
    cursor: default;
    border: 1px solid ${({ theme }) => theme.border_151_20};
  }

  &:disabled[data-loading],
  &:disabled:hover[data-loading] {
    color: ${({ theme }) => theme.t_fff};
    background: ${({ theme }) => theme.sell};
  }
`;
