import React from 'react';
import styled, { css } from 'styled-components';

import { Modal } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function FullModal(props: {
  opened: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  size?: number;
  zIndex?: number;
  centered?: boolean;
}) {
  const {
    opened,
    className,
    onClose,
    children,
    closeOnClickOutside = true,
    size,
    zIndex = 200,
    centered = false,
  } = props;
  if (!opened) return null;
  return (
    <StyledFullModal
      title={null}
      centered={centered}
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={closeOnClickOutside}
      className={className}
      size={size}
      closeOnEscape={closeOnClickOutside}
      zIndex={zIndex}
      trapFocus={false}
    >
      {children}
    </StyledFullModal>
  );
}

const StyledFullModal = styled(Modal)`
  &.mantine-Modal-root {
    .modal-wrapper {
      padding: 52px 0 30px;
      position: relative;
      .modal-title {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 27px;
        padding: 0;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        height: 52px;
        width: 100%;

        .icon-m-back {
          position: absolute;
          left: 15px;
        }
        .icon-close {
          right: 10px;
          top: unset;
        }
      }
      .modal-content {
        padding: 0 20px;
        width: 100%;
      }
    }
  }
  ${({ theme }: { theme: ThemeType }) => theme.isMobile && MobileStyle};
`;

const MobileStyle = css`
  &.mantine-Modal-root {
    &.bg13 .mantine-Modal-content {
      background-color: ${({ theme }) => theme.bg};
    }
    .mantine-Modal-inner {
      width: 100%;
      height: 100%;
      padding: 0;

      .mantine-Modal-content {
        height: 100%;
        border-radius: 0px;
        max-width: ${({ theme }: { theme: ThemeType }) => theme.windowWidth}px;
        min-width: ${({ theme }: { theme: ThemeType }) => theme.windowWidth}px;
        padding-bottom: 30px;
        .mantine-Modal-body {
          height: 100%;
        }
        .modal-wrapper {
          position: relative;
          padding: 52px 0 0;
          height: 100%;
        }
        .modal-title {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 27px;
          padding: 0;
          margin: 0;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          height: 52px;
          width: 100%;
          font-size: 14px;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
          ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
          .icon-m-back {
            position: absolute;
            left: 15px;
          }
          .icon-close {
            top: 10px;
            right: 10px;
          }
        }
        .modal-content {
          padding: 0 20px;
          width: 100%;
          max-height: ${(props: any) => {
            return props.theme.windowHeight - 52;
          }}px;
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
`;
