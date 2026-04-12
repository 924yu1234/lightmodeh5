import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { useThemeParams } from 'src/theme';

import BottomModalForM from './bottomModalForM';

export default function BottomModal(props: {
  opened: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  size?: number;
  zIndex?: number;
  noHeader?: boolean;
  style?: React.CSSProperties;
}) {
  const { isMobile } = useThemeParams();
  const {
    opened,
    className,
    onClose,
    children,
    closeOnClickOutside = true,
    size,
    zIndex = 200,
    style,
  } = props;
  if (isMobile) {
    return <BottomModalForM {...props} />;
  }
  if (!opened) return null;
  return (
    <StyledBottomModal
      title={null}
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={closeOnClickOutside}
      className={className}
      size={size}
      closeOnEscape={closeOnClickOutside}
      zIndex={zIndex}
      trapFocus={false}
      style={style}
    >
      {children}
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(Modal)`
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
`;
