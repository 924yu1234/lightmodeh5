import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { Drawer } from 'src/UI';

import { ThemeType, useThemeParams } from 'src/theme';

const DRAG_TRANSITION = 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)';

export default function BottomModalForM({
  children,
  opened,
  className,
  onClose,
  closeOnClickOutside = true,
  size,
  zIndex = 200,
  closeThresholdRatio = 0.5, // 0.5 means 50% of the container height
  flingVelocity = 400, // px/s
  noHeader = false,
}: {
  opened: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  size?: number;
  zIndex?: number;
  closeThresholdRatio?: number;
  flingVelocity?: number;
  noHeader?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const [dragDistance, setDragDistance] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const touchHistoryRef = useRef<{ y: number; time: number }[]>([]);

  const getMaxDistance = () => {
    const containerHeight =
      modalContentRef.current?.getBoundingClientRect()?.height;
    return containerHeight !== undefined ? Math.max(containerHeight, 0) : 300;
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const { isMobile } = useThemeParams();

  useEffect(() => {
    if (!opened) {
      setIsDragging(false);
      setDragDistance(0);
      startYRef.current = 0;
      currentYRef.current = 0;
      touchStartTimeRef.current = 0;
      touchHistoryRef.current = [];
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      clearCloseTimer();
    }
  }, [opened]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearCloseTimer();
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile || window._degate_app?.appOverlayVisible) return;

    // 触摸起始于可编辑控件（或标记区域）时勿启用下拉关闭，否则与长按拖移光标/选区、放大镜手势冲突（iOS Safari）
    const touchTarget = e.target;
    if (touchTarget instanceof Element) {
      if (
        touchTarget.closest(
          'input, textarea, select, [contenteditable="true"], [data-prevent-drawer-drag]'
        )
      ) {
        return;
      }
    }

    const touch = e.touches[0];
    scrollElRef.current =
      (modalContentRef.current?.querySelector(
        '.modal-content'
      ) as HTMLElement) || modalContentRef.current;

    if (scrollElRef.current && scrollElRef.current.scrollTop > 0) {
      setIsDragging(false);
      return;
    }
    // const container = modalContentRef.current;

    // if (container) {
    //   const { top } = container.getBoundingClientRect();
    //   const offsetY = touch.clientY - top;
    //   if (offsetY > DRAG_HANDLE_HEIGHT) {
    //     setIsDragging(false);
    //     return;
    //   }
    // }

    startYRef.current = touch.clientY;
    currentYRef.current = touch.clientY;
    touchStartTimeRef.current =
      typeof performance !== 'undefined'
        ? performance.now()
        : new Date().getTime();
    touchHistoryRef.current = [
      { y: touch.clientY, time: touchStartTimeRef.current },
    ];
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging || window._degate_app?.appOverlayVisible)
      return;

    const touch = e.touches[0];
    const newY = touch.clientY;
    currentYRef.current = newY;

    const updateDragDistance = () => {
      const deltaY = newY - startYRef.current;
      if (deltaY > 0) {
        const maxDistance = getMaxDistance();
        setDragDistance(Math.min(deltaY, maxDistance));
      } else {
        setDragDistance(0);
      }
    };

    if (typeof window === 'undefined') {
      updateDragDistance();
      return;
    }

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    touchHistoryRef.current.push({
      y: newY,
      time:
        typeof performance !== 'undefined'
          ? performance.now()
          : new Date().getTime(),
    });

    animationFrameRef.current = window.requestAnimationFrame(() => {
      updateDragDistance();
      animationFrameRef.current = null;
    });
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging || window._degate_app?.appOverlayVisible)
      return;
    const currentY = currentYRef.current;
    const deltaY = currentY - startYRef.current;

    const containerHeight =
      modalContentRef.current?.getBoundingClientRect().height;

    const closeDistance =
      containerHeight && containerHeight > 0
        ? containerHeight * (closeThresholdRatio ?? 0.5)
        : 100;

    const endTime =
      typeof performance !== 'undefined'
        ? performance.now()
        : new Date().getTime();

    // Calculate velocity using history points within 100ms
    const history = touchHistoryRef.current;
    const timeThreshold = endTime - 150;
    let startPoint = history[history.length - 1];

    // Find the first point that is within the time threshold
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].time < timeThreshold) {
        break;
      }
      startPoint = history[i];
    }

    if (!startPoint) {
      startPoint = { y: startYRef.current, time: touchStartTimeRef.current };
    }

    const duration = Math.max(endTime - startPoint.time, 1);
    const distance = currentY - startPoint.y;
    const velocity = (distance / duration) * 1000; // px/s

    const isFastSwipe = velocity >= (flingVelocity ?? 400);

    const closeWithAnimation = () => {
      clearCloseTimer();
      setIsDragging(false);
      setIsClosing(true);
      setDragDistance(getMaxDistance());
      closeTimerRef.current = setTimeout(() => {
        onClose();
        clearCloseTimer();
        setIsClosing(false);
        setDragDistance(0);
      }, 300);
    };

    if (deltaY > closeDistance || isFastSwipe) {
      closeWithAnimation();
    } else {
      // 复位
      setDragDistance(0);
    }

    setIsDragging(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    touchStartTimeRef.current = 0;
  };

  let translateY = 100;
  if (opened) {
    translateY = isMobile && (isDragging || isClosing) ? dragDistance : 0;
  }

  return (
    <StyledBottomModal
      title={null}
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={
        closeOnClickOutside || className?.includes('full-modal')
      }
      className={className}
      size={size}
      data-opened={opened}
      $translateY={translateY}
      $isDragging={isMobile && isDragging}
      position="bottom"
      withCloseButton={false}
      closeOnEscape={false}
      zIndex={zIndex}
      $noHeader={noHeader}
      trapFocus={false}
    >
      <ModalContent
        ref={modalContentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="modal-m-close" />
        {children}
      </ModalContent>
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(Drawer)<{
  $translateY: number;
  $isDragging: boolean;
  $noHeader?: boolean;
}>`
  &.mantine-Drawer-root {
    .mantine-Drawer-inner {
      transform: ${({ $translateY }: { $translateY: number }) =>
        `translateY(${$translateY}px)`};
      transition: ${({ $isDragging }: { $isDragging: boolean }) =>
        $isDragging ? 'none' : DRAG_TRANSITION};
      will-change: transform;
    }

    .modal-wrapper {
      padding: 52px 0 30px;
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
          visibility: hidden;
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

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
`;

const MobileStyle = css<{
  $translateY: number;
  $isDragging: boolean;
  $noHeader?: boolean;
}>`
  --paddingTop: ${({ theme }: { theme: ThemeType }) => {
    return !theme.showH5Header ? 0 : 52;
  }}px;
  --headerHeight: ${({ $noHeader }: { $noHeader?: boolean }) => {
    return $noHeader ? 32 : 62;
  }}px;
  &.mantine-Drawer-root {
    .modal-m-close {
      top: 7px;
      width: 36px;
      height: 5px;
      border-radius: 2.5px;
      position: absolute;
      z-index: 100;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      &:has(+ .intent-countdown) {
        top: 71px;
      }
    }

    .modal-wrapper {
      background: ${({ theme }) => theme.modalBg};
    }

    .intent-countdown {
      position: relative;
      top: 20px;
      border-radius: 4px 4px 0px 0px;
      .intent-countdown-inner {
        border-radius: 4px 4px 0px 0px;
        padding-bottom: 30px;
      }
      & + .modal-wrapper {
        border-radius: 20px 20px 0 0;
      }
    }
    
    .mantine-Drawer-inner {
      width: 100%;
      padding: 52px 0 0;
      will-change: transform;

      .mantine-Drawer-content {
        margin-top: auto;
        background: none;
        border-radius: 20px 20px 0 0;
        max-width: ${({ theme }: { theme: ThemeType }) => theme.windowWidth}px;
        padding-bottom: 0;
        min-width: ${({ theme }: { theme: ThemeType }) => {
          return theme.windowWidth;
        }}px;
        transform: translateY(100%);
        transition: ${({ $isDragging }: { $isDragging: boolean }) =>
          $isDragging ? 'none' : DRAG_TRANSITION};
        will-change: transform;

        .mantine-Modal-body {
          height: 100%;
        }
        .modal-wrapper {
          position: relative;
          padding: ${({ $noHeader }: { $noHeader?: boolean }) => {
            return $noHeader ? 32 : 62;
          }}px 0 0;
          height: 100%;
        }
        .modal-title {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          line-height: 27px;
          padding: 0 0 0 20px;
          margin: 0;
          position: absolute;
          z-index: 1;
          top: 10px;
          left: 0;
          height: 52px;
          width: 100%;
          font-size: 18px;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
          ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
          .icon-m-back {
            position: absolute;
            top: 11px;
            left: 15px;
          }
          .icon-close {
            top: 11px;
            right: 10px;
            visibility: hidden;
          }
        }
        .modal-content {
          padding: 0 20px 30px;
          width: 100%;
          max-width: ${({ theme }: { theme: ThemeType }) => {
            return theme.windowWidth;
          }}px;
          overflow: auto;
          max-height: ${(props: any) => {
            return (
              props.theme.windowHeight - 52 - (props.$noHeader ? 32 : 62) - 30
            );
          }}px;
        }
      }
    }
    &.full-modal {
      .mantine-Drawer-inner {
        padding-top:${({ theme }: { theme: ThemeType }) => {
          return !theme.showH5Header ? 0 : 52;
        }}px;
        .mantine-Drawer-content {
          max-width: ${({ theme }: { theme: ThemeType }) => {
            return theme.windowWidth;
          }}px;
          min-width: ${({ theme }: { theme: ThemeType }) => {
            return theme.windowWidth;
          }}px;
          .modal-content {
            padding-bottom: 30px;
            max-width: ${({ theme }: { theme: ThemeType }) => {
              return theme.windowWidth;
            }}px;
            max-height: ${({
              theme,
              $noHeader,
            }: {
              theme: ThemeType;
              $noHeader?: boolean;
            }) => {
              return (
                theme.windowHeight -
                ($noHeader ? 32 : 62) -
                (!theme.showH5Header ? 0 : 52)
              );
            }}px;
            height ${({
              theme,
              $noHeader,
            }: {
              theme: ThemeType;
              $noHeader?: boolean;
            }) => {
              return (
                theme.windowHeight -
                ($noHeader ? 32 : 62) -
                (!theme.showH5Header ? 0 : 52)
              );
            }}px;
          }
        }
      }
    }
  }
     
  &[data-opened='true'] {
    .mantine-Drawer-inner {
      transform: ${({ $translateY }: { $translateY: number }) =>
        `translateY(${$translateY}px)`};
      .mantine-Drawer-content {
        transform: translateY(0);
      }
    }
  }
`;
