import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function CommonModal(props: {
  opened: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  size?: number;
  zIndex?: number;
}) {
  const {
    opened,
    className,
    onClose,
    children,
    closeOnClickOutside,
    size,
    zIndex = 200,
  } = props;
  if (!opened) return null;
  return (
    <StyledBottomModal
      title={null}
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={closeOnClickOutside}
      className={className}
      size={size}
      closeOnEscape={false}
      zIndex={zIndex}
      trapFocus={false}
    >
      {children}
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(Modal)`
  --paddingTop: ${(props: any) => {
    return props.theme.modalTop;
  }}px;
  .mantine-Modal-root {
    .mantine-Modal-overlay {
      background-color: ${({ theme }) => theme.bg_black_70};
    }
    .mantine-Modal-inner {
      padding-left: 0;
      padding-right: 0;
      padding-top: var(--paddingTop);
      padding-bottom: 50px;
      overflow: auto;
    }
  }
  .mantine-Modal-content {
    .mantine-Modal-header {
      display: none;
    }
    .mantine-Modal-body {
      padding: 0;
      word-break: break-word;
    }
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
  }

  .modal-title {
    padding: 0 0px;
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
    padding: 0 20px;

    &.text-left {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      justify-content: flex-start;
      font-size: 18px;
    }

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
      width: 30px;
      height: 30px;
      border-radius: 50%;
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
      width: 30px;
      height: 30px;
      border-radius: 50%;
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
      `calc(${theme.windowHeight}px - 2 * var(--paddingTop) - 100px)`};
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
`;
