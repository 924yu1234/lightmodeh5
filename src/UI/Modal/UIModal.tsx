import React from 'react';
import { Modal, ModalProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UIModalProps = ModalProps;

const StyledModal = styled(Modal)`
  &.mantine-Modal-root {
    .mantine-Modal-overlay {
      background-color: ${({ theme }) => theme.bg_black_70};
    }

    .mantine-Modal-inner {
      padding-left: 0;
      padding-top: ${({ theme }: { theme: ThemeType }) => theme.modalTop}px;
      padding-right: 0;
      padding-bottom: 50px;
      overflow: auto;
    }
    &[data-centered] {
      .mantine-Modal-inner {
        padding: 0;
      }
    }
  }

  .mantine-Modal-content {
    overflow: unset;
    max-width: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '355px' : '460px'};
    min-width: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '355px' : '460px'};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
    position: relative;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    background-color: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
    border-radius: 20px;
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.boxShadow};
    max-height: unset;

    .mantine-Modal-header {
      display: none;
    }

    .mantine-Modal-body {
      padding: 0;
      word-break: break-word;
    }
  }

  .modal-title {
    padding: 0;
    width: 100%;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    letter-spacing: 0;
    line-height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    text-align: center;

    .icon-m-back {
      cursor: pointer;
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }

    .icon-back {
      font-size: 18px;
      position: absolute;
      left: 10px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      top: 10px;
      cursor: pointer;
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        background: ${({ theme }) => theme.bg_white_10};
      }
    }

    .icon-close {
      font-size: 18px;
      position: absolute;
      right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      top: 10px;
      cursor: pointer;
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        background: ${({ theme }) => theme.bg_white_10};
      }
    }
  }

  .modal-overflow {
    max-height: ${({ theme }: { theme: ThemeType }) =>
      `calc(${theme.windowHeight}px - 2 * ${theme.modalTop}px - 100px)`};
    overflow: auto;
  }

  .modal-block {
    background: ${({ theme }: { theme: ThemeType }) => theme.modalInnerBg};
    border-radius: 5px;
    padding: 15px;
  }

  .modal-btns {
    width: 100%;
    .dg-primary,
    .mantine-Button-root {
      width: 100%;
    }
    .dg-ghost {
      margin-top: 10px;
      width: 100%;
    }
  }

  &.raffle-modal.mantine-Modal-root {
    .mantine-Modal-inner {
      width: 100%;
      .mantine-Modal-content {
        .mantine-Modal-body {
          height: 100%;
          .modal-content {
            padding: 0;
          }
        }
      }
    }
  }

  &.sync-privy-modal.mantine-Modal-root {
    .mantine-Modal-inner {
      width: 100%;
      height: 100%;
      padding: 0;
      max-width: none;
      .mantine-Modal-content {
        height: 100%;
        border-radius: 0;
        max-width: ${({ theme }: { theme: ThemeType }) => theme.windowWidth}px;
        .mantine-Modal-body {
          height: 100%;
        }
      }
    }
  }
`;

const UIModal = React.forwardRef<HTMLDivElement, UIModalProps>(
  ({ styles, ...props }, ref) => {
    return <StyledModal {...props} ref={ref as any} styles={styles} />;
  }
);

UIModal.displayName = 'UIModal';

export default UIModal;
